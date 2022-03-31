import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import HintKey from "../keyboard/HintKey";

const SpanAligned = styled.span`
  display: flex;
  justify-content: ${({ direction }) => direction};
  align-items: center;
`;
const Hints = ({ nextKey }) => {
  const { t } = useTranslation();

  return nextKey ? (
    <SpanAligned direction={nextKey.hand}>
      {t("nextKeyHint", {
        hand: t(`hands.${nextKey.hand}.label`),
        finger: t(`fingers.${nextKey.finger}.label`),
      })}
      <HintKey nextKey={nextKey} />
    </SpanAligned>
  ) : (
    <></>
  );
};

export default Hints;
