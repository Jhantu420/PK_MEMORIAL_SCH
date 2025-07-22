import cloudinary from "../config/cloudinary.js";
import { Class } from "../models/classModel.js";
import { Student } from "../models/studentModel.js";

// Register Student
export const registerStudent = async (req, res) => {
  try {
    // console.log(req.user.role)
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Only admin can register students" });
    }

    const { name, address, rollNo, classId, parentName, parentPh } = req.body;

    if (!name || !address || !rollNo || !classId || !parentName || !parentPh) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid class ID" });
    }
    const existingStudent = await Student.findOne({
      $or: [{ email }, { phone }],
    });

    let imageUrl = null;

    if (req.file) {
      const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "student_images",
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      imageUrl = uploadedImage.secure_url;
    }

    const newStudent = new Student({
      name,
      address,
      rollNo,
      class: classId,
      parentName,
      parentPh,
      imageUrl,
    });

    await newStudent.save();

    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Student registration failed" });
  }
};

// Update Student
export const updateStudent = async (req, res) => {
  try {
    // console.log(req.user?.role);
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Only admin can update student" });
    }

    const { id } = req.params;
    const { name, address, rollNo, classId, parentName, parentPh, marks } =
      req.body;

    if (classId) {
      const classExists = await Class.findById(classId);
      if (!classExists) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid class ID" });
      }
    }
    const studentExists = await Student.findById(id);
    if (!studentExists) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const updateFields = {
      ...(name && { name }),
      ...(address && { address }),
      ...(rollNo && { rollNo }),
      ...(parentName && { parentName }),
      ...(parentPh && { parentPh }),
      ...(classId && { class: classId }),
      ...(marks && { marks }),
    };

    if (req.file) {
      const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "student_images",
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      updateFields.imageUrl = uploadedImage.secure_url;
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updateFields, {
      new: true,
    }).populate("class");

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Student update failed" });
  }
};

// Get All Students
export const getStudents = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Only admin can fetch students" });
    }

    const students = await Student.find().populate("class");

    return res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Student
export const deleteStudent = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Only admin can delete student" });
    }

    const studentId = req.params.id;
    await Student.findByIdAndDelete(studentId);

    return res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
