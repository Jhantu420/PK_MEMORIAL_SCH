import cloudinary from "../config/cloudinary.js";
import { Teacher } from "../models/teacherModel.js";

// Create Teacher
const registerTeacher = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can register teachers",
      });
    }

    const { name, email, phone, address, qualification, experience, subject } =
      req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !qualification ||
      !experience ||
      !subject ||
      !req.file
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields including photo are required",
      });
    }

    const existingTeacher = await Teacher.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Email or phone already exists",
      });
    }

    const uploadedImage = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "teacher_photos",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(req.file.buffer);
    });

    const newTeacher = new Teacher({
      name,
      email,
      phone,
      address,
      qualification,
      experience,
      subject,
      imageUrl: uploadedImage.secure_url,
    });

    await newTeacher.save();

    return res.status(201).json({
      success: true,
      message: "Teacher registered successfully",
      teacher: newTeacher,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update Teacher
const updateTeacher = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can update teachers",
      });
    }

    const teacherId = req.params.id;
    const { name, email, phone, address, qualification, experience, subject } =
      req.body;

    const updatedFields = {
      name,
      email,
      phone,
      address,
      qualification,
      experience,
      subject,
    };

    if (req.file) {
      const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "teacher_photos",
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      updatedFields.photo = uploadedImage.secure_url;
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      updatedFields,
      { new: true }
    );

    if (!updatedTeacher) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Only admin can delete teachers" });
    }

    const teacherId = req.params.id;
    await Teacher.findByIdAndDelete(teacherId);

    return res
      .status(200)
      .json({ success: true, message: "Teacher deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    return res.status(200).json({
      success: true,
      message: "Teachers fetched successfully",
      data: teachers,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export { registerTeacher, updateTeacher, deleteTeacher, getAllTeachers };
