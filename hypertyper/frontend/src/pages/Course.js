import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import CourseDisplay from "../components/course/CourseDisplay";
import BreadCrumbs from "../components/layout/BreadCrumbs";
import { useGetCourse } from "../hooks";

const Course = () => {
  const { courseId } = useParams();
  const { data, loading, error } = useGetCourse(courseId);
  const loadingMarkup = <Loading text="Loading Course ..." />;
  if (loading) return loadingMarkup;
  if (error) return <h3>Error ...</h3>;
  if (data)
    return (
      <div>
        <BreadCrumbs
          lessonId={null}
          lessonName={null}
          sectionId={null}
          sectionName={null}
          courseId={courseId}
          courseName={data.name}
        />
        <CourseDisplay course={data} />
      </div>
    );
  else return loadingMarkup;
};

export default Course;
