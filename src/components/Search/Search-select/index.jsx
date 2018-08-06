import React from 'react';
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

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default SearchSelect;
