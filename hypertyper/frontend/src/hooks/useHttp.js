import { useState } from "react";
import axios from "axios";
const controller = new AbortController();

const useHttp = (method) => (api_url) => () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = ({ options = {}, success_callback, config }) => {
    setLoading(true);
    axios[method](
      api_url,
      {
        signal: controller.signal,
        ...options,
      },
      config
    )
      .then((response) => {
        setError(null);
        setLoading(false);
        setData(response.data);
        if (success_callback) success_callback(response.data);
      })
      .catch((e, res) => {
        setLoading(false);
        setError(e.response.data);
        setData(null);
      });
  };
  return {
    mutate,
    data,
    loading,
    error,
    cancel: () => controller.abort(),
  };
};

export default useHttp;
