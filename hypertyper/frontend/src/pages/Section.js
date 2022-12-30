import React from "react";
import { useParams } from "react-router-dom";
import SectionDisplay from "../components/section/SectionDisplay";
import BreadCrumbs from "../components/layout/BreadCrumbs";
import { useGetSection } from "../hooks";
import Loading from "../components/common/Loading";
import ErrorAlert from "../components/common/ErrorAlert";

const Section = () => {
  const { sectionId } = useParams();
  const { data, loading, error } = useGetSection(sectionId);
  const loadingMarkup = <Loading />;
  if (loading) return loadingMarkup;
  if (error) return <ErrorAlert />;
  if (data)
    return (
      <div>
        <BreadCrumbs
          lessonId={null}
          lessonName={null}
          sectionId={sectionId}
          sectionName={data.name}
          courseId={data.course}
          courseName={data.course_name}
        />
        <SectionDisplay section={data} />
      </div>
    );
  else return loadingMarkup;
};

export default Section;
