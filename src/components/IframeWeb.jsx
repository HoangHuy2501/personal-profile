import React, { useEffect, useRef, useState } from "react";

function IframeWeb({ url }) {
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);

  const DESKTOP_WIDTH = 1280;
  const DESKTOP_HEIGHT = 800;

  useEffect(() => {
    const resize = () => {
      if (!wrapperRef.current) return;
      const { offsetWidth, offsetHeight } = wrapperRef.current;

      const scaleX = offsetWidth / DESKTOP_WIDTH;
      const scaleY = offsetHeight / DESKTOP_HEIGHT;

      setScale(Math.min(scaleX, scaleY));
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto bg-gray-900 rounded-xl shadow-2xl p-1">
      <div
        ref={wrapperRef}
        className="relative w-full aspect-[16/10] bg-black overflow-hidden rounded-lg"
      >
        <iframe
          src={url}
          title="Desktop Preview"
          className="absolute top-0 left-0 border-0 origin-top-left"
          style={{
            width: DESKTOP_WIDTH,
            height: DESKTOP_HEIGHT,
            transform: `scale(${scale})`,
          }}
        />
      </div>
    </div>
  );
}

export default IframeWeb;
