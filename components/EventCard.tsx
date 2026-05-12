import { Event } from "@/types/event";
import { MousePointer, Eye, Smartphone } from "lucide-react";

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  const isClickEvent = event.type === "click";
  const isPageViewEvent = event.type === "page_view";

  const bgColor = isClickEvent ? "bg-blue-50" : "bg-green-50";
  const borderColor = isClickEvent ? "border-blue-200" : "border-green-200";
  const badgeStyle = isClickEvent
    ? { backgroundColor: "#dbeafe", color: "#1e40af" }
    : { backgroundColor: "#dcfce7", color: "#166534" };

  return (
    <div
      className={`rounded-lg p-5 shadow-sm border-2 ${bgColor} ${borderColor}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div style={badgeStyle} className="p-2 rounded-lg">
            {isClickEvent ? (
              <MousePointer className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900 capitalize">
              {event.type}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(event.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-gray-600 mb-1">URL</p>
          <p className="text-sm text-gray-900 break-all font-mono bg-white px-3 py-2 rounded border border-gray-200">
            {event.url}
          </p>
        </div>

        {isClickEvent && event.x !== undefined && event.y !== undefined && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">
                X Position
              </p>
              <p className="text-sm font-bold text-blue-900 bg-blue-100 px-3 py-2 rounded">
                {event.x}px
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">
                Y Position
              </p>
              <p className="text-sm font-bold text-blue-900 bg-blue-100 px-3 py-2 rounded">
                {event.y}px
              </p>
            </div>
          </div>
        )}

        {event.userAgent && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Smartphone className="w-4 h-4 text-gray-600" />
              <p className="text-xs font-medium text-gray-600">Device</p>
            </div>
            <p className="text-xs text-gray-700 bg-white px-3 py-2 rounded border border-gray-200 break-all">
              {event.userAgent}
            </p>
          </div>
        )}

        {event.screenWidth && event.screenHeight && (
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Width</p>
              <p className="text-sm font-semibold text-gray-900">
                {event.screenWidth}px
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Height</p>
              <p className="text-sm font-semibold text-gray-900">
                {event.screenHeight}px
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
