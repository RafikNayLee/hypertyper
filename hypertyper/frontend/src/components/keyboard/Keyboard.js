import React from "react";

import Buttons from "./Buttons";
import DEFAULT_KEYS from "./keysList";
import Style from "./Style";
import { useTheme } from "../../hooks";
import Card from "react-bootstrap/Card";

const KeyBoard = ({ nextKeyRight, nextKeyLeft, button }) => {
  const theme = useTheme();
  return (
    <Card
      style={{
        boxShadow: theme.mixins.cardShadow,
        padding: 5,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 13,
          right: 13,
        }}
      >
        {button}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1860 560">
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
    </Card>
  );
};

KeyBoard.defaultProps = {
  nextChar: "",
};

export default KeyBoard;
