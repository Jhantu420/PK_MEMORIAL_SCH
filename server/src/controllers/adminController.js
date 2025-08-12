import { generateToken } from "../helper/generateToken.js";
import { Admin } from "../models/adminRegister.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { getInTouchModel } from "../models/getInTouchModel.js";
import { ApplyClass } from "../models/applyClass.js";
const adminRegister = async (req, res) => {
  try {
    const { name, ph, email, password } = req.body;
    if (!name || !ph || !email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const adminExist = await Admin.findOne({ ph });
    if (adminExist) {
      return res
        .status(400)
        .json({ message: "Admin with this phone no already exist" });
    }
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = new Admin({
        name: name,
        ph: ph,
        email: email,
        password: hashedPassword,
      });
      await data.save();
      return res.status(200).json({ message: "Success", data: data });
    } else {
      return res.status(400).json({ message: "Admin already present" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Admin creation error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { ph, password } = req.body;
    if (!ph || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const adminExist = await Admin.findOne({ ph });

    if (!adminExist) {
      return res.status(400).json({ message: "Phone number is not matched" });
    }
    const result = await bcrypt.compare(password, adminExist.password);
    if (!result) {
      return res.status(400).json({ message: "password is not matched" });
    }
    const token = generateToken(adminExist._id, adminExist.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // IMPORTANT: Change from false to true
      sameSite: "Strict",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    return res.status(200).json({ message: "Login Successfull", data: token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Admin login error" });
  }
};

const getAdmin = async (req, res) => {
  try {
    const id = req.user.id;
    const response = await Admin.findById({ _id: id }).select("-password"); // Good practice to exclude password
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Admin data fetched successfully.",
      data: response,
    });
  } catch (error) {
    console.error("Error in getAdmin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error fetching admin data.",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: "Strict",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Logout error:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
};

const getInTouchController = async (req, res) => {
  try {
    const { name, ph, msg } = req.body;
    const result = new getInTouchModel({ name, ph, msg });
    await result.save();
    return res
      .status(200)
      .json({ success: true, message: "We will connect you soon...." });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: error.message, success: false });
  }
};

const getInTouchisRead = async (req, res) => {
  try {
    const [unreadGetInTouch, unreadApplyClass] = await Promise.all([
      getInTouchModel.find({ isRead: false }),
      ApplyClass.find({ isRead: false })
    ]);

    if (unreadGetInTouch.length === 0 && unreadApplyClass.length === 0) {
      return res.status(404).json({ message: "No unread notifications found" });
    }

    await Promise.all([
      getInTouchModel.updateMany({ isRead: false }, { isRead: true }),
      ApplyClass.updateMany({ isRead: false }, { isRead: true })
    ]);

    res.status(200).json({ message: "Unread notifications marked as read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


// Fetch from both models
const getMsg = async (req, res) => {
  try {
    const getInTouchMsgs = await getInTouchModel.find();
    const applyClassMsgs = await ApplyClass.find();

    // Combine both collections into one array
    const result = [...getInTouchMsgs, ...applyClassMsgs];

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: error.message, success: false });
  }
};

// Delete from whichever collection contains the ID
const deleteMsg = async (req, res) => {
  try {
    const { id } = req.params;

    // Try deleting from first collection
    let deleted = await getInTouchModel.findByIdAndDelete(id);

    // If not found there, try second collection
    if (!deleted) {
      deleted = await ApplyClass.findByIdAndDelete(id);
    }

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: error.message, success: false });
  }
};


export {
  adminRegister,
  adminLogin,
  getAdmin,
  logout,
  getInTouchController,
  getInTouchisRead,
  getMsg,
  deleteMsg,
};
