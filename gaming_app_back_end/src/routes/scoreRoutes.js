import express from "express";
import { updateScore, lastScore, highScore } from "../controllers/scores.js";

const router = express.Router();

router.route("/updateScore").post(updateScore);
router.route("/lastScore").get(lastScore);
router.route("/highScore").get(highScore);

export default router;
