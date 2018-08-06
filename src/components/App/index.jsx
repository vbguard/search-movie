import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
// import PropTypes from 'prop-types';
// import Loader from 'react-loader-spinner';
import styles from './styles.css';
import Search from '../Search';

class App extends Component {
  state = {
    searchTitleValue: '',
    // movie: [],
    // isActiveWatchlist: false,
    // isLoading: false,
  };

  render() {
    const { searchTitleValue } = this.state;

    return (
      <div className={styles.AppHeader}>
        <header className="App-header">
          <h1 className="App-title">lcome to React </h1>{' '}
        </header>{' '}
        <Search searchValue={searchTitleValue} />
      </div>
    );
  }
}

export default hot(module)(App);
