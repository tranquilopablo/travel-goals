import React, { useEffect, useState } from 'react';
import Button from '../shared/sharedComponents/uiElements/Button';
import Card from '../shared/sharedComponents/uiElements/Card';
import ErrorModal from '../shared/sharedComponents/uiElements/ErrorModal';
import LoadingSpinner from '../shared/sharedComponents/uiElements/LoadingSpinner';
import { useFormik } from 'formik';
import ImageUpload from '../shared/sharedComponents/uiElements/ImageUpload';
import { newPlaceValidateSchema } from '../shared/util/validationSchemas';
import Input from '../shared/sharedComponents/uiElements/Input';
import Modal from '../shared/sharedComponents/uiElements/Modal';

export default function NewPlace() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loadedUser, setLoadedUser] = useState();

  const newPlaceImg =
    'https://t3.gstatic.com/images?q=tbn:ANd9GcTsYfPmGJlhdYYoimizj9KjzYltxPMxmA3fOq7VYtpCUFdwFR8W';

  const initialValuesNewPlace = {
    title: '',
    description: '',
    address: '',
  };

  const clearError = () => {
    setError(null);
  };

  const newPlaceHandler = () => {
    console.log('Utworzono Nowe miejsceeee!');
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
    onSubmit: (values) => {
      newPlaceHandler();
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
      <form onSubmit={handleSubmit}>
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
