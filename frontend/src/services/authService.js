import axios from "axios";

const API = "http://localhost:8080/parkease/api/v1/auth";

export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};