import React from 'react';
import PropTypes from 'prop-types';
import imageUrl from '../../../services/tmdb-image';

const WatchListItem = ({ item }) => (
  <div>
    <img src={imageUrl(item.poster_path)} alt="" />
    <h3>{item.title}</h3>
    <p>{item.release_date}</p>
    <button type="button" />
    <button type="button" />
  </div>
);

WatchListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
  }).isRequired,
};

export default WatchListItem;
