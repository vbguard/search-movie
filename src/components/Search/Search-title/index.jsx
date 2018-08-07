import React from 'react';
import PropTypes from 'prop-types';

// import styles from './styles.css';

const SearchByTitle = ({ titleValue }) => (
  <form>
    <label htmlFor="search-by-title">
      <input type="text" name="" id="search-by-title" value={titleValue} />
    </label>
  </form>
);

SearchByTitle.propTypes = {
  titleValue: PropTypes.string.isRequired,
};
export default SearchByTitle;
