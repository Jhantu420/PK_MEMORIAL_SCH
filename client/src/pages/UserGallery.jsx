import React from "react";
import { useAuth } from "../context/appContext";

export default function UserGallery() {
  const { galleries } = useAuth();

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-center text-[#734af6]">
        📸 Our Gallery
      </h2>

      {galleries.length === 0 ? (
        <p className="text-center text-gray-600">No galleries available yet.</p>
      ) : (
        <div className="space-y-10">
          {galleries.map((gallery) => (
            <div
              key={gallery._id}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              {/* Gallery Title */}
              <h3 className="text-xl font-semibold mb-4 border-b-2 border-yellow-400 pb-2">
                {gallery.title}
              </h3>

              {/* Images */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {gallery.images.map((img) => (
                  <div
                    key={img._id}
                    className="overflow-hidden rounded-lg shadow hover:shadow-lg transition"
                  >
                    <img
                      src={img.url}
                      alt={gallery.title}
                      className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
