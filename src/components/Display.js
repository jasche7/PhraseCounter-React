import React from "react";
import Form from "react-bootstrap/Form";

/**
 * Displays requestBody's text content after submitting form from Textbox.
 * @param {*} props requestBody's text value
 */
const Display = (props) => {
  return (
    <Form>
      <Form.Group controlId="display">
        <Form.Label>Display Text</Form.Label>
        <Form.Control
          required
          as="textarea"
          value={props.text}
          rows={8}
          disabled
        />
      </Form.Group>
    </Form>
  );
};

export default Display;
