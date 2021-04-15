import React from "react";
import Form from "react-bootstrap/Form";

const Display = (props) => {
  return (
    <Form>
      <Form.Group controlId="display">
        <Form.Label>Display Text</Form.Label>
        <Form.Control required as="textarea" value={props.text} disabled />
      </Form.Group>
    </Form>
  );
};

export default Display;
