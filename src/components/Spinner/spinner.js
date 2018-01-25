import React from 'react';
import styles from './spinner.css';
import classNames from 'classnames';

const Spinner = ({ show }) =>
    <div className={classNames(styles.container, {[styles.hidden] : !show})}>
      <div className={styles.spinner}></div>
    </div>

export default Spinner;
