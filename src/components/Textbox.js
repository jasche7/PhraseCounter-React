import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Textbox = (props) => {
  const [text, setText] = useState();
  const [occurrences, setOccurrences] = useState(2);
  const [phrase, setPhrase] = useState(0);
  const loading = props.loading;

  const onSubmit = (event) => {
    event.preventDefault();
    props.setPhraseCount([text, occurrences, phrase]);
    props.clickFunction();
  };

  const submitButton = () => {
    if (loading) {
      return <Button disabled>Submit</Button>;
    } else {
      return <Button type="submit">Submit</Button>;
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formText">
        <Form.Label>Text</Form.Label>
        <Form.Control
          required
          as="textarea"
          placeholder="Enter text"
          maxlength="5000"
          onChange={(e) => setText(e.target.value)}
        />
        <Form.Text className="text-muted">5000 characters max</Form.Text>
      </Form.Group>
      <Row style={{ display: "flex" }}>
        <Col>
          <Form.Group controlId="formText">
            <Form.Label>Min Occurrences:</Form.Label>
            <Form.Control
              type="number"
              value={occurrences}
              onChange={(e) => setOccurrences(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="formText">
            <Form.Label>Max Phrase Length:</Form.Label>
            <Form.Control
              type="number"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
            />
          </Form.Group>
          <Form.Text className="text-muted">0 for no max</Form.Text>
        </Col>

        <Col className="my-auto">{submitButton()}</Col>
      </Row>
    </Form>
  );
};

export default Textbox;
