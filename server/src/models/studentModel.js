import mongoose, { trusted } from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    studentClass: { type: String, required: true },
    rollNo: { type: String, required: true, unique:true },
    parentName: { type: String, required: true },
    parentPh: { type: String, required: true },
    marks:{type:Number, default:0},
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class", 
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
