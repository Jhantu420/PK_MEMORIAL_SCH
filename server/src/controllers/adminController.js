import { generateToken } from "../helper/generateToken.js";
import { Admin } from "../models/adminRegister.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
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
    const token = generateToken(adminExist._id,adminExist.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // IMPORTANT: Change from false to true
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000, // For 1 hour (as per your comment)
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
            return res.status(404).json({ success: false, message: "Admin not found." });
        }
        return res.status(200).json({ success: true, message: "Admin data fetched successfully.", data: response });
    } catch (error) {
        console.error("Error in getAdmin:", error);
        return res.status(500).json({ success: false, message: "Internal server error fetching admin data." });
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

export { adminRegister, adminLogin, getAdmin, logout };
