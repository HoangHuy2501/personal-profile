"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useLanguage } from "../../hook/useLanguage";
import { trackVisit } from "../../services/VisitorServices";

export default function VisitorTracker({ enabled }: { enabled: boolean }) {
  const pathname = usePathname() || "";
  const { t } = useLanguage();
  const copy = t.visitor.consent;
  const [choice, setChoice] = useState<"pending" | "yes" | "no">("pending");

  useEffect(() => {
    if (!enabled || !pathname.match(/^\/(en|vi)(?:\/|$)/) || pathname.includes("/visitor-map")) return;
    const saved = localStorage.getItem("visitor-consent");
    if (saved === "no") {
      setChoice("no");
      return;
    }
    if (saved === "yes") {
      setChoice("yes");
      let id = sessionStorage.getItem("visitor-session-id");
      if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem("visitor-session-id", id);
        void trackVisit(id).catch(() => undefined);
      }
    }
  }, [enabled, pathname]);

  if (!enabled || choice !== "pending" || pathname.includes("/visitor-map")) return null;

  return (
    <aside className="tracking-notice text-text-light dark:text-text-dark" role="status">
      <p>{copy.notice}</p>
      <p className="text-xs mt-1">{copy.noticeSecondary}</p>
      <div className="flex gap-2 mt-3">
        <button className="mint-button" onClick={() => {
          localStorage.setItem("visitor-consent", "yes");
          setChoice("yes");
          const id = crypto.randomUUID();
          sessionStorage.setItem("visitor-session-id", id);
          void trackVisit(id)
            .then(() => toast.success(copy.enabled))
            .catch(() => toast.error(copy.recordError));
        }}>
          {copy.allow}
        </button>
        {/* <button className="text-link" onClick={() => {
          localStorage.setItem("visitor-consent", "no");
          setChoice("no");
          toast.message(copy.disabled);
        }}>
          {copy.disable}
        </button> */}
      </div>
    </aside>
  );
}
