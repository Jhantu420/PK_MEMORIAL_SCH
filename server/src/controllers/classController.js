import { Class } from "../models/classModel.js";

const classController = async (req, res) => {
  try {
    if (!req.user.role === "admin") {
      return res
        .status(400)
        .json({ success: false, message: "Only admin can add classes" });
    }
    const { className, timeSchedule, subject } = req.body;
    if (!className || !timeSchedule || !subject) {
      return res
        .status(400)
        .json({ success: false, message: "All field's are required" });
    }
    const data = new Class({
      className,
      timeSchedule,
      subject,
    });
    await data.save();
    return res
      .status(200)
      .json({ success: true, message: "Class created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "Only admin can add classes" });
    }
    const classId = req.params.id;
    const { className, timeSchedule, subject } = req.body;
    const data = await Class.findByIdAndUpdate(
      classId,
      {
        className: className,
        timeSchedule: timeSchedule,
        subject: subject,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Class fetched successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
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
    await Class.findByIdAndDelete(
      classId,
    );
    return res
      .status(200)
      .json({ success: true, message: "Class deleted successfully"});
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
