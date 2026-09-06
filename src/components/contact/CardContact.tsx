"use client";

import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../../hook/useLanguage";
import { contactInfo } from "../../lib/dataContact";
import openAppOrWeb from "../../Utils/openAppOrWeb";

function CardContact() {
  const { t } = useLanguage();
  const dataContact = contactInfo(t);
  const handleClick = (item) => {
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    if (item.appUrl && isMobile) openAppOrWeb(item.appUrl, item.webUrl);
    else if (item.webUrl && item.webUrl !== "#")
      window.open(item.webUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
      {dataContact.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.button
            type="button"
            key={item.id}
            onClick={() => handleClick(item)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") handleClick(item);
            }}
            className="contact-card text-left"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, rotateX: -2, rotateY: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
          >
            <span className="contact-icon">
              <Icon />
            </span>
            <span className="contact-title">{item.title}</span>
            <span className="contact-value">{item.value}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default CardContact;
