import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../shared/sharedComponents/uiElements/Button';
import ErrorModal from '../shared/sharedComponents/uiElements/ErrorModal';
import LoadingSpinner from '../shared/sharedComponents/uiElements/LoadingSpinner';
import { useFormik } from 'formik';
import ImageUpload from '../shared/sharedComponents/uiElements/ImageUpload';
import { newPlaceValidateSchema } from '../shared/util/validationSchemas';
import Input from '../shared/sharedComponents/uiElements/Input';
import css from './NewPlace.module.css';
import SelectForm from '../shared/sharedComponents/uiElements/SelectForm';
import RadioInput from '../shared/sharedComponents/uiElements/RadioInput';

export default function NewPlace() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const newPlaceImg =
    'https://t3.gstatic.com/images?q=tbn:ANd9GcTsYfPmGJlhdYYoimizj9KjzYltxPMxmA3fOq7VYtpCUFdwFR8W';

  const initialValuesNewPlace = {
    title: '',
    description: '',
    address: '',
    selectField: '1',
    radioField: '1',
    image: null,
  };

  const clearError = () => {
    setError(null);
  };


  const  sendNewPlaceRequest = useCallback(async (values) => {
    try {
      console.log(values);

      const response = await fetch(
        'http://localhost:5000/api/places',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      
      navigate(`/`);
      console.log('utworzono nowe miejsce');
    } catch (e) {}
  }, []);



  const newPlaceHandler =  async (values) => {
  //////////////////////////////////
  ///////////////////////////////////   tutaj dac wlascuiwe dane do formData!!!!!!!!!!!!!!!!
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('name', values.firstName);
      formData.append('password', values.password);
      formData.append('image', values.image);
      console.log(values);
      console.log(formData);
      sendNewPlaceRequest(formData);

      console.log('Nowe miejsce');
    
  };


  const {
    values,
    errors,
    touched,
    isValid,
    dirty,
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
  } = useFormik({
    initialValues: initialValuesNewPlace,
    validationSchema: newPlaceValidateSchema,
    onSubmit: () => {
      newPlaceHandler(values);
      console.log('Utworzono Nowe miejsce!', values);
      handleReset();
    },
  });

  const handleGoBack = () => {
    console.log('przeniesiono na głowną stronę!');
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className={css.placeForm} onSubmit={handleSubmit}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          element="input"
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
          label="Nazwa"
          touched={touched.title}
          errors={errors.title}
        />
        <Input
          element="textarea"
          id="description"
          name="description"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          label="Opis"
          touched={touched.description}
          errors={errors.description}
        />

        <Input
          element="input"
          id="address"
          name="address"
          type="text"
          onChange={handleChange}
          value={values.address}
          onBlur={handleBlur}
          label="Adres"
          touched={touched.address}
          errors={errors.address}
        />
        <SelectForm
          label="Ważność projektu w skali od 1-5"
          value={values.selectField}
          onChange={handleChange}
          options={[
            { value: '1', label: 1 },
            { value: '2', label: 2 },
            { value: '3', label: 3 },
            { value: '4', label: 4 },
            { value: '5', label: 5 },
          ]}
          touched={touched.selectField}
          errors={errors.selectField}
        />
        <RadioInput
          label="Status:"
          onChange={handleChange}
          value={values.radioField}
          options={[
            { value: '1', label: 'Publiczny' },
            { value: '0', label: 'Prywatny' },
          ]}
        />
        <ImageUpload
          center
          id="image"
          errorText=""
          initialValue={newPlaceImg}
          // value={values.image}   // pozniej przerobic imageupload pod formik
          // onChange={handleChange}
        />
        <Button margin type="submit" disabled={!(isValid && dirty)}>
          DODAJ MIEJSCE
        </Button>
        <Button onClick={handleGoBack} inverse>
          WRÓĆ
        </Button>
      </form>
    </React.Fragment>
  );
}
