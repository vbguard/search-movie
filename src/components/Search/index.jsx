import React from 'react';
import PropTypes from 'prop-types';

import SearchSelect from './Search-select';
import SearchByTitle from './Search-title';

const Search = ({ getCategory, titleValue }) => {
  // eslint-disable-next-line
  console.log('in search: ', typeof setCategorySelected);
  return (
    <div>
      <SearchSelect getCategory={getCategory} />
      <SearchByTitle titleValue={titleValue} />
    </div>
  );
};
// const Search = ({ setCategorySelected }) => (
//   <div>
//     <SearchSelect setCategorySelected={setCategorySelected} />
//     <SearchByTitle />
//   </div>
// );

Search.propTypes = {
  // valueFromChild: PropTypes.string.isRequired,
  titleValue: PropTypes.string.isRequired,
  getCategory: PropTypes.func.isRequired,
};

// Search.defaultProp = {
//   titleValue: '',
// };

export default Search;
