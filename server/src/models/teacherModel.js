// models/Teacher.js

import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    qualification: {
      type: String,
      trim: true,
    },

    experience: {
      type: Number,
      min: 0,
    },

    subject: {
      type: String,
      trim: true,
    },

    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);

