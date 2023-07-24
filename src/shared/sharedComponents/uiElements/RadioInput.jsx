import React from 'react';
import css from './RadioInput.module.css';

const RadioInput = (props) => {
  return (
    <div className={css['radio-input']}>
      <h4>{props.label}</h4>
      {props.options.map((option) => (
        <div key={option.value}>
          <input
            id={`radio-${option.value}`}
            type="radio"
            name="radioField"
            value={option.value}
            onChange={props.onChange}
            checked={props.value === option.value}
          />
          <label htmlFor={`radio-${option.value}`}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioInput;
