import React, { useState } from "react";
import Textbox from "./Textbox";
import Display from "./Display";
import PhraseList from "./Phrases/PhraseList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";

const Layout = () => {
  const [phraseCount, setPhraseCount] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <Textbox
            clickFunction={() => setActive(true)}
            setPhraseCount={setPhraseCount}
            loading={loading}
          />
        </Col>
        <Col>
          <Display text={phraseCount[0]} />
        </Col>
      </Row>
      <PhraseList
        active={active}
        loading={loading}
        setLoading={setLoading}
        phraseCount={phraseCount}
      />
    </Container>
  );
};

export default Layout;
