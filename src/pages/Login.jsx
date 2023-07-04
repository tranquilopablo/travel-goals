import React, { useState } from 'react';
import Button from '../shared/sharedComponents/uiElements/Button';
import Card from '../shared/sharedComponents/uiElements/Card';
import ErrorModal from '../shared/sharedComponents/uiElements/ErrorModal';
// import Input from '../shared/sharedComponents/uiElements/Input';
import LoadingSpinner from '../shared/sharedComponents/uiElements/LoadingSpinner';
import css from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateSchema = Yup.object().shape({
    // firstName: Yup.string().min(2, 'Minimum 2 znaki').required('Wymagane'),
    password: Yup.string()
      .min(6, 'Podaj hasło zawierające co najmniej 6 znaków.')
      .required('Wymagane').matches(/[0-9]/, "Co najmniej jedna cyfra"),
    // lastName: Yup.string().min(2, 'Minimum 2 znaki').required('Wymagane'),
    email: Yup.string()
      .email('Podaj poprawny adres email')
      .required('Wymagane'),
  });

  const formik = useFormik({
    initialValues: {
      // firstName: '',
      password: '',
      // lastName: '',
      email: '',
    },
    validationSchema: validateSchema,
    onSubmit: (values, actions) => {
      // alert(JSON.stringify(values, null, 2));
      console.log('zalogowano!', values);
      actions.resetForm()
    },
  });

  const clearError = () => {
    setError(null);
  };

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  /// uzyc tutaj formik
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card login>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>LOGIN WYMAGANY</h2>
        <hr />
        <form onSubmit={formik.handleSubmit}  >
          <label htmlFor="email">E-Mail</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p>{formik.errors.email}</p>
          ) : null}
          {/* <label htmlFor="firstName">Nazwa użytkownika</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <p>{formik.errors.firstName}</p>
          ) : null} */}
          <label htmlFor="password">Hasło</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p>{formik.errors.password}</p>
          ) : null}
          {/* <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <p>{formik.errors.lastName}</p>
          ) : null} */}

          <button type="submit">
            {isLoginMode ? 'ZALOGUJ' : 'REJESTRACJA'}
          </button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          PRZEJDŻ DO {isLoginMode ? 'REJESTRACJI' : 'LOGOWANIA'}
        </Button>
      </Card>
    </>
  );
};

export default Login;
