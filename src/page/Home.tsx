'use client';
import React, { useMemo } from 'react';
import { motion, MotionConfig } from 'motion/react';
import wf from '../assets/image/avatar.jpg';
import { useLanguage } from '../hook/useLanguage';
import ButtonLink from '../components/customButton/ButtonLink';
import { ArrowUpRight, Mail } from 'lucide-react';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiAntdesign } from 'react-icons/si';
import { BiLogoPostgresql } from 'react-icons/bi';
import TechSkill from '../components/Tech&Skill';

function Home() {
  const { t } = useLanguage();
  const skill: Array<[string, React.ReactNode, string]> = useMemo(() => [["React", <FaReact />, '#61DBFB'], ["Node.js", <FaNodeJs />, '#339933'],["Next.js", <FaNodeJs />, '#06B6D7'],["Nest.js", <FaNodeJs />, '#339933'], ["Tailwind CSS", <SiTailwindcss />, '#06B6D4'], ["Ant Design", <SiAntdesign />, '#1890FF'], ["PostgreSQL", <BiLogoPostgresql />, '#3B82F6']], []);
  const Motion = motion;
  return <MotionConfig reducedMotion="user"><div className="page-wrap"><section className="grid-bg rounded-[2rem] px-5 py-10 sm:px-10 sm:py-16 lg:px-20 lg:py-24 relative overflow-hidden"><div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#0f9f8c]/15 blur-3xl" aria-hidden="true" /><div className="relative max-w-4xl"><Motion.p className="eyebrow mb-5" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.35}}>Available for new opportunities · Da Nang, Viet Nam</Motion.p><Motion.h1 className="display-title text-text-light dark:text-text-dark max-w-4xl" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.45,delay:.05}}>{t.info.hello}, {t.info.Iam} <span className="text-[#0f9f8c]">{t.header.namedev}</span></Motion.h1><Motion.p className="mt-7 text-lg sm:text-xl muted max-w-2xl leading-relaxed" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.4,delay:.12}}>{t.info.des}. {t.info.expert}</Motion.p><div className="mt-9 flex flex-wrap gap-3"><ButtonLink url="/project" title={t.info.view_project} icon={<ArrowUpRight size={17}/>} type="primary"/><ButtonLink url="/contact" title={t.info.contact} icon={<Mail size={17}/>}/></div><div className="mt-10 flex flex-wrap gap-2">{skill.map(([name, icon, color], i) => <Motion.span key={name} className="skill-chip" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.25,delay:.2+i*.05}} style={{borderColor:`${color}55`}}><span style={{color}}>{icon}</span>{name}</Motion.span>)}</div></div><div className="hidden lg:block absolute right-16 bottom-14"><div className="w-44 h-44 rounded-[2rem] overflow-hidden rotate-6 ring-8 ring-white/70 dark:ring-slate-800/70 shadow-2xl"><img src={wf.src} alt="Nguyen Hoang Huy portrait" className="w-full h-full object-cover" /></div></div></section><section className="pt-20"><div className="flex items-end justify-between gap-4 mb-8"><div><p className="eyebrow mb-3">Toolkit</p><h2 className="section-title text-text-light dark:text-text-dark">{t.techSkill.skill} & <span className="text-[#0f9f8c]">{t.techSkill.tech}</span></h2></div></div><TechSkill /></section></div></MotionConfig>;
}
export default Home;
