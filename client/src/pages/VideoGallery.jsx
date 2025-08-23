import React from "react";
import { useAuth } from "../context/appContext";

// Helper function to extract the YouTube video ID from a URL
// This handles both the 'youtu.be' short links and 'youtube.com/watch' links.
const getYouTubeId = (url) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v');
    }
  } catch (e) {
    // Handle invalid URLs gracefully
    return null;
  }
  return null;
};

function Videovideos() {
  const { videos } = useAuth();
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#734af6]">
        📸 Our videos
      </h2>
      {videos.length === 0 ? (
        <p className="text-center text-gray-600">No videos available yet.</p>
      ) : (
        <div className="space-y-10">
          {/* Mapped over 'videos' array, changed variable name to 'video' for clarity */}
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              {/* Video Title */}
              <h3 className="text-xl font-semibold mb-4 border-b-2 border-yellow-400 pb-2">
                {video.title}
              </h3>

              {/* Videos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Corrected: Mapping over 'video.urls' instead of 'videos.images' */}
                {video.urls.map((url) => {
                  const videoId = getYouTubeId(url);
                  // Return null if the URL is invalid to prevent errors
                  if (!videoId) return null;

                  return (
                    <div
                      // Corrected: Using the URL as the key
                      key={url}
                      // Added responsive container for a 16:9 video aspect ratio
                      className="relative overflow-hidden rounded-lg shadow hover:shadow-lg transition pb-[56.25%]"
                    >
                      {/* Corrected: Swapped <img> for <iframe> to embed a YouTube video */}
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        // Corrected: Constructing the proper embed URL for the iframe src
                        src={`https://www.youtube.com/embed/${videoId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Videovideos;