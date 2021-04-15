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
  const [phraseCount, setPhraseCount] = useState([]);
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
            setPhraseCount={setPhraseCount}
            loading={loading}
          />
        </Col>
        <Col>
          <Display className="display-box" text={phraseCount[0]} />
        </Col>
      </Row>
      <Row>
        <Col>
          <PhraseList
            active={active}
            loading={loading}
            setLoading={setLoading}
            phraseCount={phraseCount}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
