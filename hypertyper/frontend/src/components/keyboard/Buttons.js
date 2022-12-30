import React from "react";
import Key from "./Key";
import { useTranslation } from "react-i18next";

const R = require("ramda");

const Buttons = ({ buttonKeys, nextKeyRight, nextKeyLeft }) => {
  const { t } = useTranslation();
  const highlight = (key) =>
    key.id === R.prop("id", nextKeyRight) ||
    key.id === R.prop("id", nextKeyLeft);
  return (
    <g id="buttons" className="shadow">
      {buttonKeys.map((key) => {
        return (
          <Key
            key={key.id}
            {...key}
            text={t(`buttons.${key.id}.label`)}
            highlight={highlight(key)}
            fade={(nextKeyRight || nextKeyLeft) && !highlight(key)}
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
