import React, { useState } from "react";

import SectionDisplay from "../section/SectionDisplay";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const CourseDisplay = ({ course }) => {
  const [key, setKey] = useState(0);
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-2"
    >
      {course.sections.map((section, sectionIndex) => (
        <Tab
          eventKey={sectionIndex}
          title={section.name}
          key={`section-${sectionIndex}-tab`}
        >
          <SectionDisplay course={course} section={section} />
        </Tab>
      ))}
    </Tabs>
  );
};

export default CourseDisplay;
