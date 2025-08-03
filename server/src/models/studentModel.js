import mongoose, { trusted } from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    rollNo: { type: String, required: true},
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
    },
    imageUrl:String,
    marks: { type: Number, default: 0 },
    // Parent details
    parentName: { type: String, required: true },
    parentPh: { type: String, required: true },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
