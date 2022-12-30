import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks";

import Collapse from "react-bootstrap/Collapse";
import StylingSeparator from "../common/StylingSeparator";

const CoursesTitle = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  });

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Collapse in={show} dimension="width">
        <h3
          style={{
            color: theme.palette.primary.dark,
            textShadow: `2px 2px ${theme.palette.primary.light}`,
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          {t("course.available_courses")}
        </h3>
      </Collapse>
      <Collapse in={show} dimension="width">
        <StylingSeparator />
      </Collapse>
    </div>
  );
};

export default CoursesTitle;
