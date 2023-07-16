import css from './Input.module.css';

const Input = (props) => {
  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        name={props.name}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={props.value}
      />
    );

  return (
    <div
      className={`${css.formControl} ${
        props.touched && props.errors && css['formControl-invalid']
      }  `}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {props.touched && props.errors ? <p>{props.errors}</p> : null}
    </div>
  );
};

export default Input;


