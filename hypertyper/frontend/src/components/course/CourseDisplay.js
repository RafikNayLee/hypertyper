import React, { useState } from "react";

import SectionDisplay from "../section/SectionDisplay";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { useTheme } from "../../hooks";

import ErrorAlert from "../common/ErrorAlert";
import { useTranslation } from "react-i18next";

const CourseDisplay = ({ course }) => {
  console.log("course: ", course);
  const { t } = useTranslation();
  const theme = useTheme();

  const [key, setKey] = useState(0);
  if (course.sections.length < 1) {
    return <ErrorAlert errorText={t("section.no_data")} />;
  }

  return (
    <Tabs id="course-display-tab" activeKey={key} onSelect={(k) => setKey(k)}>
      {course.sections.map((section, sectionIndex) => (
        <Tab
          tabIndex={sectionIndex}
          eventKey={sectionIndex}
          title={section.name}
          key={`section-${sectionIndex}-tab`}
          style={{
            background: theme.palette.primary.light,
          }}
        >
          <SectionDisplay course={course} section={section} />
        </Tab>
      ))}
    </Tabs>
  );
};

export default CourseDisplay;
