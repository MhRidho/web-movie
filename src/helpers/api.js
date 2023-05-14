import http from "../helpers/http.js";

export const getMovies = async (p) => {
  const movie = await http.get(
    `/movie/popular?page=${p}&api_key=${import.meta.env.VITE_API_KEY}`
  );
  return movie.data.results;
};

export const searchMovies = async (q) => {
  const search = await http.get(
    `/search/movie?page=1&query=${q}&api_key=${import.meta.env.VITE_API_KEY}`
  );
  return search.data;
};
