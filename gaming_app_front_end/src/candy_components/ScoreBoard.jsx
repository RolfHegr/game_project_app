import "../css/App.css";
import "../css/Candy.css";

const ScoreBoard = ({ score }) => {
  return (
    <div className="score-board">
      <div className="p1">Your current score: {score}</div>
    </div>
  );
};

export default ScoreBoard;
