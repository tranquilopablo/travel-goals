import React from 'react';
import { Link } from 'react-router-dom';
import css from './Button.module.css';

const Button = (props) => {
  if (props.to) {
    return (
      <Link
        className={`${css.button} ${props.inverse && css.buttonInverse} ${
          props.danger && css.buttonDanger
        } `}
        to={props.to}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${css.button} ${props.inverse && css.buttonInverse} ${
        props.danger && css.buttonDanger
  } ${props.margin && css['btn-margin']}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
