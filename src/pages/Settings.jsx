import React, { useEffect, useState } from 'react';
import Button from '../shared/sharedComponents/uiElements/Button';
import Card from '../shared/sharedComponents/uiElements/Card';
import ErrorModal from '../shared/sharedComponents/uiElements/ErrorModal';
import LoadingSpinner from '../shared/sharedComponents/uiElements/LoadingSpinner';
import { useFormik } from 'formik';
import ImageUpload from '../shared/sharedComponents/uiElements/ImageUpload';
import { registrationValidateSchema } from '../shared/util/validationSchemas';
import Input from '../shared/sharedComponents/uiElements/Input';

const Settings = () => {
  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loadedUser, setLoadedUser] = useState();

  const userImage = `https://images.pexels.com/photos/4095246/pexels-photo-4095246.jpeg`;

  const initialValuesUpdateProfil = {
    firstName: '',
    password: '',
    email: '',
  };

  useEffect(() => {
    setLoadedUser(true);
  }, []);

  const updateAccountHandler = () => {
    console.log('Uaktualniono dane!');
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
    initialValues: initialValuesUpdateProfil,
    validationSchema: registrationValidateSchema,
    onSubmit: (values) => {
      updateAccountHandler();
      console.log('zalogowano!', values);
      handleReset();
    },
  });

  const clearError = () => {
    setError(null);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUser && (
        <Card login>
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>EDYTUJ KONTO</h2>
          <hr />
          <form onSubmit={handleSubmit}>
            <Input
              element="input"
              id="firstName"
              name="firstName"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              label="Nazwa użytkownika"
              touched={touched.firstName}
              errors={errors.firstName}
            />
            <ImageUpload
              center
              id="image"
              errorText=""
              initialValue={userImage}
              // value={values.image}   // pozniej przerobic imageupload pod formik
              // onChange={handleChange}
            />
            <Input
              element="input"
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              label="E-Mail"
              touched={touched.email}
              errors={errors.email}
            />

            <Input
              element="input"
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              label="Hasło"
              touched={touched.password}
              errors={errors.password}
            />
            <Button type="submit" disabled={!(isValid && dirty)}>
              POTWIERDŹ
            </Button>
          </form>
          <Button inverse onClick={showDeleteWarningHandler}>
            USUŃ
          </Button>
        </Card>
      )}
    </>
  );
};

export default Settings;
