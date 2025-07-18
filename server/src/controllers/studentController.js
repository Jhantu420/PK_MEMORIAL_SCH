import { Class } from "../models/classModel.js";
import { Student } from "../models/studentModel.js";


export const registerStudent = async (req, res) => {
  try {
    const {
      name,
      address,
      rollNo,
      parentName,
      parentPh,
      password,
      classId, // 👈 Add this
    } = req.body;

    console.log(name, address, rollNo, parentName, parentPh, password, classId);

    if (
      !name ||
      !address ||
      !rollNo ||
      !parentName ||
      !parentPh ||
      !password ||
      !classId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({ success: false, message: "Invalid class ID" });
    }

    const data = new Student({
      name,
      address,
      rollNo,
      parentName,
      parentPh,
      password,
      class: classId, // 👈 Save classId into the `class` field
    });

    await data.save();

    return res
      .status(200)
      .json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Registration error" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params; // student ID from URL
    const {
      name,
      address,
      rollNo,
      parentName,
      parentPh,
      password,
      classId,
      marks
    } = req.body;

    // Optional: Check if classId is valid (if provided)
    if (classId) {
      const classExists = await Class.findById(classId);
      if (!classExists) {
        return res.status(400).json({ success: false, message: "Invalid class ID" });
      }
    }

    // Build update object
    const updateData = {
      ...(name && { name }),
      ...(address && { address }),
      ...(rollNo && { rollNo }),
      ...(parentName && { parentName }),
      ...(parentPh && { parentPh }),
      ...(password && { password }),
      ...(classId && { class: classId }),
      ...(marks && {marks})
    };

    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("class"); // populate for updated view

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Update failed" });
  }
};