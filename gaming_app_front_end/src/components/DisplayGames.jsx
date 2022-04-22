import React from "react";
import GameCard from "./GameCard";
import { Container, Row } from "react-bootstrap";
import snakeImg from "../resources/snake.png";

export default function DisplayGames() {
  const testPetObj = {
    img: snakeImg,
    name: "Snake",
    difficulty: "easy",
  };

  const testArrayOfData = [testPetObj, testPetObj];

  return (
    <Container className="my-5 py-5">
      <div className="d-flex w-100">
        <Row xs={1} md={5} className="g-10 d-flex justify-content-center mt-2">
          {/* <GameCard testPetObj={testPetObj}/> */}
          {testArrayOfData.map((testPetObj, index) => {
            return <GameCard testPetObj={testPetObj} key={index} />;
          })}
          {/* {Array.from({ length: 10 }).map((_, idx) => (
        <Col>   
        </Col>
      ))} */}
        </Row>
      </div>
    </Container>
  );
}
