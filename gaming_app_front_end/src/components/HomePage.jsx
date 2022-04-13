import React, { useEffect } from "react";
import { Card, CardGroup, Carousel, Container } from "react-bootstrap";
import "../css/HomePage.css";

export default function HomePage({
  showSignupModal,
  showLoginModal,
  activeUser,
}) {
  return (
    <div className="c-display-info ">
      <Container className="box-container w-50 p-4 mt-5 border">
        <Card>
          <Card.Header>
            <h1>Welcome to the gaming app //ACTIVEUSER.NAME</h1>
            {activeUser && (
              <h1>Welcome back - Click on games to start playing</h1>
            )}
          </Card.Header>
          <p>Text about how to play the game</p>
        </Card>
      </Container>
    </div>
  );
}