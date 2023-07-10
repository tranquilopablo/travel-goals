import css from './Input.module.css';

const Input = (props) => {
  const element = props.element === 'input' ? <input /> : <textarea />;

  return (
    <div className={css.formControl}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
