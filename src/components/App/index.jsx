import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Loader from 'react-loader-spinner';
// import InfiniteScroller from 'react-infinite-scroller';
// import InfiniteScroll from 'react-infinite-scroll-component';
import * as moviedb from '../../services/api';
import styles from './styles.css';
// import Search from '../Search';
import SearchSelect from '../Search/Search-select';
import SearchTitle from '../Search/Search-title';
import MovieList from '../Movie';
import Backdrop from '../Backdrop';
import WatchList from '../Watch';

class App extends Component {
  constructor() {
    super();

    this.state = {
      // eslint-disable-next-line
      // category: '',
      titleValue: '',
      movies: [],
      selectedOption: null,
      options: [
        { value: 'popular', label: 'Popular' },
        { value: 'top_rated', label: 'Top Rated' },
        { value: 'upcoming', label: 'Upcoming' },
      ],
      error: null,
      watchlist: [],
      // isActiveWatchlist: false,
      isLoading: false,
      showModalMoreInfo: false,
      // hasMoreMovies: true,
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // const { selectedOption } = this.state;
  //   // const nextSelectedOption = nextState.selectedOption.value;
  //   // // eslint-disable-next-line
  //   // if (!this.state.selectedOption) {
  //   //   console.log('Its Work');
  //   //   return true;
  //   // }

  //   // const shouldUpdate = selectedOption.value === nextSelectedOption.value;
  //   // return shouldUpdate;
  //   // eslint-disable-next-line
  //   if (!this.state.selectedOption) return true;
  //   // eslint-disable-next-line
  //   const prevCategory = this.state.selectedOption.value;
  //   const nextCategory = nextState.selectedOption.value;

  //   const shouldUpdate = prevCategory !== nextCategory;

  //   return shouldUpdate;
  // }

  componentDidUpdate(prevProps, prevState) {
    const { selectedOption } = this.state;

    if (!prevState.selectedOption && !selectedOption) {
      return;
    }

    if (!prevState.selectedOption) {
      this.activeLoader();
      const categorySelect = selectedOption.value;
      moviedb.category({
        categorySelected: categorySelect,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
        page: 1,
      });

      return;
    }

    const prevSelectOption = prevState.selectedOption;

    if (prevSelectOption.value !== selectedOption.value) {
      this.activeLoader();
      const categorySelect = selectedOption.value;
      moviedb.category({
        categorySelected: categorySelect,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
        page: 1,
      });
    }
  }

  handleFetchSuccess = movies => this.setState({ movies, isLoading: false });

  handleFetchError = error => this.setState({ error, isLoading: false });

  handleMoreInfo = id => {
    // evt.preventDefault();
    // console.log('MoreInfo Pushed: ', evt);
    console.log(id);
    moviedb.movieDetail({
      id,
      onSuccess: this.handleFetchMoreInfoSuccess,
      onError: this.handleFetchMoreInfoError,
    });
  };

  handleFetchMoreInfoError = error =>
    this.setState({ error, showModalMoreInfo: false });

  handleFetchMoreInfoSuccess = movies =>
    this.setState({ movies, showModalMoreInfo: false });

  handleOnAdd = movie => {
    console.log(movie);
    // console.log('Add movie: ', movie);
  };

  activeLoader = () => this.setState({ isLoading: true });

  // activeHasLoadMovie = () => this.setState({ hasMoreMovies: true });

  changeOption = option => {
    this.setState({ selectedOption: option });
  };

  titleOnChange = e => {
    e.preventDefault();
    this.setState({ titleValue: e.target.value });
  };

  titleOnSubmit = evt => {
    evt.preventDefault();
    const { titleValue } = this.state;
    this.activeLoader();
    moviedb.title({
      value: titleValue,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchError,
      page: 1,
    });
  };

  fetchData = prop => {
    console.log('Infitine Call Fetch', prop);
    moviedb.title({
      value: 'Zub',
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchError,
      page: 1,
    });
  };

  render() {
    const {
      movies,
      options,
      selectedOption,
      error,
      isLoading,
      titleValue,
      watchlist,
      showModalMoreInfo,
    } = this.state;

    console.log(`App Rende - ${Date.now()}`);
    return (
      <section className={styles.Section}>
        <div className={styles.WatchListBox}>
          <WatchList watchlist={watchlist} />
        </div>
        <div className={styles.SearchBar}>
          <div className={styles.SearchBarBox}>
            <SearchSelect
              options={options}
              selectedOption={selectedOption}
              onChange={this.changeOption}
            />
            <SearchTitle
              titleValue={titleValue}
              onChange={this.titleOnChange}
              onSubmit={this.titleOnSubmit}
            />
          </div>
        </div>

        <div className={styles.Movies}>
          {isLoading && (
            <Backdrop>
              <Loader type="Grid" color="#" height="100" width="100" />
            </Backdrop>
          )}
          {error && <h2 className={styles.error}>{error.message}</h2>}
          {movies.length > 0 && (
            <MovieList
              movies={movies}
              onAdd={this.handleOnAdd}
              onMoreInfo={this.handleMoreInfo}
            />
          )}
          {/* <MovieList movies={movies} /> */}
        </div>
      </section>
    );
  }
}

export default hot(module)(App);
