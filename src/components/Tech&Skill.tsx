"use client";

import React from "react";
import { motion, MotionConfig } from "motion/react";
import { useLanguage } from "../hook/useLanguage";
import { Card } from "antd";
import { getDataSkill } from "../lib/dataSkill";

function TechSkill() {
  const { t } = useLanguage();
  const dataSkill = getDataSkill(t);
  return (
    <MotionConfig reducedMotion="user">
      <div className="md:mx-20 mx-0">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-4">
          {dataSkill.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <Card className="surface h-full !rounded-2xl !border-0 px-2">
                <h3 className="text-lg mb-4 font-semibold text-text-light dark:text-text-dark">
                  {item.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.skill.map((skillItem) => (
                    <div key={skillItem.id}>
                      {skillItem.name ? (
                        <div
                          className="skill-chip"
                          style={{
                            borderColor: skillItem.color,
                            color: skillItem.color,
                            backgroundColor: `${skillItem.color}20`,
                          }}
                        >
                          {skillItem.name}
                        </div>
                      ) : (
                        <div className="w-full text-text-light dark:text-text-dark">
                          <p>
                            <span className="font-bold mr-2">
                              {skillItem.title}:
                            </span>{" "}
                            {skillItem.des}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  {item.des && (
                    <div className="w-full text-text-light dark:text-text-dark">
                      <p>{item.des}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}

export default TechSkill;
