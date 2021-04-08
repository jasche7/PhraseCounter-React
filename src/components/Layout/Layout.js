import React, { useState } from "react";
import Textbox from "../Textbox/Textbox";
import Display from "../Display/Display";
import PhraseList from "../Phrases/PhraseList";

const Layout = () => {
  const [phraseCount, setPhraseCount] = useState([]);
  const [active, setActive] = useState(false);

  return (
    <>
      <Textbox
        clickFunction={() => setActive(true)}
        setPhraseCount={setPhraseCount}
      />
      <Display text={phraseCount[0]} />
      <PhraseList active={active} phraseCount={phraseCount} />
    </>
  );
};

export default Layout;
