const url = "https://phrase-counter.herokuapp.com";

export const wakeUp = () => {
  fetch(url).catch(() => {
    console.log("Sent wake-up request to server");
  });
};

export const phraseRequest = async (data) => {
  const result = await fetch(url + "/phrase", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return result;
};
