import React, { useState } from 'react';
import Button from '../shared/sharedComponents/uiElements/Button';
import Card from '../shared/sharedComponents/uiElements/Card';
import ErrorModal from '../shared/sharedComponents/uiElements/ErrorModal';
// import Input from '../shared/sharedComponents/uiElements/Input';
import LoadingSpinner from '../shared/sharedComponents/uiElements/LoadingSpinner';
import css from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
    initialValues: {
      // firstName: '',
      password: '',
      // lastName: '',
      email: '',
    },
    validationSchema: loginValidateSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log('zalogowano!', values);
      handleReset();
    },
  });

  const clearError = () => {
    setError(null);
  };

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  console.log(errors);

  /// uzyc tutaj formik
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card login>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>LOGIN WYMAGANY</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div
              className={`${css.formControl} ${
                touched.firstName &&
                errors.firstName &&
                css['formControl-invalid']
              }  `}
            >
              <label htmlFor="firstName">Nazwa użytkownika</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={handleChange}
                value={values.firstName}
                onBlur={handleBlur}
                label="Nazwa użytkownika"
              />
              {touched.firstName && errors.firstName ? (
                <p>{errors.firstName}</p>
              ) : null}
            </div>
          )}
          {!isLoginMode && <ImageUpload center id="image" errorText="" />}
          {/* <div
            className={`${css.formControl} ${
              touched.email && errors.email && css['formControl-invalid']
            }  `}
          >
            <label htmlFor="email">E-Mail</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email ? <p>{errors.email}</p> : null}
          </div>
          <div
            className={`${css.formControl} ${
              touched.password && errors.password && css['formControl-invalid']
            }  `}
          > */}
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
          {/* {touched.email && errors.email ? <p>{errors.email}</p> : null} */}

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
          {/* {touched.password && errors.password ? (
            <p>{errors.password}</p>
          ) : null} */}

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
