import axios from "axios";

export const axiosFront = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`,
});