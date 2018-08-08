import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const SearchByTitle = ({ titleValue, onChange }) => (
  <label htmlFor="search-by-title">
    <input
      className={styles.SearchInput}
      type="text"
      name="searchByTitle"
      id="search-by-title"
      value={titleValue}
      onChange={onChange}
      placeholder="Search By Title"
    />
  </label>
);

SearchByTitle.propTypes = {
  titleValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

SearchByTitle.defaultProp = {
  titleValue: '',
};
export default SearchByTitle;
