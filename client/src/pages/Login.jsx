import React, { useCallback, useState } from 'react';
import Button from '../shared/sharedComponents/uiElements/Button';
import Card from '../shared/sharedComponents/uiElements/Card';
import ErrorModal from '../shared/sharedComponents/uiElements/ErrorModal';
import LoadingSpinner from '../shared/sharedComponents/uiElements/LoadingSpinner';
import { useFormik } from 'formik';
import ImageUpload from '../shared/sharedComponents/uiElements/ImageUpload';
import {
  loginValidateSchema,
  registrationValidateSchema,
} from '../shared/util/validationSchemas';
import Input from '../shared/sharedComponents/uiElements/Input';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const initialValuesLogin = {
    password: '',
    email: '',
  };

  const initialValuesRegister = {
    firstName: '',
    password: '',
    email: '',
  };
  // fetch("http://localhost:5000/api/users/signup", {meth.....})
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
    initialValues: isLoginMode ? initialValuesLogin : initialValuesRegister,
    validationSchema: isLoginMode
      ? loginValidateSchema
      : registrationValidateSchema,
    onSubmit: () => {
      // console.log('zalogowano!', values);
      const sendRequest = async () => {
        try {
          const response = await fetch(
            'https://localhost:5000/api/users/signup',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: values.firstName,
                email: values.email,
                password: values.password,
              }),
            }
          );

          const responseData = await response.json();
          console.log(responseData);

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          console.error('Error sending data:', error.message);
        }
      };
      sendRequest();
      handleReset();
    },
  });

  // const sendRequest = useCallback(
  //   async (url, method = 'GET', body = null, headers = {}) => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(url, {
  //         method,
  //         body,
  //         headers,
  //       });
  //       const responseData = await response.json();
  //       if (!response.ok) {
  //         throw new Error(responseData.message);
  //       }
  //       setIsLoading(false);
  //       return responseData;
  //     } catch (err) {
  //       setError(err.message);
  //       setIsLoading(false);
  //       throw err;
  //     }
  //   },

  //     setError(null)

  // , []);

  const clearError = () => {
    setError(null);
  };

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card login>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>LOGIN WYMAGANY</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
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
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              errorText=""
              // value={values.image}   // pozniej przerobic imageupload pod formik
              // onChange={handleChange}
            />
          )}
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
            {isLoginMode ? 'ZALOGUJ' : 'REJESTRACJA'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          PRZEJDŻ DO {isLoginMode ? 'REJESTRACJI' : 'LOGOWANIA'}
        </Button>
      </Card>
    </>
  );
};

export default Login;
