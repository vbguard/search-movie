import axios from 'axios';

const API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY;
const URL = process.env.REACT_APP_MOVIEDB_URL;

export const category = ({ categorySelected, onSuccess, onError, page }) => {
  axios
    .get(
      `${URL}/movie/${categorySelected}?api_key=${API_KEY}&language=en-US&page=${page}`,
    )
    .then(response => response.data.results)
    .then(onSuccess)
    .catch(onError);
};

export const title = ({ titleValue, onSuccess, onError, page }) => {
  axios
    .get(
      `${URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${titleValue}`,
    )
    .then(response => response.data.results)
    .then(onSuccess)
    .catch(onError);
};
