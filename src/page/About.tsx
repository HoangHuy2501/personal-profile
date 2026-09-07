"use client";

import React from "react";
import { motion, MotionConfig } from "motion/react";
import ImageBox from "../components/about/ImageBox";
import CardPerson from "../components/about/CardPerson";
import CardDev from "../components/about/CardDev";
import TimelinePerson from "../components/about/TimelinePerson";
import Hobbies from "../components/about/Hobbies";
import { useLanguage } from "../hook/useLanguage";
import ButtonLink from "../components/customButton/ButtonLink";

function About() {
  const { t } = useLanguage();
  return (
    <MotionConfig reducedMotion="user">
      <div className="page-wrap">
        <motion.header
          className="page-heading"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="eyebrow mb-3">Profile / 01</p>
          <h1 className="section-title text-text-light dark:text-text-dark">
            A builder who stays <span className="outline-text">curious.</span>
          </h1>
          <div className="accent-line mt-5" />
        </motion.header>
        <div className="about-layout">
          <motion.aside
            className="about-sidebar"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ImageBox />
            <CardPerson />
            <CardDev />
          </motion.aside>
          <motion.main
            className="about-main"
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <section className="about-intro">
              <p className="eyebrow mb-3">
                // {t.personInfo.objective.classify}
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-light dark:text-text-dark">
                {t.personInfo.objective.title}
              </h2>
              <p className="muted mt-5 leading-relaxed">
                {t.personInfo.objective.des1}
              </p>
              <p className="muted mt-3 leading-relaxed">
                {t.personInfo.objective.des2}
              </p>
            </section>
            <TimelinePerson />
            <Hobbies />
            <div className="mt-8">
              <ButtonLink
                url="https://github.com/HoangHuy2501"
                title={t.info.view_git}
                tab
              />
            </div>
          </motion.main>
        </div>
      </div>
    </MotionConfig>
  );
}

export default About;
