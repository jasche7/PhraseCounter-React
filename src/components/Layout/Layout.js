import React, { useState } from "react";
import Textbox from "../Textbox/Textbox";
import Display from "../Display/Display";
import PhraseList from "../Phrases/PhraseList";

import "bootstrap/dist/css/bootstrap.min.css";

const Layout = () => {
  const [phraseCount, setPhraseCount] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Textbox
        clickFunction={() => setActive(true)}
        setPhraseCount={setPhraseCount}
        loading={loading}
      />
      <Display text={phraseCount[0]} />
      <PhraseList
        active={active}
        loading={loading}
        setLoading={setLoading}
        phraseCount={phraseCount}
      />
    </>
  );
};

export default Layout;
