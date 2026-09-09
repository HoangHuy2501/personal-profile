export type FeedbackReply = {
  id: string;
  content: string;
  createdAt: string;
  author?: string;
  authorKey?: "owner";
};
export type FeedbackItem = {
  id: string;
  displayName: string;
  content: string;
  createdAt: string;
  replies: FeedbackReply[];
};
export async function getFeedback(page = 1) {
  const response = await fetch(`/api/feedback?page=${page}`, {
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.code || "feedback");
  return data as {
    items: FeedbackItem[];
    total: number;
    page: number;
    pages: number;
  };
}
export async function postFeedback(input: {
  displayName: string;
  content: string;
  idempotencyKey: string;
  website?: string;
}) {
  const response = await fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.code || "feedback_submit");
  return data;
}
export async function unlockFeedback(password: string, feedbackId: string) {
  const response = await fetch("/api/admin/unlock", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scope: "feedback:reply", password, feedbackId }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.code || "unlock_failed");
  return data;
}
export async function postReply(id: string, content: string) {
  const response = await fetch(`/api/feedback/${id}/replies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.code || "reply");
  return data;
}
