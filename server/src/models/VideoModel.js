import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    urls: [
      {
        type: String,
        required: true,
        match: [
          /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
          "Please provide a valid YouTube URL",
        ],
      },
    ],
  },
  { timestamps: true }
);

const VideoModel = mongoose.model("Video", VideoSchema);

export default VideoModel;
