import {
  register,
  login,
  updateUser,
  updateScore,
  lastScore,
  highScore,
} from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateScore").post(updateScore);
router.route("/lastScore").get(lastScore);
router.route("/highScore").get(highScore);
router.route("/updateUser").patch(updateUser);

export default router;
