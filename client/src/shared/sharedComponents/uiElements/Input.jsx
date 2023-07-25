import css from './Input.module.css';

const Input = (props) => {
  const {
    name,
    type,
    value,
    onChange,
    onBlur,
    label,
    touched,
    errors,
    id,
    placeholder,
    rows,
  } = props;

  const element =
    props.element === 'input' ? (
      <input
        id={id}
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        value={value || ''}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    );

  return (
    <div
      className={`${css.formControl} ${
        touched && errors && css['formControl-invalid']
      }  `}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {touched && errors ? <p>{errors}</p> : null}
    </div>
  );
};

export default Input;
