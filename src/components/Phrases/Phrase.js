import React from "react";

const Phrase = (props) => {
  return (
    <div>
      {props.phrase}: {props.count}
    </div>
  );
};

export default Phrase;
