import http from "./httpservice";
import jwtDecoder from "jwt-decode";
import { apiUrl } from "../config.json";
const apiEndPoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt({ getJwt });
export async function login() {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecoder(jwt);
  } catch (ex) {
    return null;
  }
}
export function getjwt() {
  return localStorage.getItem(tokenKey);
}
export function loginWithjwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export default {
  login,
  logout,
  getCurrentUser,
  loginWithjwt,
  getjwt,
};
