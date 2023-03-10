import { useEffect, useMemo, useState } from "react";
import axiosClient from "../../core/services/httpClient";

/**
 * Axios loading interceptor for Get, Post, Put, Delete
 */
export const useAxiosLoading = () => {
  const [counter, setCounter] = useState(0);
  const interceptors = useMemo(() => {
    const inc = (config: any) => {
      const { method } = config;
      if (
        method === "get" ||
        method === "post" ||
        method === "put" ||
        method === "delete"
      ) {
        setCounter((s) => s + 1);
      }
    };
    const dec = () => setCounter((s) => s - 1);

    return {
      // eslint-disable-next-line no-sequences
      request: (config: any) => (inc(config), config),
      // eslint-disable-next-line no-sequences
      response: (response: any) => (setTimeout(() => dec(), 500), response),
      // eslint-disable-next-line no-sequences
      error: (error: any) => (dec(), Promise.reject(error)),
    };
  }, []);

  useEffect(() => {
    const reqInterceptor = axiosClient.interceptors.request.use(
      interceptors.request,
      interceptors.error
    );
    const resInterceptor = axiosClient.interceptors.response.use(
      interceptors.response,
      interceptors.error
    );
    return () => {
      axiosClient.interceptors.request.eject(reqInterceptor);
      axiosClient.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);

  return [counter > 0];
};
