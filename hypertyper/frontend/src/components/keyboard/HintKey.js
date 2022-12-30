import React from "react";
import { useTranslation } from "react-i18next";
import Style from "./Style";
import Key from "./Key";
import { useTheme } from "../../hooks";

const R = require("ramda");

const HintKey = ({ nextKey }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const width = R.propOr(55, "width", nextKey);
  const maxWidth = 120;
  const height = R.propOr(45, "height", nextKey);
  const rx = R.prop("rx", nextKey) || 14.82;
  return nextKey ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={theme.mixins.hintKeyHeight}
      width={width > maxWidth ? maxWidth : width}
      viewBox={`0 0 ${width > 200 ? 200 : width} ${height}`}
    >
      <defs>
        <Style />
      </defs>
      <title>Hint Key</title>
      <Key
        {...nextKey}
        x={0}
        y={0}
        rx={rx}
        width={width > 200 ? 200 : width}
        height={height}
        text={t(`buttons.${nextKey.id}.label`)}
        highlight={false}
      />
    </svg>
  ) : (
    <></>
  );
};

export default HintKey;
