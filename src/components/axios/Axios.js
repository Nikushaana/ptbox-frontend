import axios from "axios";

export const axiosFront = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`,
});

axiosFront.interceptors.request.use((config) => {
  const token = `${process.env.REACT_APP_TOKEN}`;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});