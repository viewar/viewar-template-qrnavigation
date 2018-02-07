import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';

export const Container = ({ backgroundColor, children, center }) =>
  <div style={{ backgroundColor: backgroundColor || 'inherit' }} className={classNames(styles.container, {[styles.center]: center})}>{children}</div>


export default Container;