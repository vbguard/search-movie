import React from 'react';
import PropTypes from 'prop-types';
import imageUrl from '../../../services/tmdb-image';

const WatchListItem = movie => (
  <div>
    <img src={imageUrl(movie.poster_path)} alt="" />
    <h3>{movie.title}</h3>
    <p>{movie.overview}</p>
    <p>{movie.release_date}</p>
  </div>
);

WatchListItem.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
  }).isRequired,
};

export default WatchListItem;
