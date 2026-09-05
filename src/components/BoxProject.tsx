'use client';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import IframeWeb from './IframeWeb';
import { useLanguage } from '../hook/useLanguage';

function BoxProject({ databox }) {
  const { t } = useLanguage();
  return <article className="surface project-card p-4 sm:p-6"><div className="grid md:grid-cols-[minmax(220px,34%)_1fr] gap-6 items-start"><div className="aspect-video overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"><IframeWeb url={databox.url} /></div><div className="min-w-0 text-text-light dark:text-text-dark"><a href={databox.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2"><h2 className="text-2xl sm:text-3xl font-semibold tracking-tight group-hover:text-[#0f9f8c] transition-colors">{databox.title}</h2><ArrowUpRight size={19} className="text-[#0f9f8c]" /></a><div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm"><div><p className="eyebrow !tracking-[.1em]">{t.project.box.position}</p><p className="mt-1">{databox.position}</p></div><div><p className="eyebrow !tracking-[.1em]">{t.project.box.time}</p><p className="mt-1">{databox.time}</p></div><div><p className="eyebrow !tracking-[.1em]">{t.project.box.teamSize}</p><p className="mt-1">{databox.teamSize}</p></div></div><p className="muted mt-5 leading-relaxed">{databox.des}</p><p className="mt-4 text-sm break-words"><span className="font-semibold">{t.project.box.acount}:</span> {databox.acount.tk} · {databox.acount.mk}</p><div className="mt-4 flex flex-wrap gap-2 text-xs">{['BE','FE','DB','Tools'].map((key) => <span key={key} className="skill-chip !rounded-lg !text-xs"><strong>{key}</strong>{databox.tech[key] || 'No data'}</span>)}</div></div></div></article>;
}
export default BoxProject;
