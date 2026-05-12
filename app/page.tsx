import Link from "next/link";
import { BarChart3, MousePointer } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              User Analytics
              <span className="block text-blue-600">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Gain deep insights into user behavior with comprehensive
              analytics, session tracking, and interactive heatmaps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sessions"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Sessions
              </Link>
              <Link
                href="/heatmap"
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-semibold border border-gray-300 transition-colors"
              >
                Explore Heatmaps
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Analytics Tools
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to understand your users and optimize your
            product.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Sessions Card */}
          <Link href="/sessions" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Sessions
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Track user sessions, analyze behavior patterns, and understand
                how users interact with your application over time.
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                View Sessions
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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

          {/* Heatmap Card */}
          <Link href="/heatmap" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <MousePointer className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Heatmaps
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Visualize user interactions with interactive heatmaps showing
                clicks, scrolls, and engagement patterns across your pages.
              </p>
              <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                Explore Heatmaps
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Real-time Insights</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Get instant access to user behavior data with our powerful
              analytics platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">∞</div>
              <div className="text-gray-300">Sessions Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">∞</div>
              <div className="text-gray-300">Events Captured</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">∞</div>
              <div className="text-gray-300">Insights Generated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
