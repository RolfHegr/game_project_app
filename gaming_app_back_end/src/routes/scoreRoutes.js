import express from "express";
import { updateScore, lastScore, highScore } from "../controllers/scores.js";
// import {authenticated} from "../middleware/authenticaded.js";

const router = express.Router();

router.route("/updateScore").post(updateScore);
router.route("/lastScore").post(lastScore);
// router.route("/lastScore").post(authenticated,lastScore);
router.route("/highScore").post(highScore);

export default router;
