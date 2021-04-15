import React, { useState } from "react";
import Textbox from "./Textbox";
import Display from "./Display";
import PhraseList from "./Phrases/PhraseList";
import Header from "./Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";

const Layout = () => {
  const [requestBody, setRequestBody] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <Textbox
            clickFunction={() => setActive(true)}
            setPhraseCount={setRequestBody}
            loading={loading}
          />
        </Col>
        <Col>
          <Display className="display-box" text={requestBody[0]} />
        </Col>
      </Row>
      <Row>
        <Col>
          <PhraseList
            active={active}
            loading={loading}
            setLoading={setLoading}
            requestBody={requestBody}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
