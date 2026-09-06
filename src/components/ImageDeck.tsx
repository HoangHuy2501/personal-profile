"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import dataImage from "../lib/dataImage";

function fanOffset(index: number, active: number, count: number) {
  if (count <= 1 || index === active) return 0;
  if (count === 2) return index < active ? -1 : 1;
  const raw = (index - active + count) % count;
  return raw > Math.floor(count / 2) ? raw - count : raw;
}

const clampVisible = (offset: number, count: number) =>
  count <= 4 || Math.abs(offset) <= 2;

export default function ImageDeck() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1024);
  const openerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasExpanded = useRef(false);
  const count = dataImage.length;
  const select = useCallback(
    (index: number) => setActive((index + count) % count),
    [count],
  );
  const previous = useCallback(
    () => setActive((value) => (value - 1 + count) % count),
    [count],
  );
  const next = useCallback(
    () => setActive((value) => (value + 1) % count),
    [count],
  );

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  useEffect(() => {
    if (!expanded) {
      if (wasExpanded.current)
        openerRef.current?.focus({ preventScroll: true });
      wasExpanded.current = false;
      return;
    }
    wasExpanded.current = true;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
      else if (event.key === "ArrowLeft") previous();
      else if (event.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => dialogRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded, next, previous]);

  if (!count) return null;
  const renderCards = (large: boolean) =>
    dataImage.map((image, index) => {
      const offset = fanOffset(index, active, count);
      const isActive = offset === 0;
      if (large && !clampVisible(offset, count)) return null;
      const spread = large ? Math.min(210, viewportWidth * 0.17) : 24;
      const scale = isActive
        ? 1
        : Math.max(0.72, 1 - Math.abs(offset) * (large ? 0.065 : 0.055));
      return (
        <motion.button
          ref={isActive && !large ? openerRef : undefined}
          key={`${large ? "large" : "small"}-${image.src}-${index}`}
          type="button"
          className={`image-deck-${large ? "expanded-card" : "card"} ${isActive ? "is-active" : "is-behind"}`}
          style={{
            zIndex: isActive ? count + 2 : count - Math.abs(offset),
            pointerEvents: "auto",
          }}
          animate={{
            x: isActive ? 0 : offset * spread,
            y: isActive ? 0 : Math.abs(offset) * (large ? 10 : 5),
            rotate: isActive ? 0 : offset * (large ? 8 : 7),
            scale,
            opacity: isActive ? 1 : 0.78,
          }}
          transition={{
            type: "spring",
            stiffness: large ? 180 : 260,
            damping: 24,
            mass: 0.8,
          }}
          onClick={() =>
            isActive ? !large && setExpanded(true) : select(index)
          }
          aria-label={
            isActive
              ? large
                ? `Current image: ${image.label}`
                : `Open ${image.label} image`
              : `Show ${image.label}`
          }
        >
          <img src={image.src} alt={image.alt} draggable={false} />
          {large && <span>{image.label}</span>}
        </motion.button>
      );
    });

  return (
    <>
      <div
        className="image-deck"
        role="region"
        aria-label="Profile image gallery"
      >
        <div className="image-deck-stack" aria-live="polite">
          {renderCards(false)}
        </div>
        <div className="image-deck-controls">
          <button type="button" onClick={previous} aria-label="Previous image">
            <ChevronLeft size={16} />
          </button>
          <div className="image-deck-dots">
            {dataImage.map((image, index) => (
              <button
                key={`${image.label}-dot`}
                type="button"
                className={index === active ? "active" : ""}
                onClick={() => select(index)}
                aria-label={`Select ${image.label}`}
              />
            ))}
          </div>
          <button type="button" onClick={next} aria-label="Next image">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {expanded && (
              <motion.div
                className="image-deck-lightbox"
                role="dialog"
                aria-modal="true"
                aria-label={`${dataImage[active].label} image gallery`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpanded(false)}
              >
                <motion.div
                  ref={dialogRef}
                  tabIndex={-1}
                  className="image-deck-modal image-deck-expanded"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 180, damping: 25 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    className="image-deck-close"
                    onClick={() => setExpanded(false)}
                    aria-label="Close image preview"
                  >
                    <X size={19} />
                  </button>
                  <div className="image-deck-expanded-stack">
                    {renderCards(true)}
                  </div>
                  <div className="image-deck-modal-bar">
                    <span>{dataImage[active].label}</span>
                    <span>
                      {active + 1} / {count}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="image-deck-nav prev"
                    onClick={previous}
                    aria-label="Previous image"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    type="button"
                    className="image-deck-nav next"
                    onClick={next}
                    aria-label="Next image"
                  >
                    <ChevronRight />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
