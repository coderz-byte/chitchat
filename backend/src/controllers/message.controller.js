import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { resMessage } from "../utils/resMessage.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getAllChats = async (req, res) => {
  try {
    const userId = req.userId;

    const allChats = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    res.status(200).json(resMessage(true, allChats));
  } catch (error) {
    console.log("Error in getAllChats", error.message);
    res.status(500).json(resMessage(false, error.message));
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.userId;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    res.status(200).json(resMessage(true, messages));
  } catch (error) {
    console.log("Error in getMessage", error.message);
    res.status(500).json(resMessage(false, error.message));
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.userId;

    // let imageUrl;

    // if (image) {
    //   const uploadResponse = await cloudinary.uploader.upload(image, {
    //     folder: "chitchat/send-images",
    //   });

    //   imageUrl = uploadResponse.secure_url;
    // }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      // image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error.message);
    res.status(500).json(resMessage(false, error.message));
  }
};
