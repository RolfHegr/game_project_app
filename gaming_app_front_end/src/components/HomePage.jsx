import React, { useEffect, useContext } from "react";
import { Card, Container } from "react-bootstrap";
import "../css/HomePage.css";
import "../css/App.css";
import axios from "axios";
import ScoreContext from "../contexts/ScoreContext";

export default function HomePage({
  showSignupModal,
  showLoginModal,
  activeUser,
}) {
  const { latestScore, highScore } = useContext(ScoreContext);
  return (
    <div className="c-display-info ">
      <Container
        className="box-container w-50 p-4 mt-5 border"
        style={{ background: "black" }}
      >
        <Card>
          <Card.Header>
            <div className="welcome-container">
              <div className="container-again">
                <div className="sign">
                  <span className="fast-flicker">ga</span>
                  <span className="flicker">ming</span>
                  <span className="blank-space"> </span>
                  <span className="fast-flicker"> cen</span>ter
                </div>
              </div>
            </div>
            {!activeUser && (
              <h3>Welcome to the gaming app. Register to play!</h3>
            )}
            {activeUser && <h3>Welcome back {activeUser.firstName}</h3>}
          </Card.Header>
          {!activeUser && (
            <p>We have plenty of games for you to play, come and join us!</p>
          )}
          {activeUser && (
            <h3>
              High Scores <div className="p2"></div>{" "}
              {latestScore && <div>Most Recent Score: {latestScore}</div>}
              {highScore && "All time high:"} {highScore}{" "}
              <div className="p2"></div>
            </h3>
          )}
        </Card>
      </Container>
    </div>
  );
}
