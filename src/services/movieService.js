import http from "./httpservice";
import { apiUrl } from "../config.json";
const apiEndPoint = apiUrl + "/movies";
export function getMovies() {
  return http.get(apiEndPoint);
}
export function getMovies(movieid) {
  return http.get(movieUrl(movieid));
}
function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}
export function saveMovies(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(apiEndPoint, movie);
}
export function deleteMovies(movieId) {
  return http.delete(movieUrl(movieId));
}
