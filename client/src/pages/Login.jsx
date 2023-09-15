import React, { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  // const [error, setError] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);

  const initialValuesLogin = {
    password: '',
    email: '',
  };

  console.log(isLoginMode);

  const initialValuesRegister = {
    firstName: '',
    password: '',
    email: '',
    image: null,
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
    setFieldValue,
  } = useFormik({
    initialValues: isLoginMode ? initialValuesLogin : initialValuesRegister,
    validationSchema: isLoginMode
      ? loginValidateSchema
      : registrationValidateSchema,
    onSubmit: () => {
      authSubmitHandler(values);
      handleReset();
    },
  });

  const sendLoginRequest = useCallback(async (values) => {
    try {
      console.log(values);

      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      //  tutaj logowanie poprzez uzycie redux lub context?
      navigate(`/`);
      console.log('powinnismy isc dalej2');
    } catch (e) {}
  }, []);

  /////////////////////////////////////////////////////////

  // const sendRegistrationRequest = useCallback(async (formData) => {
  //   try {
  //     console.log(formData);

  //     const response = await fetch('http://localhost:5000/api/users/signup', {
  //       method: 'POST',
  //       // headers: {
  //       //   'Content-Type': 'application/json',
  //       // },
  //       // body: JSON.stringify({
  //       //   name: values.firstName,
  //       //   email: values.email,
  //       //   password: values.password,
  //       // }),
  //       body: formData,
  //     });
  //     const responseData = await response.json();
  //     if (!response.ok) {
  //       throw new Error(responseData.message);
  //     }
  //     switchModeHandler();
  //   } catch (error) {
  //     setError(error.message);
  //     console.log('Error sending data:', error);
  //   }
  // }, []);

  // const queryClient = useQueryClient();

  const registerFunction = async (formData) => {
    console.log(formData);
    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      switchModeHandler();
    } catch (error) {
      // setError(error.message);
      console.log('Error sending data:', error);
    }
  };

  const { data, isLoading, isError, error, mutate } = useMutation({
    mutationFn: (formData) => registerFunction(formData),
  });

  // const sendRegistrationRequest = async (formData) => {

  //   mutate(formData)

  // }

  const authSubmitHandler = async (values) => {
    if (isLoginMode) {
      sendLoginRequest(values);
      console.log('logowanie');
    } else {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('name', values.firstName);
      formData.append('password', values.password);
      formData.append('image', values.image);

      // sendRegistrationRequest(formData);
      mutate(formData);

      console.log('rejestracja');
    }
  };

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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              id="image"
              name="image"
              // value={values.image}
              onChange={(e) => setFieldValue('image', e.currentTarget.files[0])}
              errors={errors.image}
              errorText="Problem podczas ładowania zdjęcia"
              touched={touched.image}
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
