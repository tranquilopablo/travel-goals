import React from 'react';
import css from './UsersList.module.css';

const UsersList = (props) => {
  return (
    <ul className={css.usersList}>
      {props.items.map((user, id) => (
        <p key={id} onClick={() => props.onClick(true)}>
          uzytkownik
        </p>
      ))}
    </ul>
  );
};

export default UsersList;
