"use client";
import React from "react";
import { Select } from "antd";
import { useLanguage } from "../hook/useLanguage";
import { saveLanguage } from "../Utils/authUtils";
import { usePathname, useRouter } from "next/navigation";
function ButtonLanguage() {
  const { t, setLang, lang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const handleLanguage = (value) => {
    setLang(value);
    saveLanguage(value);
    const nextLocale = value === "en-US" ? "en" : "vi";
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "en" || segments[0] === "vi") segments.shift();
    router.push(
      `/${nextLocale}${segments.length ? `/${segments.join("/")}` : ""}`,
    );
  };
  return (
    <div className="py-1">
      <Select
        value={lang}
        onChange={handleLanguage}
        className="min-w-[110px]"
        variant="borderless"
      >
        <Select.Option value="en-US">{t.language.Eng}</Select.Option>
        <Select.Option value="vi-VN">{t.language.Vie}</Select.Option>
      </Select>
    </div>
  );
}

export default ButtonLanguage;
