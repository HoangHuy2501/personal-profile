"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useLanguage } from "../../hook/useLanguage";
import {
  FeedbackItem,
  getFeedback,
  postFeedback,
  postReply,
  unlockFeedback,
} from "../../services/FeedbackServices";
import PasswordDialog from "../admin/PasswordDialog";

const createIdempotencyKey = () => {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

function feedbackError(error: unknown, copy: any, fallback: string) {
  const code = error instanceof Error ? error.message : "";
  if (code === "feedback" || code === "feedback_unavailable" || code.includes("Feedback")) return copy.errors.load;
  if (code === "feedback_validation") return copy.errors.validation;
  if (code === "feedback_submit") return copy.errors.send;
  if (code === "rate_limited") return copy.errors.unknown;
  if (code.includes("10-2000") || code.includes("10–2000")) return copy.errors.validation;
  if (code === "feedback_reply_required" || code === "Enter a reply.") return copy.replyRequired;
  if (code === "reply" || code === "reply_submit" || code === "reply_expired" || code.includes("Reply")) return copy.errors.reply;
  if (!code || code === "Unable to send") return fallback;
  return copy.errors.unknown;
}

export default function FeedbackSection() {
  const { lang, t } = useLanguage();
  const copy = t.feedback;
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [replyFor, setReplyFor] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [passwordOpen, setPasswordOpen] = useState(false);

  const load = useCallback(async (next = 1) => {
    setLoading(true);
    setError("");
    try {
      const result = await getFeedback(next);
      setItems(result.items);
      setPage(result.page);
      setPages(result.pages);
    } catch (loadError) {
      setError(feedbackError(loadError, copy, copy.errors.load));
    } finally {
      setLoading(false);
    }
  }, [copy]);

  useEffect(() => { void load(1); }, [load]);

  async function submit() {
    if (content.trim().length < 10 || content.trim().length > 2000) {
      toast.error(copy.errors.validation);
      return;
    }
    setSending(true);
    setError("");
    try {
      await postFeedback({ displayName: name, content, website: honeypot, idempotencyKey: createIdempotencyKey() });
      setContent("");
      setName("");
      toast.success(copy.sent);
      await load(1);
    } catch (submitError) {
      const message = feedbackError(submitError, copy, copy.errors.send);
      setError(message);
      toast.error(message);
    } finally {
      setSending(false);
    }
  }

  async function unlock(password: string) {
    if (!replyFor) return;
    const text = reply.trim();
    if (!text) throw new Error("feedback_reply_required");
    await unlockFeedback(password, replyFor);
    await postReply(replyFor, text);
    setReply("");
    setReplyFor(null);
    setPasswordOpen(false);
    toast.success(copy.replyPublished);
    await load(page);
  }

  return (
    <motion.section className="feedback-section mt-14 text-text-light dark:text-text-dark" aria-labelledby="feedback-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <div className="section-rule mb-6 text-[#0f9f8c]"><p className="eyebrow">{copy.eyebrow}</p></div>
      <div className="feedback-grid">
        <div>
          <h2 id="feedback-heading" className="section-title">{copy.heading}</h2>
          <p className="muted mt-3">{copy.publicNotice}</p>
          <div className="surface feedback-form mt-6">
            <label>{copy.displayNameLabel}<input value={name} onChange={(event) => setName(event.target.value)} maxLength={60} placeholder={copy.displayNamePlaceholder} /></label>
            <label>{copy.contentLabel}<textarea value={content} onChange={(event) => setContent(event.target.value)} minLength={10} maxLength={2000} rows={5} required /></label>
            <input tabIndex={-1} aria-hidden="true" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} className="hp-field" />
            <button className="mint-button" onClick={submit} disabled={sending || content.trim().length < 10}>{sending ? copy.sending : copy.send}</button>
          </div>
        </div>
        <div className="feedback-list">
          {loading ? <p className="muted">{copy.loading}</p> : error ? <div><p className="text-red-500">{error}</p><button className="text-link mt-2" onClick={() => void load(page)}>{copy.retry}</button></div> : items.length === 0 ? <p className="muted">{copy.empty}</p> : items.map((item, index) => (
            <motion.article className="feedback-item surface" key={item.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06, duration: 0.35 }}>
              <div className="flex justify-between gap-3"><strong>{item.displayName}</strong><time className="muted text-xs">{new Date(item.createdAt).toLocaleString(lang === "vi-VN" ? "vi-VN" : "en-US")}</time></div>
              <p className="mt-3 whitespace-pre-wrap">{item.content}</p>
              {item.replies.map((itemReply) => <div className="feedback-reply" key={itemReply.id}><strong>{itemReply.authorKey === "owner" || !itemReply.author ? copy.owner : itemReply.author}</strong><p className="whitespace-pre-wrap mt-1">{itemReply.content}</p></div>)}
              <button className="text-link mt-3" onClick={() => { setReplyFor(item.id); setPasswordOpen(true); }}>{copy.reply}</button>
            </motion.article>
          ))}
          <div className="flex items-center gap-3 mt-4">{pages > 1 && <><button className="text-link" disabled={page <= 1} onClick={() => void load(page - 1)} aria-label={copy.previousPage}>←</button><span className="muted text-sm">{page}/{pages}</span><button className="text-link" disabled={page >= pages} onClick={() => void load(page + 1)} aria-label={copy.nextPage}>→</button></>}</div>
        </div>
      </div>
      <PasswordDialog open={passwordOpen} title={copy.replyTitle} description={copy.replyDescription} onClose={() => { setPasswordOpen(false); setReplyFor(null); }} onSubmit={unlock}>
        {replyFor && <textarea className="mt-4 w-full" value={reply} onChange={(event) => setReply(event.target.value)} maxLength={2000} rows={3} required placeholder={copy.replyPlaceholder} />}
      </PasswordDialog>
    </motion.section>
  );
}
