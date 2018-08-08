import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Loader from 'react-loader-spinner';
import InfiniteScroller from 'react-infinite-scroller';
import * as moviedb from '../../services/api';
import styles from './styles.css';
// import Search from '../Search';
import SearchSelect from '../Search/Search-select';
import SearchTitle from '../Search/Search-title';
import MovieList from '../Movie';

class App extends Component {
  constructor() {
    super();

    this.state = {
      // eslint-disable-next-line
      category: '',
      titleValue: '',
      movies: [],
      selectedOption: null,
      options: [
        { value: 'popular', label: 'Popular' },
        { value: 'top_rated', label: 'Top Rated' },
        { value: 'upcoming', label: 'Upcoming' },
      ],
      error: null,
      // watchlist: [],
      // isActiveWatchlist: false,
      isLoading: false,
      hasMoreMovies: false,
    };
  }

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
      this.activeHasLoadMovie();
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

  handleFetchError = error => this.setState({ error });

  activeLoader = () => this.setState({ isLoading: true });

  activeHasLoadMovie = () => this.setState({ hasMoreMovies: true });

  changeOption = option => {
    this.setState({ selectedOption: option });
  };

  titleOnChange = e => {
    e.preventDefault();
    this.setState({ titleValue: e.target.value });
    // if (e.target.value.length > 0) {
    //   this.setState({ selectedOption: null });
    // }

    moviedb.title({
      value: e.target.value,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchError,
      page: 1,
    });
  };

  loadMovies = page => {
    const { titleValue, selectedOption } = this.state;
    // this.setState({ hasMoreMovies: false });
    if (!titleValue) {
      console.log('');
    }
    console.log(page);
    moviedb.getMore({
      value: titleValue,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchError,
      pages: page,
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
      hasMoreMovies,
    } = this.state;

    return (
      <section className={styles.Section}>
        <div className={styles.SearchBar}>
          <SearchSelect
            options={options}
            selectedOption={selectedOption}
            onChange={this.changeOption}
          />
          <SearchTitle titleValue={titleValue} onChange={this.titleOnChange} />
        </div>

        <div className={styles.Movies}>
          {isLoading && (
            <Loader type="Puff" color="#00BFFF" height="100" width="100" />
          )}
          {error && <h2 className={styles.error}>{error.message}</h2>}
          {movies.length > 0 && (
            <InfiniteScroller
              pageStart={1}
              loadMore={this.loadMovies}
              hasMore={hasMoreMovies}
              loader={
                <Loader type="Puff" color="#00BFFF" height="100" width="100" />
              }
            >
              <MovieList movies={movies} />
            </InfiniteScroller>
          )}
        </div>
      </section>
    );
  }
}

export default hot(module)(App);
