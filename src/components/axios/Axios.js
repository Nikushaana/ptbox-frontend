import axios from "axios";

const axiosFront = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`,
});

axiosFront.interceptors.request.use((config) => {
  return config;
});

export default axiosFront;
