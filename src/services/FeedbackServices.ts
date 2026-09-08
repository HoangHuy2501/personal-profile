export type FeedbackReply = {
  id: string;
  content: string;
  createdAt: string;
  author: string;
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
  if (!response.ok) throw new Error("feedback");
  return response.json() as Promise<{
    items: FeedbackItem[];
    total: number;
    page: number;
    pages: number;
  }>;
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
  if (!response.ok) throw new Error(data.error || "feedback");
  return data;
}
export async function unlockFeedback(password: string, feedbackId: string) {
  const response = await fetch("/api/admin/unlock", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scope: "feedback:reply", password, feedbackId }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "unlock");
  return data;
}
export async function postReply(id: string, content: string) {
  const response = await fetch(`/api/feedback/${id}/replies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "reply");
  return data;
}
