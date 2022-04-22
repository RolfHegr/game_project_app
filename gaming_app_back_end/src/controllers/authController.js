import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
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
  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

const lastScore = async (req, res) => {
  const { email } = req.body;

  try {
    const noScore = "User have no scores saved";
    const user = await User.findOne({ email });
    if (!user.highScoreCandy.score) {
      res.status(StatusCodes.OK).json({
        noScore,
      });
    }

    const { newScores } = user.highScoreCandy;
    const lastScore = newScores[newScores.length - 1];

    res.status(StatusCodes.OK).json({
      lastScore,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateScore = async (req, res) => {
  const { email, date, score } = req.body;
  try {
    const user = await User.findOne({ email });
    const { highScoreCandy } = user;

    console.log("highScoreCandy", highScoreCandy);

    const { allScores } = highScoreCandy;
    const newScores = Object.values(allScores);
    newScores.push(score);

    user.highScoreCandy = {
      email,
      date,
      score,
      newScores,
    };
    const token = user.createJWT();
    await user.save();
    res.status(StatusCodes.OK).json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (req, res) => {
  user.save();
  res.send("update user");
};

export { register, login, updateUser, updateScore, lastScore };
