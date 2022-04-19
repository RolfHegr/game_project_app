import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
// import { use } from "express/lib/application";

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, userName, password } = req.body;
    if (!firstName || !lastName || !email || !userName || !password) {
      throw new BadRequestError("please provide all values");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new BadRequestError("Email already in use ");
    }

    const user = await User.create(req.body);
    const token = user.createJWT();
    res
      .status(StatusCodes.OK)
      .json({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userName: user.userName,
        },
        token,
      });
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
