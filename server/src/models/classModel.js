import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    className: String,
    imageUrl:String,
    subjects: [String],
  },
  { timestamps: true }
);

export const Class = mongoose.model("class", classSchema);
