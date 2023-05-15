import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './NavLinks.module.css';

const NavLinks = () => {
  return (
    <ul className={css.navLinks}>
      <li>
        <NavLink to="/">UŻYTKOWNICY</NavLink>
      </li>

      <li>
        <NavLink to={`/:222/miejsca`}>MOJE MIEJSCA</NavLink>
      </li>

      <li>
        <NavLink to="/miejsca/nowe">DODAJ MIEJSCE</NavLink>
      </li>

      <li>
        <NavLink to="/login">ZALOGUJ</NavLink>
      </li>

      <li>
        <button >WYLOGUJ</button>
      </li>
    </ul>
  );
};

export default NavLinks;
