import React from 'react';
import css from './SideDrawer.module.css';

const SideDrawer = (props) => {
  return (
    <aside className={css.SideDrawer} onClick={props.onClick}>
      {props.children}
    </aside>
  );
};

export default SideDrawer;
