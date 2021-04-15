import React, { useEffect, useState } from "react";
import Phrase from "./Phrase";
import Spinner from "react-bootstrap/Spinner";

const PhraseList = (props) => {
  const url = "https://phrase-counter.herokuapp.com";
  const [init, setInit] = useState(false);
  const [res, setRes] = useState([]);
  const loading = props.loading;
  const setLoading = props.setLoading;
  const requestBody = props.requestBody;
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
      return res.map((requestBody) => (
        <Phrase
          key={requestBody[0]}
          phrase={requestBody[0]}
          count={requestBody[1]}
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
        text: requestBody[0],
        minOccurrences: requestBody[1],
        maxPhraseLength: requestBody[2],
        isCaseSensitive: requestBody[3],
        isIgnoringPunctuation: requestBody[4],
      };
      makeRequest(phraseMaker);
    }
  }, [active, init, requestBody, setLoading]);

  return <>{makePhrases()}</>;
};

export default PhraseList;
