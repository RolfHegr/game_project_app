import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
// import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const lastScore = async (req, res) => {
  const { email } = req.body;
  console.log("res.data", res.data);

  try {
    const noScore = "User have no scores saved";
    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user.highScoreCandy.score) {
      res.status(StatusCodes.OK).json({
        noScore,
      });
    }

    const { newScores } = user.highScoreCandy;
    const lastScore = newScores[newScores.length - 1];
    const date = user.highScoreCandy.date

    res.status(StatusCodes.OK).json({
      lastScore,
      date
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
  const { email, date, score } = req.body;
  try {
    const user = await User.findOne({ email });
    const { highScoreCandy } = user;

    const { newScores } = highScoreCandy;
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

export { updateScore, lastScore, highScore };
