import React from 'react';
import css from './Card.module.css';

const Card = (props) => {
  return (
    <div className={`${css.card} ${props.login && css.login}`}>
      {props.children}
    </div>
  );
};

export default Card;
