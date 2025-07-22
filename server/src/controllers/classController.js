import cloudinary from "../config/cloudinary.js";
import { Class } from "../models/classModel.js";

const classController = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Only admin can add classes" });
    }

    const { className, subjects } = req.body;
    if (!className || !subjects || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields including image are required",
      });
    }
    const existingClass = await Class.findOne({ className });
    if (existingClass) {
      return res.status(400).json({
        success: false,
        message: "Class already exists",
      });
    }
    // Upload buffer to Cloudinary
    const uploadedImage = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "class_images", // optional folder
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(req.file.buffer);
    });

    const newClass = new Class({
      className,
      subjects,
      imageUrl: uploadedImage.secure_url,
    });

    await newClass.save();

    return res.status(201).json({
      success: true,
      message: "Class created successfully",
      class: newClass,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Only admin can update classes" });
    }

    const classId = req.params.id;
    const { className, subjects } = req.body;

    let updatedFields = {
      className,
      subjects,
    };

    if (req.file) {
      // Upload new image to Cloudinary
      const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "class_images",
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      updatedFields.imageUrl = uploadedImage.secure_url;
    }

    const updatedClass = await Class.findByIdAndUpdate(classId, updatedFields, {
      new: true,
    });

    if (!updatedClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    if (!req.user.role === "admin") {
      return res
        .status(400)
        .json({ success: false, message: "Only admin can add classes" });
    }
    const classId = req.params.id;
    await Class.findByIdAndDelete(classId);
    return res
      .status(200)
      .json({ success: true, message: "Class deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getClass = async (req, res) => {
  try {
    const data = await Class.find();
    return res
      .status(200)
      .json({ success: true, message: "Class fetched successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
export { classController, updateClass, getClass, deleteClass };
