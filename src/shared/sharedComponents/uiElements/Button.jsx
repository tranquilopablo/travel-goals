import React from 'react';
import { Link } from 'react-router-dom';
import css from './Button.module.css';

const Button = (props) => {
  if (props.to) {
    return (
      <Link className={css.button} to={props.to}>
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={css.button}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
