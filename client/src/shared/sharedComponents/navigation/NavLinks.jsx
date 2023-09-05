import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import css from './NavLinks.module.css';

const NavLinks = () => {
  // const [logged, setLogged] = useState(true);
  const logged = useSelector((state) => state.appStore.isLoggedIn);


  const logout = () => {
    // dodac funkcję do wylogowania!
    console.log('wylogowałeś się!');
  };
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
        <button onClick={logout}>WYLOGUJ</button>
      </li>
      {logged && (
        <div className={css.avatar}>
          <Link to={'/ustawienia'}>
            <img
              className={css.image}
              src={`https://images.pexels.com/photos/4095246/pexels-photo-4095246.jpeg`}
              alt=""
            />
          </Link>
        </div>
      )}
    </ul>
  );
};

export default NavLinks;
