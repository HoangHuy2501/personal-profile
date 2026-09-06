import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  localeFromPath,
  localizedPath,
  normalizeLocale,
  type Locale,
} from "../../lib/locale";
type ButtonLinkProps = {
  url: string;
  title: string;
  icon?: React.ReactNode;
  type?: string;
  tab?: boolean;
};
function ButtonLink({ url, title, icon, type, tab }: ButtonLinkProps) {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(
    () => localeFromPath(pathname) ?? "en",
  );
  useEffect(() => {
    const pathLocale = localeFromPath(pathname);
    setLocale(
      pathLocale ??
        (typeof window !== "undefined"
          ? normalizeLocale(window.localStorage.getItem("language"))
          : "en"),
    );
  }, [pathname]);
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${type === "primary" ? "bg-[#0f9f8c] text-white hover:bg-[#087f73]" : "border border-slate-300 dark:border-slate-600 text-text-light dark:text-text-dark hover:border-[#0f9f8c]"}`;
  const content = (
    <>
      {title}
      {icon}
    </>
  );
  return tab || url.startsWith("http") ? (
    <a
      className={classes}
      href={url}
      target={tab ? "_blank" : undefined}
      rel={tab ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  ) : (
    <Link className={classes} href={localizedPath(url, locale)}>
      {content}
    </Link>
  );
}

export default ButtonLink;
