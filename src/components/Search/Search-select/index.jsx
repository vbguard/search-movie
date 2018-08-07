import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

const options = [
  { value: 'popular', label: 'Popular' },
  { value: 'topRated', label: 'Top Rated' },
  { value: 'upcoming', label: 'Upcoming' },
];

class SearchSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

  // const setCategorySelected = this.props;

  changeOption = option => {
    this.setState({ selectedOption: option });
  };

  moveDataToState() {
    const { selectedOption } = this.state;
    // eslint-disable-next-line
    console.log(`Option selected:`, selectedOption.value);
    // eslint-disable-next-line
    console.log('props in Select: ', this.props);
    // this.props.categorySelected = String(selectedOption.value);
    // this.setProps({ categorySelected: selectedOption.value });
    this.setCategorySelected(selectedOption.value);
  }

  render() {
    const { selectedOption } = this.state;
    console.log(this.props);
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
  setCategorySelected: PropTypes.func.isRequired,
  // categorySelected: PropTypes.string.isRequired,
};

// SearchSelect.defaultProp = {
//   categorySelected: '',
// };

export default SearchSelect;
