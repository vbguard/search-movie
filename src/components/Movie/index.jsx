import React from 'react';
import PropTypes from 'prop-types';

const MovieList = ({ movies }) => (
  <ul>
    {movies.map(movie => (
      <li key={movie.id}>
        <h3>{movie.title}</h3>
      </li>
    ))}
  </ul>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default MovieList;
