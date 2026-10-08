import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";

// router.post("/register", register);
// router.post("/login", login);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// User update their profile pic
router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
