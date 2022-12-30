import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Completed = ({ high_score }) => {
  const { t } = useTranslation();
  let tooltipText = t("lesson.completed");
  if (high_score) {
    tooltipText = `${t("lesson.completed")}, ${t("lesson.high_score", {
      high_score,
    })}`;
  }
  return (
    <OverlayTrigger
      placement={"top"}
      overlay={
        <Tooltip id={`lesson-completed-${tooltipText}`}>{tooltipText}</Tooltip>
      }
    >
      <span>
        <FontAwesomeIcon
          icon={faCheck}
          style={{
            color: "green",
          }}
        />
      </span>
    </OverlayTrigger>
  );
};

export default Completed;
