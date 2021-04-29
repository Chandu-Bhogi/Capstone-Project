import React from "react";
import axios from "axios";
import notification from "antd/es/notification";
import { getUserToken } from "./index";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (config.url.slice(0, 4) !== "http") {
      config.url = process.env.REACT_APP_API_URL + config.url;
    }
    if (
      config.url.indexOf(process.env.REACT_APP_API_URL) > -1 &&
      (!config.headers.Authorization || config.headers.Authorization === "")
    ) {
      try {
        let token = getUserToken();
        if (token) {
          config.headers["Authorization"] = "Bearer " + token || null;
        }
      } catch (e) {
        console.log("Auth Header Error: ", e);
      }
    }
    console.log("API Request: ", config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("API Response: ", response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("API Error: ", error);
    if (!error.response) {
      // network error
      notification.error({
        message: "Network Error",
        description:
          "Internet connectivity is lost. Please check your network connection.",
      });
      return [];
    }

    const code = parseInt(error.response && error.response.status);
    if (code !== 404 && code !== 500) {
      console.log("Err Response: ", error.response);
      var MSG = error.response.data.message || "Something went wrong!";
    }
    switch (code) {
      case 400:
      case 401:
      case 422:
        break;
      case 404:
        MSG = "Resource does not exist";
        break;
      case 500:
        MSG = "Server is not responding at the moment. Please try again later.";
        break;
      default:
        MSG = "Server is not responding at the moment. Please try again later.";
        break;
    }
    notification.error({
      message: "Error",
      description: MSG,
    });
    return error.response;
  }
);

export default axios;
