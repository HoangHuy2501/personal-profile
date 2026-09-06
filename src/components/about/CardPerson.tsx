"use client";
import React from "react";
import { Card } from "antd";
import { useLanguage } from "../../hook/useLanguage";
import { personInfo } from "../../lib/dataAbout";
import { motion } from "motion/react";
function CardPerson() {
  const { t } = useLanguage();
  const dataPerson = personInfo(t);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="surface mt-0">
        <h2 className="text-[#00a977] text-2xl font-semibold">
          {t.personInfo.title}
        </h2>
        {dataPerson.map((item) => {
          const Icon = item.icon;
          return (
            <p key={item.id}>
              <span className="mr-4 text-[#00a977] text-base">
                <Icon />
              </span>
              <span className="text-text-light dark:text-text-dark font-bold mr-2">
                {item.title}:
              </span>
              {item.value}
            </p>
          );
        })}
      </Card>
    </motion.div>
  );
}

export default CardPerson;
