import mongoose from "mongoose";
const applyClassSchema = new mongoose.Schema(
  {
    name: String,
    ph: Number,
    className: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const ApplyClass = mongoose.model("ApplyClass", applyClassSchema);
