import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * Controlled form for creating PhraseCount request.
 * @param {*} props contains the following parameters:
 * clickFunction - sets active flag to true, enabling PhraseList to make API calls
 * setRequestBody - setter function for storing PhraseCount request body
 * loading - disables submit button when waiting for PhraseList API call to resolve
 */
const Textbox = (props) => {
  const [text, setText] = useState();
  const [occurrences, setOccurrences] = useState(2); //default value 2 to omit single words
  const [phrase, setPhrase] = useState(5); //default value 5 for performance
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [ignoringPunctuation, setIgnoringPunctuation] = useState(false);
  const loading = props.loading;

  /**
   * Disables form submit default behavior of refreshing page. Sets the requestBody for PhraseCount and
   * sets the active flag to allow PhraseList API calls.
   * @param {*} event form submit event
   */
  const onSubmit = (event) => {
    event.preventDefault();
    props.setRequestBody([
      text,
      occurrences,
      phrase,
      caseSensitive,
      ignoringPunctuation,
    ]);
    props.clickFunction();
  };

  /**
   * Submit button for form; disables when loading from PhraseList API call.
   */
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
          maxLength="3000"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Form.Text className="text-muted">3000 characters max</Form.Text>
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
            <OverlayTrigger
              overlay={<Tooltip>Keep low for faster, stabler results!</Tooltip>}
            >
              <Form.Label>Max Phrase Length:</Form.Label>
            </OverlayTrigger>
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
                defaultChecked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="formIgnoringPunctuation">
              <Form.Check
                type="checkbox"
                label="Ignore Punctuation"
                defaultChecked={ignoringPunctuation}
                onChange={(e) => setIgnoringPunctuation(e.target.checked)}
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
