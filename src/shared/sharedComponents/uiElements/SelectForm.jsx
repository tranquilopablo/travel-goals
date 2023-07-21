import React from 'react';
import css from './SelectForm.module.css';

const SelectForm = (props) => {
  return (
    <div className={css['select-input']}>
      <label htmlFor="selectField" className={css['select-input__label']}>
        {props.label}
      </label>
      <select
        className={css.select}
        name="selectField"
        id="selectField"
        onChange={props.onChange}
        value={props.value}
      >
        {props.options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.errors && props.touched && (
        <div className="error">{props.errors}</div>
      )}
    </div>
  );
};

export default SelectForm;
