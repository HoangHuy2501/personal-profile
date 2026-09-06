'use client';

import React from 'react';
import { motion, MotionConfig } from 'motion/react';
import { ArrowDownRight, Layers3, Sparkles, Terminal } from 'lucide-react';
import { useLanguage } from '../hook/useLanguage';
import BoxProject from '../components/BoxProject';
import { dataProject } from '../lib/dataProject';

function Project() {
  const { t } = useLanguage();
  const projects = dataProject(t);
  return <MotionConfig reducedMotion="user"><div className="page-wrap">
    <section className="project-hero relative overflow-hidden rounded-[2rem] bg-[#0d1116] text-white px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20"><div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(110,231,213,.22) 1px, transparent 1px),linear-gradient(90deg,rgba(110,231,213,.22) 1px,transparent 1px)', backgroundSize: '40px 40px' }} aria-hidden="true" /><div className="relative max-w-3xl"><motion.p className="eyebrow !text-[#00df8f] mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>Selected work / 02</motion.p><motion.h1 className="display-title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05 }}>{t.project.title}</motion.h1><motion.p className="mt-6 text-slate-300 text-lg max-w-2xl leading-relaxed" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 }}>{t.project.des}</motion.p><div className="mt-9 flex flex-wrap gap-3 text-sm text-slate-300"><span className="stat-pill"><Layers3 size={16} className="text-[#00df8f]" /> {projects.length} shipped projects</span><span className="stat-pill"><Terminal size={16} className="text-[#00df8f]" /> Next.js - Node.js - PostgreSQL</span></div></div><Sparkles className="absolute right-8 top-8 text-[#00df8f]/70" size={34} /></section>
    <div className="grid sm:grid-cols-3 gap-4 my-10"><div className="surface rounded-2xl p-5"><p className="eyebrow">01 / Discover</p><p className="mt-2 font-semibold text-text-light dark:text-text-dark">Understand the real workflow</p></div><div className="surface rounded-2xl p-5"><p className="eyebrow">02 / Build</p><p className="mt-2 font-semibold text-text-light dark:text-text-dark">Ship useful, maintainable UI</p></div><div className="surface rounded-2xl p-5"><p className="eyebrow">03 / Iterate</p><p className="mt-2 font-semibold text-text-light dark:text-text-dark">Debug, refine, improve</p></div></div>
    <div className="section-rule mb-6 text-[#0f9f8c]"><p className="eyebrow">Project archive</p><ArrowDownRight size={18} /></div><div className="grid md:grid-cols-2 gap-6">{projects.map((item, index) => <motion.div key={item.id} initial={{ opacity: 0, y: 24, scale: .97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .45, delay: index * .06 }}><BoxProject databox={item} /></motion.div>)}</div>
  </div></MotionConfig>;
}

export default Project;
