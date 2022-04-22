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
              <div className="container-container">
                <div className="welcome-hold">
                  <div className="p1">Let</div>
                  <div className="welcome-title">
                    <span style={{ index: 0 }}>THE GAMES</span>
                    <span style={{ index: 1 }}>THE GAMES</span>
                    <span style={{ index: 2 }}>THE GAMES</span>
                  </div>
                  <span className="right">
                    <div className="p1">Begin</div>
                  </span>
                </div>
              </div>
            </div>
            {!activeUser && (
              <h3>Welcome to the gaming app. Register to play!</h3>
            )}
            {activeUser && <h3>Welcome back {activeUser.firstName}</h3>}
          </Card.Header>
          <p>We have plenty of games for you to play</p>
        </Card>
      </Container>
    </div>
  );
}
