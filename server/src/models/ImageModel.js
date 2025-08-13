
import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    title: String,
    images: [
      {
        url: String,
        public_id: String, 
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("ImageCollection", ImageSchema);
