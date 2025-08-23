import VideoModel from "../models/VideoModel.js";

/** ------------------------
 *  Add a new Video (with multiple URLs)
 *  ------------------------ */
export const addVideo = async (req, res) => {
  try {
    const { title, urls } = req.body;
    if (!title || !urls || !Array.isArray(urls) || urls.length === 0) {
      return res
        .status(400)
        .json({ message: "Title and at least one URL are required" });
    }

    const newVideo = await VideoModel.create({ title, urls });
    res
      .status(201)
      .json({ message: "Video added successfully", video: newVideo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding video", error: error.message });
  }
};

/** ------------------------
 *  Get all Videos
 *  ------------------------ */
export const getVideos = async (req, res) => {
  try {
    const videos = await VideoModel.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching videos", error: error.message });
  }
};

/** ------------------------
 *  Delete Video by ID
 *  ------------------------ */
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await VideoModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting video", error: error.message });
  }
};

export const deleteSingleVideo = async (req, res) => {
  try {
    const { url } = req.body;
    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { urls: url } },
      { new: true }
    );
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove video" });
  }
};
