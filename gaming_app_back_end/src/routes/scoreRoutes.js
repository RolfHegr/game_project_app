import express from "express";
import { updateScore, lastScore, highScore } from "../controllers/scores.js";

const router = express.Router();

router.route("/updateScore").post(updateScore);
router.route("/lastScore").post(lastScore);
router.route("/highScore").post(highScore);

export default router;
