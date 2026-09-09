"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../../hook/useLanguage";

type PasswordDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  submitLabel?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onSubmit: (password: string) => Promise<void>;
};

function errorKey(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (message === "Incorrect password" || message === "incorrect_password")
    return "incorrect_password";
  if (
    message.includes("not configured") ||
    message === "password_not_configured"
  )
    return "password_not_configured";
  if (message.includes("Too many") || message === "rate_limited")
    return "rate_limited";
  if (message === "Invalid request" || message === "invalid_request")
    return "invalid_request";
  if (message === "feedback_reply_required") return "feedback_reply_required";
  if (message === "reply_expired") return "reply_expired";
  if (message === "reply_submit") return "reply_submit";
  return "";
}

export default function PasswordDialog({
  open,
  title,
  description,
  submitLabel,
  children,
  onClose,
  onSubmit,
}: PasswordDialogProps) {
  const { t } = useLanguage();
  const copy = t.admin;
  const ref = useRef<HTMLDialogElement>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await onSubmit(password);
      setPassword("");
    } catch (submissionError) {
      const key = errorKey(submissionError);
      const message = key
        ? copy.errors[key as keyof typeof copy.errors]
        : copy.unableContinue;
      setError(message);
      toast.error(message, { id: "admin-password-error" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      className="admin-dialog text-text-light dark:text-text-dark"
    >
      <form onSubmit={submit} method="dialog">
        <button
          type="button"
          className="admin-dialog-close"
          onClick={onClose}
          aria-label={copy.close}
        >
          ×
        </button>
        <p className="eyebrow">{copy.privateArea}</p>
        <h2 className="text-2xl font-bold mt-2">{title}</h2>
        {description && <p className="muted mt-2">{description}</p>}
        {children}
        <label
          className="block mt-5 text-sm font-semibold"
          htmlFor="admin-password"
        >
          {copy.password}
        </label>
        <input
          id="admin-password"
          autoFocus
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="admin-input"
          required
          maxLength={72}
        />
        {error && (
          <p className="text-red-500 text-sm mt-2" role="alert">
            {error}
          </p>
        )}
        <button className="mint-button mt-5" disabled={busy}>
          {busy ? copy.checking : submitLabel || copy.unlock}
        </button>
      </form>
    </dialog>
  );
}
