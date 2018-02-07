import React from 'react';
import styles from './styles.css';

import classNames from 'classnames';

export const Button = ({ big, small, round,upperRight, bottomLeft, children, onClick }) =>
  <div onClick={onClick} className={classNames(
    styles.button,
    big && styles.big,
    small && styles.small,
    round && styles.round,
    upperRight && styles.upperRight,
    bottomLeft && styles.bottomLeft,

  )}>{children}</div>

export default Button;


