"use client";

import { useState } from "react";
import { getHeatmap } from "@/lib/api";
import { Event } from "@/types/event";
import { MapPin, Loader, Search, AlertCircle } from "lucide-react";

export default function HeapMap() {
  const [url, setUrl] = useState("");
  const [clicks, setClicks] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadHeatmap() {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await getHeatmap(url);

      const clickEvents = data.data.filter(
        (event: Event) => event.x !== undefined && event.y !== undefined,
      );

      setClicks(clickEvents);
    } catch (err) {
      setError("Failed to load heatmap data");
      setClicks([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <MapPin className="w-6 h-6 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Heatmap Analysis</h1>
        </div>
        <p className="text-gray-600 max-w-2xl">
          Visualize user interactions on any page. Enter a URL to see where
          users click and engage.
        </p>
      </div>

      {/* URL Input Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Page URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-900" />
              </div>
              <input
                id="url"
                type="url"
                placeholder="https://example.com/page"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={loadHeatmap}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4" />
                  Generate Heatmap
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Heatmap Display */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Click Heatmap
          </h2>
          <p className="text-gray-600 text-sm">
            {clicks.length > 0
              ? `Showing ${clicks.length} click events on ${url}`
              : "Enter a URL and click 'Generate Heatmap' to visualize user interactions"}
          </p>
        </div>

        <div className="relative">
          <div
            className="relative bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300"
            style={{
              width: "100%",
              height: "600px",
            }}
          >
            {clicks.length === 0 && !loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No heatmap data</p>
                  <p className="text-gray-400 text-sm">
                    Enter a URL above to get started
                  </p>
                </div>
              </div>
            )}

            {clicks.map(
              (click, index) =>
                click.x !== undefined &&
                click.y !== undefined && (
                  <div
                    key={click._id}
                    className="absolute w-6 h-6 bg-red-500 rounded-full opacity-80 shadow-lg hover:opacity-100 transition-opacity cursor-pointer group"
                    style={{
                      left: `${click.x}px`,
                      top: `${click.y}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                    title={`Click at (${click.x}, ${click.y}) - ${new Date(click.timestamp).toLocaleString()}`}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ({click.x}, {click.y})
                    </div>
                  </div>
                ),
            )}

            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                <div className="text-center">
                  <Loader className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">
                    Generating heatmap...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {clicks.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Click events ({clicks.length})</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Hover over dots to see coordinates
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
