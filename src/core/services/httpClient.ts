import Axios, { AxiosResponse } from "axios";
import __get from "lodash/get";

const axiosClient = Axios.create({
  baseURL: "",
  timeout: 80000,
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

axiosClient.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    const { response = {} } = error;

    if (response.status === 401) {
      // TODO
    } else if (response.status === 403) {
      // TODO
    } else if (response.status === 500) {
      // TODO
    } else {
      return error.response || error.request || error.message;
    }
  }
);

export const axiosHandler = (service: any) => {
  return new Promise<any>(async (resolve) => {
    const response: AxiosResponse = await service();
    const apiResponse = __get(response, "response", undefined);
    const httpStatus = __get(response, "status", 500);
    if (apiResponse === "" || (response && response.status >= 500)) {
      resolve({ isSuccess: false, isInternalServerError: true });
    }

    const status = __get(response, "status", null);
    const data = __get(response, "data", null);
    const errors: any = __get(response, "message", []);

    const isSuccess = status === 200;
    const isFailure = !isSuccess;

    resolve({
      data,
      status,
      httpStatus,
      errors,
      isSuccess,
      isFailure,
      response,
      isInternalServerError: false,
    });
  });
};

export default axiosClient;
