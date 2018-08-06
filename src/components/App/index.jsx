import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import * as moviedb from '../../services/api';
// import PropTypes from 'prop-types';
// import Loader from 'react-loader-spinner';
import styles from './styles.css';
import Search from '../Search';
import MovieList from '../Movie';

class App extends Component {
  state = {
    categorySelected: '',
    titleValue: '',
    movies: [],
    // watchlist: [],
    // isActiveWatchlist: false,
    // isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    // eslint-disable-next-line
    console.log('prevProps: ', prevProps);
    // eslint-disable-next-line
    console.log('prevState: ', prevState);
  }

  fetchMovie = ({ category, onSuccess, onError, page }) => {
    moviedb.category({ category, onSuccess, onError, page });
  };

  render() {
    const { titleValue, categorySelected, movies } = this.state;

    return (
      <section className={styles.Section}>
        <Search searchValue={(titleValue, categorySelected)} />
        <MovieList movies={movies} />
      </section>
    );
  }
}

export default hot(module)(App);
