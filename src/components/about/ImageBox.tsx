'use client';
import React from "react";
import { Image, Card } from "antd";
import imgbox from "../../assets/image/imagebox.jpg";
import { useLanguage } from "../../hook/useLanguage";
import {useRevealOnScroll} from '../../hook/useRevealOnScroll';
function ImageBox() {
  const { t } = useLanguage();
  const { ref, show } = useRevealOnScroll();
  return (
    <div className="w-full h-auto">
      <Card
      ref={ref} className={`card-reveal ${show ? "show" : ""} mt-6 border dark:border-gray-600 shadow-sm`}
        styles={{ body: { padding: 10 } }}
      >
        <Image
          src={imgbox.src}
          className="rounded-lg"
          style={{ width: "100%", height: "auto", aspectRatio: "4 / 3", objectFit: "cover" }}
          preview={false}
        />
        <div className="absolute bottom-4 left-6">
          <h2 className="text-gradient">{t.header.namedev}</h2>
          <p className="text-text-dark dark:text-text-dark">{t.header.level}</p>
        </div>
      </Card>
    </div>
  );
}

export default ImageBox;
