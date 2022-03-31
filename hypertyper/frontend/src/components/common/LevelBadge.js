import React from "react";
import { useGetLevel } from "../../hooks";
import Badge from "react-bootstrap/Badge";
const LevelBadge = ({ code }) => {
  const { data, loading, error } = useGetLevel(code);

  if (loading || error) return <Badge bg="primary">{code}</Badge>;
  return <Badge bg="primary">{data ? data.name : code}</Badge>;
};

export default LevelBadge;
