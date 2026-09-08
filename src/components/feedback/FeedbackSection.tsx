"use client";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "../../hook/useLanguage";
import {
  FeedbackItem,
  getFeedback,
  postFeedback,
  postReply,
  unlockFeedback,
} from "../../services/FeedbackServices";
import PasswordDialog from "../admin/PasswordDialog";
import { toast } from "sonner";
import { motion } from "motion/react";

const key = () => {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
};
export default function FeedbackSection() {
  const { lang } = useLanguage();
  const vi = lang === "vi-VN";
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
  const load = useCallback(
    async (next = 1) => {
      setLoading(true);
      setError("");
      try {
        const result = await getFeedback(next);
        setItems(result.items);
        setPage(result.page);
        setPages(result.pages);
      } catch {
        setError(vi ? "Không thể tải sổ góp ý." : "Could not load feedback.");
      } finally {
        setLoading(false);
      }
    },
    [vi],
  );
  useEffect(() => {
    load(1);
  }, [load]);
  async function submit() {
    if (content.trim().length < 10 || content.trim().length > 2000) {
      toast.error(
        vi
          ? "Nội dung cần từ 10 đến 2000 ký tự."
          : "Feedback must be 10–2000 characters.",
      );
      return;
    }
    setSending(true);
    try {
      await postFeedback({
        displayName: name,
        content,
        website: honeypot,
        idempotencyKey: key(),
      });
      setContent("");
      setName("");
      toast.success(vi ? "Đã gửi góp ý." : "Feedback sent.");
      await load(1);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unable to send";
      setError(message);
      toast.error(message);
    } finally {
      setSending(false);
    }
  }
  async function unlock(password: string) {
    if (!replyFor) return;
    const text = reply.trim();
    if (!text)
      throw new Error(vi ? "Nhập nội dung phản hồi." : "Enter a reply.");
    await unlockFeedback(password, replyFor);
    await postReply(replyFor, text);
    setReply("");
    setReplyFor(null);
    setPasswordOpen(false);
    toast.success(vi ? "Đã đăng phản hồi." : "Reply published.");
    await load(page);
  }
  return (
    <motion.section
      className="feedback-section mt-14 text-text-light dark:text-text-dark"
      aria-labelledby="feedback-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-rule mb-6 text-[#0f9f8c]">
        <p className="eyebrow">{vi ? "Góp ý về tôi" : "Leave feedback"}</p>
      </div>
      <div className="feedback-grid">
        <div>
          <h2 id="feedback-heading" className="section-title">
            {vi ? "Sổ góp ý công khai" : "A public guestbook"}
          </h2>
          <p className="muted mt-3">
            {vi
              ? "Tên hiển thị và nội dung sẽ được công khai trên website."
              : "Your display name and feedback will be public on this website."}
          </p>
          <div className="surface feedback-form mt-6">
            <label>
              {vi ? "Tên hiển thị (tùy chọn)" : "Display name (optional)"}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                placeholder={vi ? "Khách" : "Guest"}
              />
            </label>
            <label>
              {vi ? "Nội dung" : "Feedback"}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                minLength={10}
                maxLength={2000}
                rows={5}
                required
              />
            </label>
            <input
              tabIndex={-1}
              aria-hidden="true"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hp-field"
            />
            <button
              className="mint-button"
              onClick={submit}
              disabled={sending || content.trim().length < 10}
            >
              {sending
                ? vi
                  ? "Đang gửi…"
                  : "Sending…"
                : vi
                  ? "Gửi góp ý"
                  : "Send feedback"}
            </button>
          </div>
        </div>
        <div className="feedback-list">
          {loading ? (
            <p className="muted">Loading…</p>
          ) : error ? (
            <div>
              <p className="text-red-500">{error}</p>
              <button className="text-link mt-2" onClick={() => load(page)}>
                Retry
              </button>
            </div>
          ) : items.length === 0 ? (
            <p className="muted">
              {vi ? "Chưa có góp ý nào." : "No feedback yet."}
            </p>
          ) : (
            items.map((item, index) => (
              <motion.article
                className="feedback-item surface"
                key={item.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
              >
                <div className="flex justify-between gap-3">
                  <strong>{item.displayName}</strong>
                  <time className="muted text-xs">
                    {new Date(item.createdAt).toLocaleString(
                      vi ? "vi-VN" : "en-US",
                    )}
                  </time>
                </div>
                <p className="mt-3 whitespace-pre-wrap">{item.content}</p>
                {item.replies.map((r) => (
                  <div className="feedback-reply" key={r.id}>
                    <strong>{r.author}</strong>
                    <p className="whitespace-pre-wrap mt-1">{r.content}</p>
                  </div>
                ))}
                <button
                  className="text-link mt-3"
                  onClick={() => {
                    setReplyFor(item.id);
                    setPasswordOpen(true);
                  }}
                >
                  {vi ? "Trả lời" : "Reply"}
                </button>
              </motion.article>
            ))
          )}
          <div className="flex items-center gap-3 mt-4">
            {pages > 1 && (
              <>
                <button
                  className="text-link"
                  disabled={page <= 1}
                  onClick={() => load(page - 1)}
                >
                  ←
                </button>
                <span className="muted text-sm">
                  {page}/{pages}
                </span>
                <button
                  className="text-link"
                  disabled={page >= pages}
                  onClick={() => load(page + 1)}
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <PasswordDialog
        open={passwordOpen}
        title={vi ? "Xác thực để trả lời" : "Unlock reply"}
        description={
          vi
            ? "Mỗi lần trả lời một góp ý cần xác thực lại."
            : "Authenticate again for each feedback reply."
        }
        onClose={() => {
          setPasswordOpen(false);
          setReplyFor(null);
        }}
        onSubmit={unlock}
      >
        {replyFor && (
          <textarea
            className="mt-4 w-full"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            maxLength={2000}
            rows={3}
            required
            placeholder={vi ? "Phản hồi của bạn" : "Your reply"}
          />
        )}
      </PasswordDialog>
    </motion.section>
  );
}
