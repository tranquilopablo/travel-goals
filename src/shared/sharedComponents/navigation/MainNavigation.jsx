// import React from 'react'
import css from './MainNavigation.module.css';

import MainHeader from './MainHeader';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';

export default function MainNavigation() {
  return (
    <MainHeader>
      <h1 className={css.title}>
        <Link to="/">travelGoals</Link>
      </h1>
      <nav className={css.headerNav}>
          <NavLinks />
        </nav>
    </MainHeader>
  );
}
