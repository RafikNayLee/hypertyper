import React from "react";
import { useTranslation } from "react-i18next";
import Style from "./Style";
import Key from "./Key";

const HintKey = ({ nextKey }) => {
  const { t } = useTranslation();
  return nextKey ? (
    <svg
      className="m-2"
      xmlns="http://www.w3.org/2000/svg"
      height={40}
      viewBox="0 0 85 75"
    >
      <defs>
        <Style />
      </defs>
      <title>Hint Key</title>
      <Key
        {...nextKey}
        x={0}
        y={0}
        height={75}
        width={85}
        text={t(`buttons.${nextKey.id}.label`)}
        highlight={false}
      />
    </svg>
  ) : (
    <></>
  );
};

export default HintKey;
