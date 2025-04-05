import { Router } from "express";

// local import
import {
  signup,
  login,
  profile,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.put("/update-profile", verifyToken, updateProfile);
router.get("/profile", verifyToken, profile);

export default router;
