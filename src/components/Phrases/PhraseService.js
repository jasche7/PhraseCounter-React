const url = "https://phrase-counter.herokuapp.com";

/**
 * Sends wakeup HTTP request to Heroku dyno.
 */
export const wakeUp = () => {
  fetch(url).catch(() => {
    console.log("Sent wake-up request to server");
  });
};

/**
 * Makes POST request to Heroku dyno for PhraseCount, which will return a JSON object with phrases
 * and counts.
 * @param {*} data contains JSON object with PhraseCount's required parameters
 */
export const phraseRequest = async (data) => {
  const result = await fetch(url + "/phrase", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    console.log(response);
    response.json();
  });
  return result;
};
