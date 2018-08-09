import React from 'react';
import PropTypes from 'prop-types';
import WatchListItem from './Watch-item';
import styles from './styles.css';

const WatchList = ({ watchlist /* onDelete */ }) => (
  <div className={styles.WatchListWrap}>
    <h2 className={styles.WatchListTitle}>WatchList</h2>
    <ul>
      {watchlist.map(item => (
        <li key={item.id}>
          <WatchListItem item={item} />
        </li>
      ))}
    </ul>
  </div>
);

WatchList.propTypes = {
  watchlist: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WatchList;
