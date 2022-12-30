import { useEffect, useContext } from "react";
import useGetHttp from "./useGetHttp";
import { AuthContext } from "../context/auth";

const useGetCourse = (id) => {
  const { getTokenOptions } = useContext(AuthContext);
  const { mutate, data, loading, error } = useGetHttp(`/api/courses/${id}/`)();
  useEffect(() => {
    mutate({
      options: getTokenOptions(),
    });
  }, [id]);

  return { data, loading, error };
};

export default useGetCourse;
