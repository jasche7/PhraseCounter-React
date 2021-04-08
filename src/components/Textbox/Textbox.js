import React, { useState } from "react";

const Textbox = (props) => {
  const [text, setText] = useState();
  const [occurrences, setOccurrences] = useState(0);
  const [phrase, setPhrase] = useState(0);

  const onSubmit = (event) => {
    event.preventDefault();
    props.setPhraseCount([text, occurrences, phrase]);
    props.clickFunction();
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Text:
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </label>

      <label>
        Min Occurrences:
        <input
          type="number"
          value={occurrences}
          onChange={(e) => setOccurrences(e.target.value)}
        />
      </label>

      <label>
        Max Phrase Length:
        <input
          type="number"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
        />
      </label>

      <button type="submit" />
    </form>
  );
};

export default Textbox;
