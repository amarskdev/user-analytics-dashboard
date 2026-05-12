export interface Event {
  _id: string;

  sessionId: string;

  type: "page_view" | "click";

  url: string;

  timestamp: string;

  x?: number;

  y?: number;

  userAgent?: string;

  screenWidth?: number;

  screenHeight?: number;
}
