import React from 'react';
import classNames from 'classnames';

import styles from './sidebar.css';

const Sidebar = ({ style, children, right }) =>
    <div style={style} className={classNames(styles.sidebar, {[styles.right] : right})}>
      { children }
    </div>

export default Sidebar;
