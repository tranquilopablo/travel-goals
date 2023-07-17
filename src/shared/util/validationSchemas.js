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

export const loginValidateSchema = Yup.object().shape({
  password: passwordSchema,
  email: emailSchema,
});

export const registrationValidateSchema = Yup.object().shape({
  firstName: firstNameSchema,
  password: passwordSchema,
  email: emailSchema,
});


