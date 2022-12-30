import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useTranslation } from "react-i18next";
import StylingSeparator from "../common/StylingSeparator";

const BreadCrumbs = ({
  courseId,
  courseName,
  sectionId,
  sectionName,
  lessonId,
  lessonName,
  lessonBadge,
}) => {
  const { t } = useTranslation();
  const crumbs = [
    {
      title: t("home.title"),
      to: "/",
      active: false,
    },
  ];
  if (courseId) {
    crumbs.push({
      title: courseName,
      to: sectionId ? `/course/${courseId}` : null,
      active: !sectionId && !lessonId,
    });
  }

  if (sectionId) {
    crumbs.push({
      title: sectionName,
      to: lessonId ? `/course/${courseId}/section/${sectionId}` : null,
      active: !lessonId,
    });
  }

  if (lessonId) {
    crumbs.push({
      title: lessonName,
      to: null,
      active: true,
      badge: true,
    });
  }

  return (
    <div
      style={{
        marginBottom: "10px",
      }}
    >
      <Breadcrumb
        style={{
          margin: 0,
        }}
      >
        {crumbs.map((crumb, index) => {
          const item = (
            <Breadcrumb.Item key={index} active={crumb.active}>
              <span>{crumb.title} </span>
              {crumb.badge && lessonBadge}
            </Breadcrumb.Item>
          );

          if (crumb.to) {
            return (
              <LinkContainer key={index} to={crumb.to}>
                {item}
              </LinkContainer>
            );
          }
          return item;
        })}
      </Breadcrumb>
      <StylingSeparator height="3px" />
    </div>
  );
};

export default BreadCrumbs;
