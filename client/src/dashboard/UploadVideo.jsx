import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/appContext";

export default function UploadVideo() {
  const [title, setTitle] = useState("");
  const [videoUrls, setVideoUrls] = useState([""]);
  const { url, videos, fetchVideos } = useAuth();

  const [loading, setLoading] = useState(false);

  const API_BASE = `${url}/api/v1/videos`;

  // Handle video URL input change
  const handleUrlChange = (index, value) => {
    const updatedUrls = [...videoUrls];
    updatedUrls[index] = value;
    setVideoUrls(updatedUrls);
  };
  // Add new URL input field
  const handleAddUrlField = () => {
    setVideoUrls([...videoUrls, ""]);
  };
  // Remove a URL field
  const handleRemoveUrlField = (index) => {
    const updatedUrls = videoUrls.filter((_, i) => i !== index);
    setVideoUrls(updatedUrls);
  };
  //Delete one video URL inside a group
  const handleDeleteSingleUrl = async (groupId, urlToRemove) => {
    if (!window.confirm("Delete this video only?")) return;

    try {
      await axios.put(`${API_BASE}/remove-url/${groupId}`, {
        url: urlToRemove,
      });
      fetchVideos(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to delete video");
    }
  };
  // Convert YouTube link to embed
  const getEmbedUrl = (url) => {
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    return url; // already embed format
  };
  // Upload videos
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || videoUrls.length === 0 || !videoUrls[0]) {
      alert("Please add a title and at least one video URL");
      return;
    }

    try {
      setLoading(true);
      await axios.post(API_BASE, { title, urls: videoUrls });
      alert("Videos uploaded successfully");
      setTitle("");
      setVideoUrls([""]);
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };
  // Delete a video group by ID
  const handleDeleteVideo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video group?"))
      return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Failed to delete video");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Upload Form */}
      <h2 className="text-2xl font-bold mb-4">Upload YouTube Videos</h2>
      <form
        onSubmit={handleUpload}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Dynamic Video URL Inputs */}
        {videoUrls.map((url, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="YouTube Video URL"
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              className="w-full border p-2 rounded"
            />
            {videoUrls.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveUrlField(index)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {/* Buttons row */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddUrlField}
            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
          >
            + Add Another URL
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>

      {/* Video Display */}
      <h2 className="text-2xl font-bold my-6">Existing Videos</h2>
      <div className="space-y-6">
        {videos.map((video) => (
          <div key={video._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <button
                onClick={() => handleDeleteVideo(video._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>

            {/* Grid layout for videos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
              {video.urls.map((url, index) => (
                <div key={index} className="relative w-[300px]">
                  <iframe
                    width="100%"
                    height="200"
                    src={getEmbedUrl(url)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded shadow"
                  ></iframe>
                  <button
                    onClick={() => handleDeleteSingleUrl(video._id, url)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
