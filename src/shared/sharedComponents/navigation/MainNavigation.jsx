import { useState } from 'react';
import css from './MainNavigation.module.css';

import MainHeader from './MainHeader';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';

const MainNavigation = () => {
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);

  const openSideMenu = () => {
    setSideMenuIsOpen(true);
  };
  const closeSideMenu = () => {
    setSideMenuIsOpen(false);
  };

  return (
    <>
      {sideMenuIsOpen && (
        <nav className={css.sideMenuNav}>
          <NavLinks />
        </nav>
      )}
      <MainHeader>
        <button className={css.menuBtn} onClick={openSideMenu}>
          <i
            className={`fa fa-bars ${css.sideMenuIcon}`}
            aria-hidden="true"
          ></i>
        </button>
        <h1 className={css.title}>
          <Link to="/">travelGoals</Link>
        </h1>
        <nav className={css.headerNav}>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
