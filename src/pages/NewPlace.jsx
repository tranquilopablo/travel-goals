import React, { useEffect, useState } from 'react';
import Button from '../shared/sharedComponents/uiElements/Button';
import ErrorModal from '../shared/sharedComponents/uiElements/ErrorModal';
import LoadingSpinner from '../shared/sharedComponents/uiElements/LoadingSpinner';
import { useFormik } from 'formik';
import ImageUpload from '../shared/sharedComponents/uiElements/ImageUpload';
import { newPlaceValidateSchema } from '../shared/util/validationSchemas';
import Input from '../shared/sharedComponents/uiElements/Input';
import Modal from '../shared/sharedComponents/uiElements/Modal';
import css from './NewPlace.module.css';

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

  //    ponizej dla radioinput i select

  // const validationSchema = Yup.object().shape({
  //   selectField: Yup.string().required('Select field is required'),
  //   radioField: Yup.string().required('Please select one of the options'),
  // });

  // const initialValues = {
  //   selectField: '',
  //   radioField: '',
  // };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className={css.placeForm} onSubmit={handleSubmit}>
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

        <div>
          <label htmlFor="selectField">Ważność projektu w skali od 1-5</label>
          <select
            name="selectField"
            id="selectField"
            onChange={handleChange}
            value={values.selectField}
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          {errors.selectField && touched.selectField && (
            <div className="error">{errors.selectField}</div>
          )}
        </div>

        <div>
          <h4>Status:</h4>
          <div>
            <label>
              <input
                type="radio"
                name="radioField"
                value="optionA"
                checked={values.radioField === 'optionA'}
                onChange={handleChange}
              />
              Publiczny
            </label>
            <label>
              <input
                type="radio"
                name="radioField"
                value="optionB"
                checked={values.radioField === 'optionB'}
                onChange={handleChange}
              />
              Prywatny
            </label>
            {errors.radioField && touched.radioField && (
              <div className="error">{errors.radioField}</div>
            )}
          </div>
        </div>

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
