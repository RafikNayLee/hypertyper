import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useTheme } from "../../hooks";
import HintKey from "../keyboard/HintKey";
const R = require("ramda");
const SpanAligned = styled.span`
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: ${({ direction }) => direction};
  align-items: center;
  font-size: 0.8em;
  height: ${({ height }) => `${height}px;`};
`;
const Hints = ({ nextKey }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const label = t("nextKeyHint", {
    hand: t(`hands.${R.prop("hand", nextKey)}.label`),
    finger: t(`fingers.${R.prop("finger", nextKey)}.label`),
  });
  return nextKey ? (
    <SpanAligned direction={nextKey.hand} height={theme.mixins.hintKeyHeight}>
      {R.propEq("hand", "right", nextKey) && label}
      <HintKey nextKey={nextKey} />
      {R.propEq("hand", "left", nextKey) && label}
    </SpanAligned>
  ) : (
    <SpanAligned
      direction={"left"}
      height={theme.mixins.hintKeyHeight}
    ></SpanAligned>
  );
};

export default Hints;
