import React, { useRef, useState, useEffect } from 'react';
import css from './ImageUpload.module.css';
import Button from './Button';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(
    props.initialValue && props.initialValue
  );
  // const [isValid, setIsValid] = useState(false);

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
    // let pickedFile;
    // let fileIsValid = isValid;
    console.log(event.target.files[0]);

    // if (event.target.files && event.target.files.length === 1) {
    //   pickedFile = event.target.files[0];
    //   setFile(pickedFile);
    //   setIsValid(true);
    //   fileIsValid = true;
    // } else {
    //   setIsValid(false);
    //   fileIsValid = false;
    // }
    // props.onChange(props.id, pickedFile, fileIsValid);
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
        // accept=".jpg,.png,.jpeg"
        accept="image/*"
        onChange={pickedHandler}
        // value={props.value}
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
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
