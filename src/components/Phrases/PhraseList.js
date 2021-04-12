import React, { useEffect, useState } from "react";
import Phrase from "./Phrase";

const PhraseList = (props) => {
  const url = "https://phrase-counter.herokuapp.com/phrase";
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(false);

  const makeRequest = (data) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        setRes(Object.entries(result));
        setLoading(false);
        console.log(result);
      });
  };

  const makePhrases = () => {
    if (loading) {
      return <>Loading...</>;
    } else {
      return res.map((phrasecount) => (
        <Phrase
          key={phrasecount[0]}
          phrase={phrasecount[0]}
          count={phrasecount[1]}
        />
      ));
    }
  };

  useEffect(() => {
    if (props.active) {
      let phraseMaker = {
        text: props.phraseCount[0],
        minOccurrences: props.phraseCount[1],
        maxPhraseLength: props.phraseCount[2],
      };
      makeRequest(phraseMaker);
    }
  }, [props.active, props.phraseCount]);

  return <>{makePhrases()}</>;
};

export default PhraseList;
