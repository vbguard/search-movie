import axios from 'axios';

const API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY;
const BASE_URL = process.env.REACT_APP_MOVIEDB_URL;

export const category = ({ categorySelected, onSuccess, onError, page }) => {
  axios
    .get(
      `${BASE_URL}/movie/${categorySelected}?api_key=${API_KEY}&language=en-US&page=${page}`,
    )
    .then(response => response.data.results)
    .then(onSuccess)
    .catch(onError);
};

export const title = ({ value, onSuccess, onError, page }) => {
  axios
    .get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${value}`,
    )
    .then(response => response.data.results)
    .then(onSuccess)
    .catch(onError);
};

export const getMore = ({ value, onSuccess, onError, pages }) => {
  axios
    .get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${pages}&include_adult=false&query=${value}`,
    )
    .then(response => response.data.results)
    .then(onSuccess)
    .catch(onError);
};

export const movieDetail = ({ id, onSuccess, onError }) => {
  // api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response=videos
  axios
    .get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`)
    .then(response => response.data.results)
    .then(onSuccess)
    .catch(onError);
};
