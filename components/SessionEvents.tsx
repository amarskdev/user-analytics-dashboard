"use client";

import { useEffect, useState } from "react";
import { getSessionEvents } from "@/lib/api";
import { Event } from "@/types/event";
import EventCard from "@/components/EventCard";
import { Loader } from "lucide-react";

interface SessionEventsProps {
  sessionId: string;
}

export default function SessionEvents({ sessionId }: SessionEventsProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const eventsPerPage = 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      fetchEvents(currentPage);
    }
  }, [sessionId, currentPage]);

  async function fetchEvents(page: number = 1) {
    try {
      setLoading(true);
      const data = await getSessionEvents(sessionId, page, eventsPerPage);
      setEvents(data.events);
      setTotalEvents(data.total);
    } catch (err) {
      setError("Failed to load session events");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading session events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700 font-semibold text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Session Events
        </h1>
        <p className="text-gray-600">
          Session ID:{" "}
          <span className="font-mono text-sm text-gray-800">{sessionId}</span>
        </p>
        <p className="text-gray-600 mt-1">
          Total Events:{" "}
          <span className="font-bold text-gray-900">{totalEvents}</span>
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 font-medium">
            No events recorded for this session
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={event._id} className="flex gap-4">
                <div className="flex-shrink-0 text-sm font-bold text-gray-500 w-8">
                  {(currentPage - 1) * eventsPerPage + index + 1}
                </div>
                <div className="flex-1">
                  <EventCard event={event} />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * eventsPerPage + 1} to{" "}
              {(currentPage - 1) * eventsPerPage + events.length} of{" "}
              {totalEvents} events
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage * eventsPerPage >= totalEvents}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
