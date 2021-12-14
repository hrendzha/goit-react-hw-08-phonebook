import * as yup from 'yup';

export const signUpFormSchema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required('Name is a required field')
      .min(2, 'Name must be at least 2 characters'),
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is a required field'),
    password: yup
      .string()
      .trim()
      .required('Password is a required field')
      .min(7, 'Password must be at least 7 characters'),
  })
  .required();

export const signInFormSchema = yup
  .object({
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is a required field'),
    password: yup.string().trim().required('Password is a required field'),
  })
  .required();

export const addContactFormSchema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required('Name is a required field')
      .min(2, 'Name must be at least 2 characters'),
    number: yup.string().required('Number is a required field'),
  })
  .required();
