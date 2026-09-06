"use client";

import React from "react";
import { Image, Card } from "antd";
import { motion } from "motion/react";
import imgbox from "../../assets/image/imagebox.jpg";
import { useLanguage } from "../../hook/useLanguage";

function ImageBox() {
  const { t } = useLanguage();
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ rotate: -1, y: -4 }}
    >
      <Card
        className="surface relative overflow-hidden !rounded-2xl"
        styles={{ body: { padding: 10 } }}
      >
        <Image
          src={imgbox.src}
          className="rounded-lg"
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "4 / 3",
            objectFit: "cover",
          }}
          preview={false}
        />
        <div className="absolute inset-x-5 bottom-5 rounded-lg bg-[#0d1116]/80 px-3 py-2 backdrop-blur-sm">
          <h2 className="text-[#00df8f] font-semibold">{t.header.namedev}</h2>
          <p className="text-slate-200 text-sm">{t.header.level}</p>
        </div>
      </Card>
    </motion.div>
  );
}

export default ImageBox;
