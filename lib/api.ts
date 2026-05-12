import { ApiResponse } from "@/types/api";
import { Event } from "@/types/event";
import { Session } from "@/types/session";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://user-analytics-api.onrender.com/api/v1";

export async function getSessions(
  page: number = 1,
  limit: number = 20,
): Promise<{
  sessions: Session[];
  total: number;
  page: number;
  limit: number;
}> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`${API_BASE}/sessions?${params}`);

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.message || "API Error");
  }

  const data = await res.json();

  return {
    sessions: data.data,
    total: data.total,
    page: data.page,
    limit: data.limit,
  };
}

export async function getSessionEvents(
  sessionId: string,
  page: number = 1,
  limit: number = 20,
): Promise<{ events: Event[]; total: number; page: number; limit: number }> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`${API_BASE}/sessions/${sessionId}/events?${params}`);

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.message || "API Error");
  }

  const data = await res.json();

  return {
    events: data.data,
    total: data.total,
    page: data.page,
    limit: data.limit,
  };
}

export async function getHeatmap(url: string): Promise<ApiResponse<Event[]>> {
  const res = await fetch(`${API_BASE}/heatmap?url=${encodeURIComponent(url)}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API Error");
  }

  return res.json();
}
