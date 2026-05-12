import Link from "next/link";
import { Clock, Users, TrendingUp } from "lucide-react";
import { Session } from "@/types/session";

interface Props {
  session: Session;
}

export default function SessionCard({ session }: Props) {
  const lastActivity = new Date(session.lastActivity);
  const formattedDate = lastActivity.toLocaleDateString();
  const formattedTime = lastActivity.toLocaleTimeString();

  return (
    <Link href={`/sessions/${session._id}`}>
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-blue-300 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="text-sm text-gray-500 font-medium mb-2">
              Session ID
            </div>
            <p className="text-gray-900 font-mono text-sm truncate group-hover:text-blue-600 transition-colors">
              {session._id}
            </p>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center text-blue-600 mb-1">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="text-xs font-medium">Events</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">
              {session.eventCount}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="flex items-center text-purple-600 mb-1">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-xs font-medium">Activity</span>
            </div>
            <p className="text-xs text-purple-900 font-semibold">
              {formattedDate}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Last activity at{" "}
            <span className="font-semibold text-gray-700">{formattedTime}</span>
          </p>
        </div>

        <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
          View Details
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
