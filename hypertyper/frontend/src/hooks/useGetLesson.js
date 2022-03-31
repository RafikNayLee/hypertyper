import { useEffect } from "react";
import useGetHttp from "./useGetHttp";

const useGetLesson = (id) => {
  const { mutate, data, loading, error } = useGetHttp(`/api/lessons/${id}/`)();
  useEffect(() => {
    mutate({
      options: {},
    });
  }, [id]);

  return { data, loading, error };
};

export default useGetLesson;
