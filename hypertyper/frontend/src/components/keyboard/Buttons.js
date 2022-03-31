import React from "react";
import Key from "./Key";
import { useTranslation } from "react-i18next";

const R = require("ramda");

const Buttons = ({ buttonKeys, nextKeyRight, nextKeyLeft }) => {
  const { t } = useTranslation();

  return (
    <g id="buttons">
      {buttonKeys.map((key) => {
        return (
          <Key
            key={key.id}
            {...key}
            text={t(`buttons.${key.id}.label`)}
            highlight={
              key.id === R.prop("id", nextKeyRight) ||
              key.id === R.prop("id", nextKeyLeft)
            }
          />
        );
      })}
    </g>
  );
};

Buttons.defaultProps = {
  buttonKeys: [],
  currentChar: "",
};

export default Buttons;
