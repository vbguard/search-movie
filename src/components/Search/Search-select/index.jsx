import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from './styles.css';

const SearchSelect = ({ selectedOption, onChange, options }) => (
  <div className={styles.SearchSelect}>
    <h3 className={styles.SearchSelectTitle}>Search by Category</h3>
    <Select value={selectedOption} onChange={onChange} options={options} />
  </div>
);

SearchSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedOption: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  options: PropTypes.instanceOf(Array).isRequired,
};

SearchSelect.defaultProps = {
  selectedOption: null,
};

export default SearchSelect;
