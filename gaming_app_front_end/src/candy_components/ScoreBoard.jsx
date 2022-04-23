import "../css/App.css";
import "../css/Candy.css";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import ScoreContext from "../contexts/ScoreContext.jsx";

export default function ScoreBoard({ score }) {
  const activeUser = useContext(ScoreContext);
  async function sendScoreToDB(score) {
    try {
      const updateURL = "http://localhost:8000/api/v1/scores/updateScore";
      const scoreObj = {
        date: new Date(),
        score: score,
        email: activeUser.email,
      };
      console.log("trying to send score");
      const res = await axios.post(updateURL, scoreObj);
      console.log("send the score", score, "to db");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="score-board">
      <div className="p1">Your current score: {score}</div>
      {
        (window.onbeforeunload = function () {
          sendScoreToDB(score);
        })
      }
    </div>
  );
}
