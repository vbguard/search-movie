import React from 'react';
import PropTypes from 'prop-types';
import WatchListItem from './Watch-item';

const WatchList = ({ watchlist /* onDelete */ }) => (
  <ul>
    {watchlist.map(item => (
      <li>
        <WatchListItem movie={item} />
      </li>
    ))}
  </ul>
);

WatchList.propTypes = {
  watchlist: PropTypes.instanceOf(Array),
};

export default WatchList;
