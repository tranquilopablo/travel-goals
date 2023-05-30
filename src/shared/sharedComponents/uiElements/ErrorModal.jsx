import React from 'react';
import Modal from './Modal';

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Coś poszło nie tak!"
      show={!!props.error}
      footer={<button onClick={props.onClear}>Okej</button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
