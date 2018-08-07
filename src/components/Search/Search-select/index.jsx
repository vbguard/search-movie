import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

const options = [
  { value: 'popular', label: 'Popular' },
  { value: 'topRated', label: 'Top Rated' },
  { value: 'upcoming', label: 'Upcoming' },
];

class SearchSelect extends React.Component {
  state = {
    selectedOption: null,
  };

  changeOption = option => {
    this.setState({ selectedOption: option });
  };

  moveDataToState() {
    const { selectedOption } = this.state;
    const { getCategory } = this.props;
    // eslint-disable-next-line
    console.log(`Option selected:`, selectedOption.value);
    // eslint-disable-next-line
    console.log('props in Select: ', this.props);
    console.log(typeof getCategory);
    // this.props.categorySelected = String(selectedOption.value);
    // this.setProps({ categorySelected: selectedOption.value });
    getCategory(selectedOption.value);
  }

  render() {
    const { selectedOption } = this.state;
    console.log('in search select: ', this.props);
    return (
      <div>
        {selectedOption && this.moveDataToState()}
        <Select
          value={selectedOption}
          onChange={this.changeOption}
          options={options}
        />
      </div>
    );
  }
}

SearchSelect.propTypes = {
  getCategory: PropTypes.func.isRequired,
  // categorySelected: PropTypes.string.isRequired,
};

// SearchSelect.defaultProp = {
//   categorySelected: '',
// };

export default SearchSelect;
