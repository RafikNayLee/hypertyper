import React, { useEffect, useContext } from "react";

import { useGetCourses } from "../hooks";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";
import CourseDisplay from "../components/course/CourseDisplay";
import Accordion from "react-bootstrap/Accordion";
import Loading from "../components/common/Loading";

const Home = () => {
  const { getTokenOptions, isAuthenticated } = useContext(AuthContext);
  const { mutate, data, loading, error } = useGetCourses();

  useEffect(() => {
    if (isAuthenticated)
      mutate({
        options: getTokenOptions(),
      });
  }, [isAuthenticated]);

  const loadingMarkup = <Loading text="Loading ..." />;
  if (loading) return loadingMarkup;
  if (error) return <h3>Error ...</h3>;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const coursesMarkup = !data ? null : (
    <Accordion defaultActiveKey="0">
      {data.map((course, i) => (
        <Accordion.Item eventKey={`${i}`} key={`course-${course.id}-accordion`}>
          <Accordion.Header>{`Course : ${course.name}`}</Accordion.Header>
          <Accordion.Body>
            <CourseDisplay course={course} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );

  return <div>{coursesMarkup}</div>;
};

export default Home;
