import React from "react";
import { Button, Card } from "react-bootstrap";

export default function GameCard({ testPetObj }) {

  function handleClick(e) {
    console.log('clickingOnImg')
  }

  const { img, name, difficulty } = testPetObj;
  return (
    <Card onClick={handleClick} style={{ width: "45%" }} className="m-2 d-flex flex-grow">
      <Card.Img className="mt-2 pet-img" variant="top" alt="pet" src={img} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          A classic
        </Card.Subtitle>
        <Card.Text>
          Difficulty: {difficulty}
        </Card.Text>
      </Card.Body>
      <Button className="my-2" >See More</Button>
    </Card>
  );
}
