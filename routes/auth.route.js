import express from "express";
import {
  signup,
  login,
  forgetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forget-password", forgetPassword);

export default router;