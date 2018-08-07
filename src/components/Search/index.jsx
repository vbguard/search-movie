import React from 'react';
import PropTypes from 'prop-types';

import SearchSelect from './Search-select';
import SearchByTitle from './Search-title';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { valueFromChild: null };
  }

  myCallBack = datafromChild => {
    this.setState({ valueFromChild: datafromChild });
  };

  render() {
    const { valueFromChild } = this.props;
    console.log(valueFromChild);
    return (
      <div>
        <SearchSelect callBackParent={this.myCallBack} />
        <SearchByTitle />
      </div>
    );
  }
}
// const Search = ({ setCategorySelected }) => (
//   <div>
//     <SearchSelect setCategorySelected={setCategorySelected} />
//     <SearchByTitle />
//   </div>
// );

Search.propTypes = {
  valueFromChild: PropTypes.string.isRequired,
  // titleValue: PropTypes.string.isRequired,
  // setCategorySelected: PropTypes.func.isRequired,
};

Search.defaultProp = {
  titleValue: '',
};

export default Search;
