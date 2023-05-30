import React from 'react';
import Backdrop from './Backdrop';
import ReactDOM from 'react-dom';
import css from './Modal.module.css';

const ModalOverlay = (props) => {
  const content = (
    <div className={css.modal}>
      <header className={css.modalHeader}>
        <h2>{props.header}</h2>
      </header>
      <form>
        <div className={css.modalContent}>{props.children}</div>
        <footer className={css.modalFooter}>{props.footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} />
    </>
  );
};

export default Modal;
