import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const Backdrop = ({ children }) => {
  console.log(children);
  return <div className={styles.backdrop}>{children}</div>;
};

Backdrop.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Backdrop;
