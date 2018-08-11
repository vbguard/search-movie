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
import ModalMoreInfo from '../Modal/MoreInfoMovie';

class App extends Component {
  constructor() {
    super();

    this.state = {
      titleValue: {
        master: '',
        primary: '',
      },
      movies: [],
      selectedOption: null,
      options: [
        { value: 'popular', label: 'Popular' },
        { value: 'top_rated', label: 'Top Rated' },
        { value: 'upcoming', label: 'Upcoming' },
      ],
      error: null,
      watchlist: [],
      isLoading: false,
      showModalMoreInfo: false,
      movie: {},
      page: 1,
      totalPage: 0,
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
    // eslint-disable-next-line

    // if (titleValue.master.length !== 0) this.searchValueToPrimary();

    // if (prevState.selectedOption && selectedOption) return;

    if (!selectedOption) return;

    if (!prevState.selectedOption) {
      this.makeCategoryRequest();
      return;
    }

    const prevSelectOption = prevState.selectedOption;

    if (prevSelectOption.value !== selectedOption.value) {
      this.makeCategoryRequest();
    }
  }

  // searchValueToPrimary = () => {
  //   const { titleValue } = this.state;
  //   this.setState({
  //     titleValue: {
  //       ...titleValue,
  //       primary: titleValue.master,
  //     },
  //   });
  // };

  makeCategoryRequest = () => {
    const { page, selectedOption } = this.state;
    this.setState({ isLoading: true });

    moviedb.category({
      categorySelected: selectedOption.value,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchError,
      page,
    });
  };

  // makeCategoryRequestLM = ({ query, page }) => {
  //   this.setState({ isLoading: true }, () => {
  //     moviedb.category({
  //       categorySelected: query,
  //       onSuccess: this.handleFetchSuccess,
  //       onError: this.handleFetchError,
  //       page,
  //     });
  //   });
  // };

  handleFetchSuccess = data => {
    const { page, movies, titleValue } = this.state;

    this.setState({
      movies: page === 1 ? data.results : [...movies, ...data.results],
      isLoading: false,
      titleValue: {
        ...titleValue,
        master: '',
      },
      totalPage: data.total_pages,
    });
  };

  handleFetchError = error => this.setState({ error, isLoading: false });

  handleMoreInfo = id => {
    this.setState({ showModalMoreInfo: true }, () => {
      moviedb.movieDetail({
        id,
        onSuccess: this.handleFetchMoreInfoSuccess,
        onError: this.handleFetchMoreInfoError,
      });
    });
  };

  handleFetchMoreInfoError = error => this.setState({ error });

  handleFetchMoreInfoSuccess = moreInfo => {
    // eslint-disable-next-line
    console.log(moreInfo);
    this.setState({ movie: moreInfo });
    // console.log('in handle: ', this.state.moreInfo);
  };

  handleFetchAddToWatchlistSuccess = movie => {
    this.setState(prevState => ({
      watchlist: [movie, ...prevState.watchlist],
    }));
  };

  handleFetchAddToWatchlistError = error => this.setState({ error });

  handleOnAdd = id => {
    const { watchlist } = this.state;
    const haveId = watchlist.find(item => item.id === id);
    if (!haveId) {
      moviedb.movieDetail({
        id,
        onSuccess: this.handleFetchAddToWatchlistSuccess,
        onError: this.handleFetchAddToWatchlistError,
      });
    }
  };

  handleDeleteFromWatchlist = id => {
    this.setState(prevState => ({
      watchlist: prevState.watchlist.filter(movie => movie.id !== id),
    }));
  };

  handleCloseMoreInfo = () => {
    this.setState({ showModalMoreInfo: false });
  };

  changeOption = option => {
    this.setState({ selectedOption: option });
  };

  titleOnChange = e => {
    e.preventDefault();
    const { titleValue } = this.state;
    this.setState({
      titleValue: {
        ...titleValue,
        master: e.target.value,
      },
    });
  };

  titleOnSubmit = evt => {
    evt.preventDefault();
    const { titleValue } = this.state;
    if (titleValue.master.length === 0) return;

    this.setState(
      {
        titleValue: {
          ...titleValue,
          primary: titleValue.master,
        },
        page: 1,
        isLoading: true,
        selectedOption: null,
      },
      () => {
        moviedb.title({
          value: titleValue.master,
          onSuccess: this.handleFetchSuccess,
          onError: this.handleFetchError,
          page: 1,
        });
      },
    );
  };

  fetchLoadMore = () => {
    const { selectedOption, titleValue, page } = this.state;
    const isSearch = !selectedOption ? '/search' : '';
    const isCategory = !selectedOption ? '' : `/${selectedOption.value}`;
    const isQuery = !selectedOption ? `&query=${titleValue.primary}` : '';

    moviedb.getMore({
      isCategory,
      isSearch,
      isQuery,
      page,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchError,
    });
  };

  handleLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 }, () => {
      this.fetchLoadMore();
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
      movie,
      page,
      totalPage,
    } = this.state;

    return (
      <section className={styles.Section}>
        {showModalMoreInfo && (
          <Backdrop>
            <ModalMoreInfo movie={movie} onClose={this.handleCloseMoreInfo} />
          </Backdrop>
        )}
        <div className={styles.WatchListBox}>
          <WatchList
            watchlist={watchlist}
            onMoreInfo={this.handleMoreInfo}
            onDelete={this.handleDeleteFromWatchlist}
          />
        </div>
        <div className={styles.SearchBar}>
          <div className={styles.SearchBarBox}>
            <SearchSelect
              options={options}
              value={selectedOption}
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
          {page < totalPage && (
            <button type="button" onClick={() => this.handleLoadMore()}>
              Load More
            </button>
          )}
        </div>
      </section>
    );
  }
}

export default hot(module)(App);
