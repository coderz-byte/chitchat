import User from "../models/user.model.js";

// local imports
import { resMessage } from "../utils/resMessage.js";
import { generateToken } from "../utils/generateToken.js";
import { setCookies } from "../utils/setCookies.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password)
      return res.status(400).json(resMessage(false, "All fields are required"));

    const existUser = await User.findOne({ email });

    if (existUser)
      return res.status(400).json(resMessage(false, "User already exist"));

    if (password.length < 6)
      return res
        .status(400)
        .json(resMessage(false, "Password must be 6 digit long"));

    const user = await User.create({ fullname, email, password });

    user.password = "";

    const token = generateToken(user._id);

    setCookies(res, token);

    res.status(201).json(resMessage(true, user, token));
  } catch (error) {
    console.log("Error in register route", error.message);
    res.status(500).json(resMessage(false, error.message));
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json(resMessage(false, "All fields are required"));
    }

    const existUser = await User.findOne({ email });

    if (!existUser)
      return res.status(404).json(resMessage(false, "User not found"));

    const correctPassword = await existUser.comparePassword(password);

    if (!correctPassword)
      return res.status(400).json(resMessage(false, "Invalid credentials"));

    const token = generateToken(existUser._id);

    existUser.password = "";

    setCookies(res, token);

    res.status(200).json(resMessage(true, existUser, token));
  } catch (error) {
    console.log("Error in login route", error.message);
    res.status(500).json(resMessage(false, error.message));
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json(resMessage(true, "logout successfully"));
  } catch (error) {
    console.log("Error in logout route", error.message);
    res.status(500).json(resMessage(false, error.message));
  }
};

export const profile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    res.status(200).json(resMessage(true, user));
  } catch (error) {
    console.log("Error in profile route", error.message);
    res.status(500).json(resMessage(false, error.message));
  }
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;

  try {
    const userId = req.userId;

    if (!profilePic)
      return res
        .status(400)
        .json(resMessage(false, "Profile picture in required"));

    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "chitchat/profile-pic",
    });

    const updateUserProfile = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json(resMessage(true, updateUserProfile));
  } catch (error) {
    console.log("Error in updaterProfile route", error.message);
    res.status(500).json(resMessage(false, error.message));
  }
};
