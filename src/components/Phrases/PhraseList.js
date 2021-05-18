import React, { useEffect, useState } from "react";
import Phrase from "./Phrase";
import Spinner from "react-bootstrap/Spinner";
import * as phraseService from "./PhraseService.js";

const errorStates = {
  SERVER_DOWN: "serverdown",
  BAD_REQUEST: "badrequest",
};

const PhraseList = (props) => {
  const [APIInit, setAPIInit] = useState(false);
  const [phrases, setPhrases] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const APILoading = props.loading;
  const setAPILoading = props.setLoading;
  const requestBody = props.requestBody;
  const active = props.active; //prevents sending API requests until form has been submitted once

  const makePhrases = () => {
    if (APILoading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else if (errorState) {
      switch (errorState) {
        case errorStates.SERVER_DOWN:
          return <p>Request failed. The server may be down.</p>;
        case errorStates.BAD_REQUEST:
          return <p>Request failed. Your request may be too long.</p>;
        default:
          return <p>Request failed.</p>;
      }
    } else {
      return phrases.map((requestBody) => (
        <Phrase
          key={requestBody[0]}
          phrase={requestBody[0]}
          count={requestBody[1]}
        />
      ));
    }
  };

  useEffect(() => {
    if (!APIInit) {
      phraseService.wakeUp();
      setAPIInit(true);
    }

    const makeRequest = (data) => {
      setAPILoading(true);
      phraseService
        .phraseRequest(data)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 500) {
            setErrorState(errorStates.BAD_REQUEST);
          } else {
            setPhrases(Object.entries(result));
            console.log(result.status);
            setErrorState(false);
          }
        })
        .catch((err) => {
          console.log(err.message);
          setErrorState(errorStates.SERVER_DOWN);
        })
        .finally(setAPILoading(false));
    };

    if (active) {
      let phraseMaker = {
        text: requestBody[0],
        minOccurrences: requestBody[1],
        maxPhraseLength: requestBody[2],
        caseSensitive: requestBody[3],
        ignoringPunctuation: requestBody[4],
      };
      makeRequest(phraseMaker);
    }
  }, [active, APIInit, requestBody, setAPILoading]);

  return <>{makePhrases()}</>; //returns either loading spinner, error, or current phrases
};

export default PhraseList;
