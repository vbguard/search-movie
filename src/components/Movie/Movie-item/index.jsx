import React from 'react';
import PropTypes from 'prop-types';
import imageUrl from '../../../services/tmdb-image';

const MovieItem = ({ movie }) => (
  <div>
    <img src={imageUrl(movie.poster_path)} alt="" />
  </div>
);

MovieItem.propTypes = {
  movie: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default MovieItem;
