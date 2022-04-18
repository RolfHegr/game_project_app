import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const user = await User.create(req.body);
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  res.send("user login");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
