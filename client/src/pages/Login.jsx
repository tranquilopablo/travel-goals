import React, { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { loginRequest, registerRequest } from '../shared/hooks/http';
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
  const [hasError, setHasError] = useState(false);

  const initialValuesLogin = {
    password: '',
    email: '',
  };

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

  const { isLoading, error, mutate } = useMutation({
    mutationFn: isLoginMode
      ? ({ signal }, data) => loginRequest({ signal }, data)
      : ({ signal }) => registerRequest({ signal }, data),
    // mutationFn: isLoginMode
    //   ? ( data) => loginRequest(data)
    //   : (data) => registerRequest(data),
    // mutationFn: (data) => loginRequest(data),
    // mutationFn: (data) => registerRequest(data),

    onSuccess: () => {
      isLoginMode ? navigate(`/`) : switchModeHandler();
    },
    onError: (error) => setHasError(error.message),
  });

  const authSubmitHandler = async (values) => {
    if (isLoginMode) {
      mutate(values);
      console.log('logowanie');
    } else {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('name', values.firstName);
      formData.append('password', values.password);
      formData.append('image', values.image);

      mutate(formData);

      console.log('rejestracja');
    }
  };

  const clearError = () => {
    setHasError(null);
  };

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <>
      <ErrorModal error={hasError} onClear={clearError} />
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
