import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Textbox = (props) => {
  const [text, setText] = useState();
  const [occurrences, setOccurrences] = useState(2);
  const [phrase, setPhrase] = useState(0);
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [isIgnoringPunctuation, setIsIgnoringPunctuation] = useState(false);
  const loading = props.loading;

  const onSubmit = (event) => {
    event.preventDefault();
    props.setRequestBody([
      text,
      occurrences,
      phrase,
      isCaseSensitive,
      isIgnoringPunctuation,
    ]);
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

        <Col>
          <Row>
            <Form.Group controlId="formCaseSensitive">
              <Form.Check
                type="checkbox"
                label="Case Sensitive"
                checked={isCaseSensitive}
                onChange={(e) => setIsCaseSensitive(e.target.checked)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="formIgnoringPunctuation">
              <Form.Check
                type="checkbox"
                label="Ignore Punctuation"
                checked={isIgnoringPunctuation}
                onChange={(e) => setIsIgnoringPunctuation(e.target.checked)}
              />
            </Form.Group>
          </Row>
        </Col>
        <Col className="my-auto">{submitButton()}</Col>
      </Row>
    </Form>
  );
};

export default Textbox;
