import "../css/App.css";
import "../css/Candy.css";
import React, { useContext } from "react";
import axios from "axios";
import ScoreContext from "../contexts/ScoreContext.jsx";

export default function ScoreBoard({ score }) {
  const { activeUser } = useContext(ScoreContext);

  async function sendScoreToDB(score) {
    try {
      const updateURL = "http://localhost:8000/api/v1/scores/updateScore";
      const scoreObj = {
        date: new Date(),
        score: score,
        email: activeUser.email,
      };
      const res = await axios.post(updateURL, scoreObj);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="score-board">
      <div className="p1">Your current score: {score}</div>
      {
        (window.onbeforeunload = async function () {
          return sendScoreToDB(score);
        })
      }
    </div>
  );
}
