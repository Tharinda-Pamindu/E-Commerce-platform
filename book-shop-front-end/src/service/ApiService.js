import axios from "axios";

const BASE_URL = "http://localhost:9000";
const token = sessionStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const getRequest = async (path) => {
  try {
    return await axios.get(BASE_URL + path);
  } catch (error) {
    if (error.response.status === 401) {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("user_id");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      window.location.href = "/login";
    }
  }
};

export const postRequest = async (path, data) => {
  try {
    return await axios.post(BASE_URL + path, data);
  } catch (error) {
    if (error.response.status === 401) {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("user_id");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      window.location.href = "/login";
    }
  }
};

export const putRequest = async (path, data) => {
  try {
    return await axios.put(BASE_URL + path, data);
  } catch (error) {
    if (error.response.status === 401) {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("user_id");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      window.location.href = "/login";
    }
  }
};

export const putRequestForFile = async (path, data) => {
  try {
    return await axios.put(BASE_URL + path, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    if (error.response.status === 401) {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("user_id");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      window.location.href = "/login";
    }
  }
};

export const deleteRequest = async (path) => {
  try {
    return await axios.delete(BASE_URL + path);
  } catch (error) {
    if (error.response.status === 401) {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("user_id");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      window.location.href = "/login";
    }
  }
};
