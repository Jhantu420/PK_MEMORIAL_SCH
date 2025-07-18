import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    className: String,
    timeSchedule: String,
    subject: [String],
  },
  { timestamps: true }
);

export const Class = mongoose.model("class", classSchema);
