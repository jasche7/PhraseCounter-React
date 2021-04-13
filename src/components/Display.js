import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

const Display = (props) => {
  return (
    <Jumbotron>
      <p>{props.text}</p>
    </Jumbotron>
  );
};

export default Display;
