import React, { useRef, useState, useEffect } from 'react';
import css from './ImageUpload.module.css';
import Button from './Button';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(
    props.initialValue && props.initialValue
  );

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    console.log(event.target.files[0]);

    const pickedFile = event.target.files[0];
    setFile(pickedFile);
    props.onChange(event);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={css['form-control']}>
      <input
        name="image"
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        onChange={pickedHandler}
      />
      <div className={css['image-upload-center']}>
        <div className={css['image-upload__preview']}>
          {previewUrl && <img src={previewUrl} alt="Podgląd" />}
          {!previewUrl && <p>Proszę wybierz zdjęcie.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          WYBIERZ ZDJĘCIE
        </Button>
      </div>
      {props.touched && props.errors ? <p>{props.errorText}</p> : null}
    </div>
  );
};

export default ImageUpload;
