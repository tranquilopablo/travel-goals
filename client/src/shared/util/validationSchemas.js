import * as Yup from 'yup';

const firstNameSchema = Yup.string()
  .min(6, 'Minimum 6 znaków')
  .required('Wymagane');

const passwordSchema = Yup.string()
  .min(6, 'Podaj hasło zawierające co najmniej 6 znaków.')
  .required('Wymagane')
  .matches(/[0-9]/, 'Co najmniej jedna cyfra');

const emailSchema = Yup.string()
  .email('Podaj poprawny adres email')
  .required('Wymagane');

const imageSchema = Yup.mixed()
  .required('Zamieść zdjęcie')


const titleSchema = Yup.string().required('Podaj nazwę miejsca.');

const descriptionSchema = Yup.string()
  .min(6, 'Co najmniej 5 znaków')
  .required('Podaj opis miejsca.');

const addressSchema = Yup.string().required('Podaj adres miejsca.');

export const loginValidateSchema = Yup.object().shape({
  password: passwordSchema,
  email: emailSchema,
});

export const registrationValidateSchema = Yup.object().shape({
  firstName: firstNameSchema,
  password: passwordSchema,
  email: emailSchema,
  image: imageSchema,
});
export const newPlaceValidateSchema = Yup.object().shape({
  title: titleSchema,
  description: descriptionSchema,
  address: addressSchema,
});
