import React from "react";

import Buttons from "./Buttons";
import DEFAULT_KEYS from "./keysList";
import Style from "./Style";

const KeyBoard = ({ nextKeyRight, nextKeyLeft }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1860 630">
      <defs>
        <Style />
      </defs>
      <title>KeyBoard</title>

      <Buttons
        buttonKeys={DEFAULT_KEYS}
        nextKeyRight={nextKeyRight}
        nextKeyLeft={nextKeyLeft}
      />
    </svg>
  );
};

KeyBoard.defaultProps = {
  nextChar: "",
};

export default KeyBoard;
