import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/appContext";
export default function UploadImage() {
  const [title, setTitle] = useState("");
  const { url, fetchGalleries, galleries } = useAuth();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = `${url}/api/v1`;
  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  // Remove image before submission
  const handleRemovePreview = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload images
  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please select images first");
      return;
    }
    const formData = new FormData();
    formData.append("title", title || "Untitled");
    selectedFiles.forEach((file) => formData.append("images", file));

    try {
      setLoading(true);
      await axios.post(`${API_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Images uploaded successfully");
      setTitle("");
      setSelectedFiles([]);
      setPreviewUrls([]);
      fetchGalleries();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete image from gallery
  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await axios.delete(`${API_BASE}/delete/${imageId}`);
      fetchGalleries();
    } catch (err) {
      console.error(err);
      alert("Failed to delete image");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Upload Form */}
      <h2 className="text-2xl font-bold mb-4">Upload Image Gallery</h2>
      <form
        onSubmit={handleUpload}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          placeholder="Gallery title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full"
        />
        {/* Preview */}
        {previewUrls.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePreview(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Gallery Display */}
      <h2 className="text-2xl font-bold my-6">Existing Galleries</h2>
      <div className="space-y-6">
        {galleries.map((gallery) => (
          <div key={gallery._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{gallery.title}</h3>
            <div className="flex flex-wrap gap-3">
              {gallery.images.map((img) => (
                <div key={img._id} className="relative">
                  <img
                    src={img.url}
                    alt=""
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    onClick={() => handleDeleteImage(img._id)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
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
