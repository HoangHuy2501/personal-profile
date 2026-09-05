'use client';
import React from 'react';
import ImageBox from '../components/about/ImageBox';
import CardPerson from '../components/about/CardPerson';
import CardDev from '../components/about/CardDev';
import TimelinePerson from '../components/about/TimelinePerson';
import Hobbies from '../components/about/Hobbies';
import { useLanguage } from '../hook/useLanguage';
import ButtonLink from '../components/customButton/ButtonLink';

function About() {
  const { t } = useLanguage();
  return <div className="page-wrap"><div className="mb-12"><p className="eyebrow mb-3">Profile / 01</p><h1 className="section-title text-text-light dark:text-text-dark">A builder who stays curious.</h1><div className="accent-line mt-5" /></div><div className="grid lg:grid-cols-[330px_1fr] gap-8 lg:gap-14"><aside><ImageBox /><CardPerson /><CardDev /></aside><div><section><p className="eyebrow mb-3">// {t.personInfo.objective.classify}</p><h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-light dark:text-text-dark">{t.personInfo.objective.title}</h2><p className="muted mt-5 leading-relaxed">{t.personInfo.objective.des1}</p><p className="muted mt-3 leading-relaxed">{t.personInfo.objective.des2}</p></section><TimelinePerson /><Hobbies /><div className="mt-8"><ButtonLink url="https://github.com/HoangHuy2501" title={t.info.view_git} tab /></div></div></div></div>;
}
export default About;
