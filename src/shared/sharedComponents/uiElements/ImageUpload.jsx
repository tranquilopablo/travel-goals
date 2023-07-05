import React, { useRef, useState, useEffect } from 'react';
import css from './ImageUpload.module.css';
import Button from './Button';

const ImageUpload = (props) => {
  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={css['form-control']}>
      <input ref={filePickerRef} style={{ display: 'none' }} />
      <Button type="button" onClick={pickImageHandler}>
        WYBIERZ ZDJĘCIE
      </Button>
    </div>
  );
};

export default ImageUpload;
