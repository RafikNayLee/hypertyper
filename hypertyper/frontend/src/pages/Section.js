import React from "react";
import { useParams } from "react-router-dom";
import SectionDisplay from "../components/section/SectionDisplay";
import BreadCrumbs from "../components/layout/BreadCrumbs";
import { useGetSection } from "../hooks";
import Loading from "../components/common/Loading";

const Section = () => {
  const { sectionId } = useParams();
  const { data, loading, error } = useGetSection(sectionId);
  const loadingMarkup = <Loading text="Loading Section ..." />;
  if (loading) return loadingMarkup;
  if (error) return <h3>Error ...</h3>;
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
