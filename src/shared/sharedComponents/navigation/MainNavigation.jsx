import { useState } from 'react';
import css from './MainNavigation.module.css';

import MainHeader from './MainHeader';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import Backdrop from '../uiElements/Backdrop';
import SideDrawer from '../uiElements/SideDrawer';

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
      {sideMenuIsOpen && <Backdrop />}
      <SideDrawer show={sideMenuIsOpen} onClick={closeSideMenu}>
        <nav className={css.sideMenuNav}>
          <NavLinks />
        </nav>
      </SideDrawer>
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
