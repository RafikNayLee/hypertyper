import { useEffect } from "react";
import useGetHttp from "./useGetHttp";

const useGetLevel = (code) => {
  const { mutate, data, error, loading } = useGetHttp(`/api/levels/${code}/`)();
  useEffect(() => {
    mutate({
      options: {},
    });
  }, [code]);

  return {
    data,
    error,
    loading,
  };
};

export default useGetLevel;
