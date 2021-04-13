import React, { useEffect, useState } from "react";
import Phrase from "./Phrase";
import Spinner from "react-bootstrap/Spinner";

const PhraseList = (props) => {
  const url = "https://phrase-counter.herokuapp.com/phrase";
  const [res, setRes] = useState([]);
  const loading = props.loading;
  const setLoading = props.setLoading;
  const phraseCount = props.phraseCount;
  const active = props.active;

  const makePhrases = () => {
    if (loading) {
      return (
        <>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          Loading... (The Heroku server may be starting up.)
        </>
      );
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

    if (active) {
      let phraseMaker = {
        text: phraseCount[0],
        minOccurrences: phraseCount[1],
        maxPhraseLength: phraseCount[2],
      };
      makeRequest(phraseMaker);
    }
  }, [active, phraseCount, setLoading]);

  return <>{makePhrases()}</>;
};

export default PhraseList;
