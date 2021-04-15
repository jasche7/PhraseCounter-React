import React, { useEffect, useState } from "react";
import Phrase from "./Phrase";
import Spinner from "react-bootstrap/Spinner";

const PhraseList = (props) => {
  const url = "https://phrase-counter.herokuapp.com";
  const [init, setInit] = useState(false);
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
    const wakeUp = () => {
      setLoading(true);
      fetch(url).catch(() => {
        setLoading(false);
        console.log("Sent wake-up request to server");
      });
    };

    const makeRequest = (data) => {
      setLoading(true);
      fetch(url + "/phrase", {
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
        })
        .catch((err) => {
          console.log(err.code);
          console.log(err.message);
          console.log(err.stack);
        });
    };

    if (!init) {
      wakeUp();
      setInit(true);
    }

    if (active) {
      let phraseMaker = {
        text: phraseCount[0],
        minOccurrences: phraseCount[1],
        maxPhraseLength: phraseCount[2],
      };
      makeRequest(phraseMaker);
    }
  }, [active, init, phraseCount, setLoading]);

  return <>{makePhrases()}</>;
};

export default PhraseList;
