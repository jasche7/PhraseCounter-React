import React, { useEffect, useState } from "react";
import Phrase from "./Phrase";

const PhraseList = (props) => {
  const url = "http://localhost:8080/phrase";
  const [res, setRes] = useState([]);

  const makeRequest = (data) => {
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
        console.log(result);
      });
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

  return (
    <>
      {res.map((phrasecount) => (
        <Phrase
          key={phrasecount[0]}
          phrase={phrasecount[0]}
          count={phrasecount[1]}
        />
      ))}
    </>
  );
};

export default PhraseList;
