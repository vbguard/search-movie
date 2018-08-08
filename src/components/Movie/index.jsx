import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from './Movie-item';
import styles from './styles.css';

const MovieList = ({ movies }) => (
  <ul className={styles.ul}>
    {movies.map(movie => (
      <li key={movie.id}>
        <MovieItem movie={movie} />
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
