import React from 'react';
import PropTypes from 'prop-types';
import SearchSelect from './Search-select';
import SearchByTitle from './Search-title';

const Search = ({ categorySelected }) => (
  <div>
    <SearchSelect categorySelected={categorySelected} />
    <SearchByTitle />
  </div>
);

Search.propTypes = {
  // titleValue: PropTypes.string.isRequired,
  categorySelected: PropTypes.string.isRequired,
};

Search.defaultProp = {
  titleValue: '',
};

export default Search;
