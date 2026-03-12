import axios from "axios";

const API = "http://localhost:8080/parkease/api/v1/parking-lots";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getParkingLots = () => {
  return axios.get(API);
};

export const createParkingLot = (data) => {
  return axios.post(API, data, getAuthHeader());
};

export const deleteParkingLot = (id) => {
  return axios.delete(`${API}/${id}`, getAuthHeader());
};