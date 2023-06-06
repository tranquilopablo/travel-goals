import React from 'react';
import css from './UsersList.module.css';

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={` center  ${css.card} `}>
        <h2>Nie znaleziono użytkowników</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <li>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersList;
