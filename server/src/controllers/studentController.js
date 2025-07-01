import { Student } from "../models/studentModel.js";

export const registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      studentClass,
      rollNo,
      parentName,
      parentPh,
      password,
    } = req.body;
    console.log(
      name,
      email,
      address,
      studentClass,
      rollNo,
      parentName,
      parentPh,
      password
    );
    if (
      !name ||
      !email ||
      !address ||
      !studentClass ||
      !rollNo ||
      !parentName ||
      !parentPh ||
      !password
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const data = new Student({
      name,
      email,
      address,
      studentClass,
      rollNo,
      parentName,
      parentPh,
      password,
    });
    await data.save();
    return res
      .status(200)
      .json({ success: true, message: "Registration successful..." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Registration error" });
  }
};
