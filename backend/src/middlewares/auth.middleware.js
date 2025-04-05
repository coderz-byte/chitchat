import jwt from "jsonwebtoken";
import { resMessage } from "../utils/resMessage.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json(resMessage(false, "Unauthorized"));

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decode.id;
    next();
  } catch (error) {
    console.log("Error in vefity token", error.message);

    res.status(500).json(resMessage(false, "Unauthorized"));
  }
};
