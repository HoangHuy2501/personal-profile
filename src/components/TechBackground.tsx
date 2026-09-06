"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useLightDark } from "../hook/useLightDark";

type Bubble = {
  base: THREE.Vector3;
  scale: number;
  speed: number;
  rise: number;
  phase: number;
  drift: number;
  current: THREE.Color;
};
const DARK = [
  "#25f4d0",
  "#8c7cff",
  "#ff68b7",
  "#3e9fff",
  "#b0ffe8",
  "#ff9d6c",
  "#f6d65b",
  "#55d7ff",
].map((c) => new THREE.Color(c));
const LIGHT = [
  "#42bfae",
  "#9786df",
  "#dc86ad",
  "#5b9edc",
  "#75cdb5",
  "#e99b72",
  "#c9a83e",
  "#55b8ce",
].map((c) => new THREE.Color(c));

function webglAvailable() {
  if (typeof document === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function BubbleMaterial({ dark }: { dark: boolean }) {
  const material = useRef<THREE.MeshPhysicalMaterial>(null);
  useFrame((_, delta) => {
    if (material.current)
      material.current.opacity = THREE.MathUtils.damp(
        material.current.opacity,
        dark ? 0.4 : 0.34,
        3,
        delta,
      );
  });
  return (
    <meshPhysicalMaterial
      ref={material}
      vertexColors
      transparent
      opacity={dark ? 0.4 : 0.34}
      roughness={0.12}
      metalness={0.1}
      transmission={dark ? 0.2 : 0.12}
      thickness={0.38}
      clearcoat={1}
      clearcoatRoughness={0.1}
      iridescence={0.9}
      iridescenceIOR={1.32}
      depthWrite={false}
    />
  );
}

function PointerMaterial({ dark }: { dark: boolean }) {
  return (
    <shaderMaterial
      transparent
      depthWrite={false}
      side={THREE.DoubleSide}
      blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      toneMapped={false}
      depthTest={false}
      uniforms={{ uGlow: { value: dark ? 1 : 0.55 } }}
      vertexShader={
        "attribute float aAlpha; attribute vec3 aSparkColor; varying float vAlpha; varying vec2 vUv; varying vec3 vColor; void main(){vAlpha=aAlpha; vUv=uv; vColor=aSparkColor; gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.0);}"
      }
      fragmentShader={
        "uniform float uGlow; varying float vAlpha; varying vec2 vUv; varying vec3 vColor; void main(){float across=1.0-smoothstep(.05,1.0,abs(vUv.y-.5)*2.0); float endFade=smoothstep(.0,.12,vUv.x)*(1.0-smoothstep(.86,1.0,vUv.x)); float tip=smoothstep(.72,1.0,vUv.x); float alpha=across*endFade*vAlpha; vec3 color=vColor*(1.0+uGlow*.7+tip*.45); gl_FragColor=vec4(color,alpha);}"
      }
    />
  );
}

function BubbleScene({ dark, mobile, reduced }: { dark: boolean; mobile: boolean; reduced: boolean }) {
  const { camera, gl, invalidate } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const spawnPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const hit = useMemo(() => new THREE.Vector3(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const bgCount = mobile ? 30 : 64;
  const pointerCount = mobile || reduced ? 0 : 120;
  const sparkAlpha = useMemo(() => new Float32Array(pointerCount), [pointerCount]);
  const sparkColors = useMemo(() => new Float32Array(pointerCount * 3), [pointerCount]);
  const colors = dark ? DARK : LIGHT;
  const bubbles = useMemo<Bubble[]>(
    () =>
      Array.from({ length: bgCount }, (_, i) => ({
        base: new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          -1 - Math.random() * 6,
        ),
        scale: 0.14 + Math.random() * (i % 6 === 0 ? 0.86 : 0.54),
        speed: 0.28 + Math.random() * 0.42,
        rise: 0.3 + Math.random() * 0.3,
        phase: Math.random() * 6.28,
        drift: 0.42 + Math.random() * 0.8,
        current: colors[i % colors.length].clone(),
      })),
    [bgCount], // Keep positions stable when theme changes.

  );
  const bgRef = useRef<THREE.InstancedMesh>(null);
  const pointerRef = useRef<THREE.InstancedMesh>(null);
  const pointerData = useMemo(
    () => Array.from({ length: pointerCount }, () => ({
      active: false,
      age: 99,
      life: 0.65,
      x: 0,
      y: 0,
      z: -2,
      vx: 0,
      vy: 0,
      angle: 0,
      length: 0.12,
      thickness: 0.018,
      color: new THREE.Color(),
    })),
    [pointerCount],
  );
  const cursor = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0, lastMove: 0, lastSpawn: 0, distance: 0, moved: false, inside: false });
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const targetBackground = useMemo(
    () => new THREE.Color(dark ? "#0d1116" : "#f5faf8"),
    [dark],
  );
  const currentBackground = useRef(targetBackground.clone());
  useEffect(() => {
    const reset = () => { cursor.current.inside = false; cursor.current.moved = false; cursor.current.distance = 0; cursor.current.vx = 0; cursor.current.vy = 0; cursor.current.lastMove = 0; };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || pointerCount === 0) return;
      const p = cursor.current; const now = performance.now();
      const rect = gl.domElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      ndc.set(((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1);
      camera.updateMatrixWorld();
      raycaster.setFromCamera(ndc, camera);
      if (!raycaster.ray.intersectPlane(spawnPlane, hit)) return;
      const x = hit.x; const y = hit.y;
      if (!p.inside || !p.lastMove || now - p.lastMove > 160) { p.x = x; p.y = y; p.lastX = x; p.lastY = y; p.inside = true; p.lastMove = now; return; }
      const dt = Math.max(.008, Math.min(.1, (now - p.lastMove) / 1000)); const dx = x - p.lastX; const dy = y - p.lastY; const distance = Math.hypot(dx, dy);
      p.vx = THREE.MathUtils.lerp(p.vx, THREE.MathUtils.clamp(dx / dt, -4, 4), .35); p.vy = THREE.MathUtils.lerp(p.vy, THREE.MathUtils.clamp(dy / dt, -4, 4), .35); p.distance += distance; p.x = x; p.y = y; p.lastX = x; p.lastY = y; p.lastMove = now; p.moved = p.moved || distance > .002;
    };
    const onLeave = (event: PointerEvent) => { if (!event.relatedTarget) reset(); };
    window.addEventListener("pointermove", onMove, { passive: true }); window.addEventListener("pointerout", onLeave); document.addEventListener("visibilitychange", reset); window.addEventListener("blur", reset); window.addEventListener("resize", reset);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerout", onLeave); document.removeEventListener("visibilitychange", reset); window.removeEventListener("blur", reset); window.removeEventListener("resize", reset); };
  }, [pointerCount, camera, gl, raycaster, ndc, spawnPlane, hit]);
  useEffect(() => {
    if (!bgRef.current) return;
    bubbles.forEach((b, i) => {
      dummy.position.copy(b.base);
      dummy.scale.setScalar(b.scale);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      bgRef.current!.setMatrixAt(i, dummy.matrix);
      bgRef.current!.setColorAt(i, b.current);
    });
    bgRef.current.instanceMatrix.needsUpdate = true;
    if (bgRef.current.instanceColor)
      bgRef.current.instanceColor.needsUpdate = true;
  }, [bubbles, dummy]);
  useEffect(() => {
    if (reduced) currentBackground.current.copy(targetBackground);
    invalidate();
  }, [reduced, targetBackground, invalidate]);
  useFrame((state, frameDelta) => {
    const delta = Math.min(frameDelta, 0.05);
    currentBackground.current.lerp(targetBackground, 1 - Math.exp(-delta * 2));
    state.scene.background = currentBackground.current;
    if (bgRef.current) {
      bubbles.forEach((b, i) => {
        const elapsed = reduced ? 0 : state.clock.elapsedTime;
        const t = elapsed * b.speed + b.phase;
        const y = -5.2 + ((b.base.y + 5.2 + elapsed * b.rise) % 10.4);
        dummy.position.set(
          b.base.x + Math.sin(t * 1.15) * b.drift,
          y + Math.cos(t * 0.8) * 0.46,
          b.base.z + Math.sin(t * 0.55) * 0.28,
        );
        dummy.scale.setScalar(b.scale * (1 + Math.sin(t * 1.8) * 0.1));
        dummy.rotation.set(t * 0.2, t * 0.28, t * 0.13);
        dummy.updateMatrix();
        bgRef.current!.setMatrixAt(i, dummy.matrix);
        b.current.lerp(colors[i % colors.length], 1 - Math.exp(-delta * 2.4));
        bgRef.current!.setColorAt(i, b.current);
      });
      bgRef.current.instanceMatrix.needsUpdate = true;
      if (bgRef.current.instanceColor)
        bgRef.current.instanceColor.needsUpdate = true;
    }
    if (pointerRef.current && pointerCount) {
      const p = cursor.current; const now = performance.now();
      if (p.moved && now - p.lastMove < 140 && now - p.lastSpawn > 40 && p.distance > .004) {
        const speed = Math.min(3.5, Math.hypot(p.vx, p.vy)); const count = 4 + Math.floor(Math.random() * 4); const baseAngle = Math.atan2(p.vy, p.vx);
        for (let n = 0; n < count; n++) { const slot = pointerData.findIndex((item) => !item.active || item.age >= item.life); if (slot < 0) break; const item = pointerData[slot]; const angle = baseAngle + (Math.random() - .5) * Math.PI * 2; const burst = .55 + Math.random() * (.55 + speed * .4); item.active = true; item.age = 0; item.life = .4 + Math.random() * .5; item.x = p.x; item.y = p.y; item.z = 0; item.vx = Math.cos(angle) * burst + p.vx * .08; item.vy = Math.sin(angle) * burst + p.vy * .08; item.angle = Math.atan2(item.vy, item.vx); item.length = .1 + Math.min(.18, speed * .04) + Math.random() * .07; item.thickness = .014 + Math.random() * .014; item.color.copy(colors[Math.floor(Math.random() * colors.length)]); }
        p.lastSpawn = now; p.distance = 0; p.moved = false;
      }
      if (now - p.lastMove > 160) p.moved = false;
      pointerData.forEach((item, i) => {
        item.age += delta;
        if (item.age > item.life) item.active = false;
        const life = Math.max(0, 1 - item.age / item.life);
        if (item.active) {
          item.x += item.vx * delta; item.y += item.vy * delta; item.vx *= Math.exp(-delta * 2.6); item.vy *= Math.exp(-delta * 2.6);
        }
        dummy.position.set(item.x, item.y, item.z);
        dummy.scale.set(item.length * (.5 + life * .5), item.thickness * (.35 + life * .65), 1); dummy.rotation.set(0, 0, item.angle);
        dummy.updateMatrix();
        pointerRef.current!.setMatrixAt(i, dummy.matrix);
        const alpha = pointerRef.current!.geometry.getAttribute("aAlpha") as THREE.InstancedBufferAttribute;
        alpha.setX(i, item.active ? life : 0);
        const color = pointerRef.current!.geometry.getAttribute("aSparkColor") as THREE.InstancedBufferAttribute;
        color.setXYZ(i, item.color.r, item.color.g, item.color.b);
      });
      pointerRef.current.instanceMatrix.needsUpdate = true;
      pointerRef.current.geometry.getAttribute("aSparkColor").needsUpdate = true;
      const attr = pointerRef.current.geometry.getAttribute(
        "aAlpha",
      ) as THREE.InstancedBufferAttribute;
      if (attr) attr.needsUpdate = true;
    }
  });
  return (
    <>
      <fog
        attach="fog"
        args={[dark ? "#0d1116" : "#f5faf8", 6, mobile ? 14 : 20]}
      />
      <ambientLight intensity={dark ? 0.65 : 0.9} />
      <pointLight
        position={[3, 2, 3]}
        intensity={dark ? 3.2 : 1.6}
        distance={12}
        color="#7fffe2"
      />
      <pointLight
        position={[-4, -1, 1]}
        intensity={dark ? 2.4 : 1.2}
        distance={10}
        color="#b69cff"
      />
      <instancedMesh ref={bgRef} args={[undefined, undefined, bgCount]} frustumCulled={false}>
        <sphereGeometry args={[1, mobile ? 16 : 22, mobile ? 12 : 16]} />
        <BubbleMaterial dark={dark} />
      </instancedMesh>
      {pointerCount > 0 && (
        <instancedMesh
          ref={pointerRef}
          args={[undefined, undefined, pointerCount]}
          frustumCulled={false}
          renderOrder={10}
        >
          <planeGeometry args={[1, 1]}>
            <instancedBufferAttribute attach="attributes-aAlpha" args={[sparkAlpha, 1]} />
            <instancedBufferAttribute attach="attributes-aSparkColor" args={[sparkColors, 3]} />
          </planeGeometry>
          <PointerMaterial dark={dark} />
        </instancedMesh>
      )}

    </>
  );
}

export default function TechBackground() {
  const { dark } = useLightDark();
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setSupported(webglAvailable());
    setReady(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setReduced(reduce.matches);
      setMobile(small.matches);
    };
    update();
    reduce.addEventListener?.("change", update);
    small.addEventListener?.("change", update);
    const onVisibility = () =>
      setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => {
      reduce.removeEventListener?.("change", update);
      small.removeEventListener?.("change", update);
      document.removeEventListener("visibilitychange", onVisibility);

    };
  }, []);
  const fallback = (
    <div
      className={`tech-background-fallback ${dark ? "dark" : ""}`}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: dark ? "#0d1116" : "#f5faf8" }}
    />
  );
  if (!ready || !supported) return fallback;
  return (
    <div className="tech-background" aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: dark ? "#0d1116" : "#f5faf8" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 46 }}
        dpr={mobile ? [1, 1.1] : [1, 1.35]}
        frameloop={!visible ? "never" : reduced ? "demand" : "always"}
        gl={{ alpha: false, antialias: false, powerPreference: "low-power" }}
        fallback={fallback}
      >
        <BubbleScene dark={dark} mobile={mobile} reduced={reduced} />
      </Canvas>
      <div className={`tech-background-scrim ${dark ? "dark" : "light"}`} />
    </div>
  );
}
