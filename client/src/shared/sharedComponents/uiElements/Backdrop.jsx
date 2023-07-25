import css from './Backdrop.module.css';
import ReactDOM from 'react-dom';


const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
