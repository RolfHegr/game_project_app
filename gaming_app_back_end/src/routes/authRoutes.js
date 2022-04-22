import {register, login, updateUser, updateScore} from "../controllers/authController.js"
import express from "express"

const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateScore').post(updateScore)
router.route('/updateUser').patch(updateUser)

export default router;