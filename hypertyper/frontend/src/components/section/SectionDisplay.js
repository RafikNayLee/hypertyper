import React from "react";
import { Link } from "react-router-dom";

const SectionDisplay = ({ section }) => {
  return (
    <>
      {section.lessons.map((lesson) => (
        <Link
          key={`lesson-${lesson.id}`}
          className="list-group-item list-group-item-action"
          to={`/course/${section.course}/section/${section.id}/lesson/${lesson.id}`}
        >{`Lesson : ${lesson.name}`}</Link>
      ))}
    </>
  );
};

export default SectionDisplay;
