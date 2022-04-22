import React from "react";
import { Card, Container } from "react-bootstrap";
import "../css/HomePage.css";
import "../css/App.css";

export default function HomePage({
  showSignupModal,
  showLoginModal,
  activeUser,
}) {
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
                <div class="sign">
                  <span class="fast-flicker">ga</span>
                  <span class="flicker">ming</span>
                  <span class="flicker">-</span>
                  <span class="fast-flicker">cen</span>ter
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
              Your high scores are: <div className="p2">Candy Crush:</div>{" "}
              {"highschore"} <div className="p2">Snake:</div> {"highschore"}{" "}
            </h3>
          )}
        </Card>
      </Container>
    </div>
  );
}
