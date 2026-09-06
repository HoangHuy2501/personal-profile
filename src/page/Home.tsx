'use client';

import React, { useMemo } from 'react';
import { motion, MotionConfig } from 'motion/react';
import wf from '../assets/image/avatar.jpg';
import { useLanguage } from '../hook/useLanguage';
import ButtonLink from '../components/customButton/ButtonLink';
import { ArrowUpRight, Mail, MoveUpRight } from 'lucide-react';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiAntdesign } from 'react-icons/si';
import { BiLogoPostgresql } from 'react-icons/bi';
import TechSkill from '../components/Tech&Skill';
import PortfolioMarquee from '../components/PortfolioMarquee';

function Home() {
  const { t } = useLanguage();
  const skill: Array<[string, React.ReactNode, string]> = useMemo(() => [
    ['React', <FaReact />, '#61DBFB'], ['Node.js', <FaNodeJs />, '#339933'], ['Next.js', <FaNodeJs />, '#06B6D7'],
    ['Nest.js', <FaNodeJs />, '#339933'], ['Tailwind CSS', <SiTailwindcss />, '#06B6D4'], ['Ant Design', <SiAntdesign />, '#1890FF'], ['PostgreSQL', <BiLogoPostgresql />, '#3B82F6'],
  ], []);
  const Motion = motion;

  return <MotionConfig reducedMotion="user"><div className="page-wrap">
    <section className="hero-shell grid-bg min-h-[calc(100svh-7rem)] rounded-[2rem] px-5 py-10 sm:px-10 sm:py-16 lg:px-16 lg:py-20 relative overflow-hidden">
      <Motion.div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#0f9f8c]/15 blur-3xl" initial={{ scale: 1.12, opacity: 0 }} animate={{ scale: 1, opacity: .75 }} transition={{ duration: 1.8 }} aria-hidden="true" />
      <div className="relative grid lg:grid-cols-[minmax(0,1fr)_320px] gap-12 items-center">
        <div className="max-w-3xl">
          <Motion.p className="eyebrow mb-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>Available for new opportunities / Da Nang, Viet Nam</Motion.p>
          <Motion.h1 className="display-title text-text-light dark:text-text-dark" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: .05 }}>{t.info.hello}, {t.info.Iam} <span className="outline-text">{t.header.namedev}</span></Motion.h1>
          <Motion.p className="mt-7 text-lg sm:text-xl muted max-w-2xl leading-relaxed" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, delay: .12 }}>{t.info.des}. {t.info.expert}</Motion.p>
          <Motion.div className="mt-9 flex flex-wrap gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: .18 }}>
            <ButtonLink url="/project" title={t.info.view_project} icon={<ArrowUpRight size={17} />} type="primary" />
            <ButtonLink url="/contact" title={t.info.contact} icon={<Mail size={17} />} />
          </Motion.div>
          <div className="mt-10 flex flex-wrap gap-2">{skill.map(([name, icon, color], i) => <Motion.span key={name} className="skill-chip" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25, delay: .2 + i * .05 }} style={{ borderColor: `${color}55` }}><span style={{ color }}>{icon}</span>{name}</Motion.span>)}</div>
        </div>
        <Motion.aside className="hero-aside rounded-2xl p-5 sm:p-6" style={{ transformStyle: 'preserve-3d' }} initial={{ opacity: 0, scale: .96, x: 16 }} animate={{ opacity: 1, scale: 1, x: 0 }} whileHover={{ rotateX: -2, rotateY: 3, y: -4 }} transition={{ duration: .5, delay: .15 }}>
          <div className="flex items-center justify-between mb-5"><span className="font-mono text-xs tracking-[.2em] text-[#6ee7d5]">/ PROFILE.JSON</span><span className="h-2 w-2 rounded-full bg-[#6ee7d5] shadow-[0_0_14px_#6ee7d5]" aria-label="Available" /></div>
          <motion.div className="rounded-xl overflow-hidden mb-5 aspect-[3/4] max-h-[360px] bg-[#112b3c]" animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }} transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}><img src={wf.src} alt="Nguyen Hoang Huy portrait" className="w-full h-full object-cover" /></motion.div>
          <div className="space-y-1"><div className="code-line"><span className="ln">01</span><span className="key">name:</span><span className="value">{t.header.namedev}</span></div><div className="code-line"><span className="ln">02</span><span className="key">role:</span><span className="value">fullstack_dev</span></div><div className="code-line"><span className="ln">03</span><span className="key">base:</span><span className="value">Da_Nang</span></div><div className="code-line"><span className="ln">04</span><span className="comment">// ship useful things</span></div></div>
          <a href="mailto:huy04.developer@gmail.com" className="mt-5 inline-flex items-center gap-2 text-sm text-[#b6ece5] hover:text-white transition-colors">Let's connect <MoveUpRight size={15} /></a>
        </Motion.aside>
      </div>
    </section>
    <PortfolioMarquee />
    <section className="pt-20 sm:pt-24"><div className="section-rule mb-8 text-[#0f9f8c]"><p className="eyebrow">Toolkit</p></div><div className="flex items-end justify-between gap-4 mb-8"><div><h2 className="section-title text-text-light dark:text-text-dark">{t.techSkill.skill} & <span className="text-[#0f9f8c]">{t.techSkill.tech}</span></h2><p className="muted mt-4 max-w-xl">A focused stack for shipping dependable products from first screen to production.</p></div></div><TechSkill /></section>
  </div></MotionConfig>;
}

export default Home;
