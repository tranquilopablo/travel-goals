import React, { useRef, useState, useEffect } from 'react';
import css from './ImageUpload.module.css';
import Button from './Button';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  // 'https://images.pexels.com/photos/4095246/pexels-photo-4095246.jpeg';
  const [isValid, setIsValid] = useState(false);

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
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={css['form-control']}>
      <input
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
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
    </div>
  );
};

export default ImageUpload;
