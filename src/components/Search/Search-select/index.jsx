import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SearchSelect = ({ selectedOption, onChange, options }) => (
  <div>
    <Select value={selectedOption} onChange={onChange} options={options} />
  </div>
);

SearchSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedOption: PropTypes.objectOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
};

SearchSelect.defaultProp = {
  selectOption: null,
};

export default SearchSelect;
