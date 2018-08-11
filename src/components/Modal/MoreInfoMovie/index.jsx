import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import imageUrl from '../../../services/tmdb-image';

const ModalMoreInfo = ({ movie, onClose }) => (
  <div className={styles.wrapper}>
    <div className={styles.box}>
      <img
        src={imageUrl(movie.poster_path)}
        alt={movie.tagline}
        className={styles.image}
      />
      <h2 className={styles.title}>{movie.title}</h2>
      <div className={styles.genresWrap}>
        <h4 className={styles.genresListTitle}>Genres: </h4>
        {movie.genres.length > 0 && (
          <ul className={styles.genresList}>
            {movie.genres.map(item => (
              <li className={styles.genresItem} key={item.id}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className={styles.genresOverview}>{movie.overview}</p>
      <button
        type="button"
        onClick={onClose}
        onKey={onClose}
        className={styles.closeBtn}
      />
    </div>
  </div>
);

ModalMoreInfo.propTypes = {
  onClose: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ModalMoreInfo;

// const {
//   genres,
//   title,
//   posterPath: poster_path,
//   tagline,
//   overview,
//   onClose,
// } = props;
