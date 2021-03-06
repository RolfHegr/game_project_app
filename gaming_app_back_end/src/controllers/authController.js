import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import jwt from 'jsonwebtoken'
// import { use } from "express/lib/application";

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, userName, password, repeatPassword } =
      req.body;
    console.log("req.body", req.body);
    if (!firstName || !lastName || !email || !userName || !password) {
      throw new BadRequestError("please provide all values");
    }

    if (password !== repeatPassword) {
      throw new BadRequestError("passwords must match");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new BadRequestError("Email already in use ");
    }

    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
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
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  //Another way of creating a token
  // const anotherToken = await jwt.sign(
  //   Object.assign({}, user),
  //   process.env.JWT_SECRET
  // );

  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    user,
    token
  });
};

const updateUser = async (req, res) => {
  user.save();
  res.send("update user");
};

export { register, login, updateUser };
