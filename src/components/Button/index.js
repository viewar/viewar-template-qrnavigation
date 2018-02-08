import React from 'react';
import styles from './styles.css';

import classNames from 'classnames';

export const Button = ({ disabled, className, big, small, round,upperRight, bottomLeft, children, onClick }) =>
  <div onClick={(e) => !disabled && onClick(e)} className={classNames(
    styles.button,
    className,
    disabled && styles.disabled,
    big && styles.big,
    small && styles.small,
    round && styles.round,
    upperRight && styles.upperRight,
    bottomLeft && styles.bottomLeft,

  )}>{children}</div>

export default Button;


