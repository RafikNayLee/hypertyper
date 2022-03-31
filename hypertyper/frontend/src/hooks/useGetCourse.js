import { useEffect } from "react";
import useGetHttp from "./useGetHttp";

const useGetCourse = (id) => {
  const { mutate, data, loading, error } = useGetHttp(`/api/courses/${id}/`)();
  useEffect(() => {
    mutate({
      options: {},
    });
  }, [id]);

  return { data, loading, error };
};

export default useGetCourse;
