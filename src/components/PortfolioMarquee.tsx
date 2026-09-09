"use client";

import React from "react";
import { motion, MotionConfig } from "motion/react";
import { useLanguage } from "../hook/useLanguage";

export default function PortfolioMarquee() {
  const { t } = useLanguage();
  const copy = t.ui.home;
  const capabilities = copy.capabilityItems;
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="marquee-band"
        aria-label={copy.capabilities}
      >
        <div className="marquee-viewport">
          <motion.div
            className="marquee-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {[...capabilities, ...capabilities].map((item, index) => (
              <React.Fragment key={`${item}-${index}`}>
                <span
                  className="marquee-item"
                  aria-hidden={index >= capabilities.length ? true : undefined}
                >
                  {item}
                </span>
                <span className="marquee-star" aria-hidden="true">
                  *
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
