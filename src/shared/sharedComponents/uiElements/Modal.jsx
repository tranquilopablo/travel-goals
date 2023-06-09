import React from 'react';
import Backdrop from './Backdrop';
import ReactDom from 'react-dom';
import css from './Modal.module.css';
import { CSSTransition } from 'react-transition-group';

const ModalOverlay = (props) => {
  const content = (
    <div className={css.modal}>
      <header className={css.modalHeader}>
        <h2>{props.header}</h2>
      </header>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className={css.modalContent}>{props.children}</div>
        <footer className={css.modalFooter}>{props.footer}</footer>
      </form>
    </div>
  );
  return ReactDom.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
