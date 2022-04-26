import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
// import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

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
    const date = user.highScoreCandy.date;

    res.status(StatusCodes.OK).json({
      lastScore,
      date,
    });
  } catch (error) {
    console.error(error);
  }
};

const highScore = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const { newScores } = user.highScoreCandy;

    let highScore = 0;
    for (let i = 0; i < newScores.length; i++) {
      if (+newScores[i] > +highScore) {
        highScore = +newScores[i];
      }
    }
    res.status(StatusCodes.OK).json({
      highScore,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateScore = async (req, res) => {
  try {
    const { email, date, score } = req.body;
    console.log('trying to add to scores')
    const user = await User.findOne({ email });
    console.log('found user')
    const { highScoreCandy } = user;
    console.log('req-body', req.body)
    
    const { newScores } = highScoreCandy;
    newScores.push(score);

    user.highScoreCandy = {
      email,
      date,
      score,
      newScores,
    };
    const token = user.createJWT();
    console.log('created token')
    await user.save();
    console.log('saved new user')
    res.status(StatusCodes.OK).json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);
  }
};

export { updateScore, lastScore, highScore };
