"use client";

import { useEffect, useState } from "react";
import { getSessions } from "@/lib/api";
import { Session } from "@/types/session";
import SessionCard from "@/components/SessionCard";
import { Activity, Loader } from "lucide-react";

export default function Sessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sessionsPerPage = 20;

  useEffect(() => {
    fetchSessions(currentPage);
  }, [currentPage]);

  async function fetchSessions(page: number = 1) {
    try {
      setLoading(true);

      const data = await getSessions(page, sessionsPerPage);

      setSessions(data.sessions);
      setTotalSessions(data.total);
    } catch (err) {
      setError("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading sessions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700 font-semibold text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">User Sessions</h1>
        </div>
        <p className="text-gray-600 max-w-2xl">
          Track and analyze user sessions. Click on any session to view detailed
          event data and user interactions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <p className="text-gray-600 text-sm font-medium mb-2">
            Total Sessions
          </p>
          <p className="text-3xl font-bold text-gray-900">{totalSessions}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <p className="text-gray-600 text-sm font-medium mb-2">Total Events</p>
          <p className="text-3xl font-bold text-gray-900">
            {sessions.reduce((sum, s) => sum + s.eventCount, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <p className="text-gray-600 text-sm font-medium mb-2">
            Avg Events/Session
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {sessions.length > 0
              ? (
                  sessions.reduce((sum, s) => sum + s.eventCount, 0) /
                  sessions.length
                ).toFixed(1)
              : 0}
          </p>
        </div>
      </div>

      {/* Sessions Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Sessions
        </h2>
        {sessions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600 font-medium">No sessions found yet</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <SessionCard key={session._id} session={session} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * sessionsPerPage + 1} to{" "}
                {(currentPage - 1) * sessionsPerPage + sessions.length} of{" "}
                {totalSessions} sessions
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
                  disabled={sessions.length < sessionsPerPage}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
