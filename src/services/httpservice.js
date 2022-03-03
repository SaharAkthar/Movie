import axios from "axios";
import { toast } from "react-toastify";
import logger from "./loginservices";

axios.interceptors.response.use(null, (error) => {
  const expectederror =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectederror) {
    logger.log(error);
    toast.error("An unexpected error occure");
  }
  return Promise.reject(error);
});
export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};