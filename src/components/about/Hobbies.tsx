"use client";
import React from "react";
import { Card } from "antd";
import { useLanguage } from "../../hook/useLanguage";
import { hobbies } from "../../lib/dataAbout";
import { motion } from "motion/react";
function Hobbies() {
  const { t } = useLanguage();
  const dataHobbies = hobbies(t);
  return (
    <div className="mt-6">
      <p className="text-[#00a977] font-bold">
        // {t.personInfo.hobbies.classify}
      </p>
      {dataHobbies.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -2 }}
            className="inline-flex"
          >
            <Card
              className="inline-flex items-center gap-3 border dark:border-gray-600 rounded-full px-3 py-1 text-sm font-medium text-text-light dark:text-text-dark m-2"
              styles={{
                body: { padding: 5, display: "flex", alignItems: "center" },
              }}
            >
              <span className="text-[#00a977] mr-2">
                <Icon />
              </span>
              <span>{item.name}</span>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

export default Hobbies;
