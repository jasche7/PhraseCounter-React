import React, { useEffect, useState } from "react";
import Phrase from "./Phrase";
import Spinner from "react-bootstrap/Spinner";
import * as phraseService from "./PhraseService.js";

/**
 * Error states related to PhraseService call.
 */
const errorStates = {
  SERVER_DOWN: "serverdown",
  BAD_REQUEST: "badrequest",
};

/**
 * PhraseList component makes call to PhraseService and generates Phrase components based
 * on return value.
 * @param {*} props contains the following parameters:
 * active - once Textbox form has been submitted once, set to true so that PhraseService can be called
 * loading - while waiting for a response from PhraseService, set to true so that Textbox form submit is disabled
 * setLoading - useState setter for loading
 * requestBody - parameters for PhraseService request, set by Textbox
 */
const PhraseList = (props) => {
  const [APIInit, setAPIInit] = useState(false); //for initial API call (e.g. waking Heroku)
  const [phrases, setPhrases] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const APILoading = props.loading;
  const setAPILoading = props.setLoading;
  const requestBody = props.requestBody;
  const active = props.active; //prevents sending API requests until form has been submitted once

  /**
   * Returns loading spinner if loading, error message if errorState, or else generated Phrase components.
   */
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

  /**
   * Calls API wakeUp function if not already called this session. If active and requestBody changes
   * from new Textbox form submission, will make a new request to phraseService. setPhrases will generate
   * Phrase components from the API response.
   */
  useEffect(() => {
    if (!APIInit) {
      phraseService.wakeUp();
      setAPIInit(true);
    }

    const makeRequest = (data) => {
      setAPILoading(true);
      phraseService
        .phraseRequest(data)
        .then((result) => {
          if (result && result.status === 500) {
            setErrorState(errorStates.BAD_REQUEST);
          } else if (result) {
            setPhrases(Object.entries(result));
            setErrorState(false);
          }
        })
        .catch((err) => {
          console.error(err.message);
          setErrorState(errorStates.SERVER_DOWN);
        })
        .finally(() => {
          setAPILoading(false);
        });
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
