"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import IframeWeb from "./IframeWeb";
import { useLanguage } from "../hook/useLanguage";

type ProjectBoxData = {
  title: string;
  url: string;
  position: string;
  time: string;
  teamSize: string;
  des: string;
  acount: { tk: string; mk: string };
  tech: Record<string, string | undefined>;
};

function BoxProject({ databox }: { databox: ProjectBoxData }) {
  const { t } = useLanguage();
  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--spotlight-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--spotlight-y",
      `${event.clientY - rect.top}px`,
    );
  };
  return (
    <motion.article
      className="surface project-card spotlight-card p-4 sm:p-6"
      onPointerMove={handlePointerMove}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <div className="project-preview aspect-video overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
        <IframeWeb url={databox.url} />
      </div>
      <div className="min-w-0 text-text-light dark:text-text-dark pt-5">
        <a
          href={databox.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight group-hover:text-[#00df8f] transition-colors">
            {databox.title}
          </h2>
          <span className="arrow-button">
            <ArrowUpRight size={17} />
          </span>
        </a>
        <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
          <div>
            <p className="eyebrow !tracking-[.1em]">{t.project.box.position}</p>
            <p className="mt-1">{databox.position}</p>
          </div>
          <div>
            <p className="eyebrow !tracking-[.1em]">{t.project.box.time}</p>
            <p className="mt-1">{databox.time}</p>
          </div>
          <div>
            <p className="eyebrow !tracking-[.1em]">{t.project.box.teamSize}</p>
            <p className="mt-1">{databox.teamSize}</p>
          </div>
        </div>
        <p className="muted mt-5 leading-relaxed">{databox.des}</p>
        <p className="mt-4 text-sm break-words">
          <span className="font-semibold">{t.project.box.acount}:</span>{" "}
          {databox.acount.tk} - {databox.acount.mk}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {["BE", "FE", "DB", "Tools"].map((key) => (
            <span key={key} className="skill-chip !rounded-lg !text-xs">
              <strong>{key}</strong>
              {databox.tech[key] || "No data"}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default BoxProject;
