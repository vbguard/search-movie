import React from 'react';
import PropTypes from 'prop-types';
import SearchSelect from './Search-select';

const Search = ({ searchTitleValue }) => (
  <div>
    <SearchSelect searchValue={searchTitleValue} />
  </div>
);

Search.propTypes = {
  searchTitleValue: PropTypes.string.isRequired,
};

export default Search;
