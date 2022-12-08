import * as yup from 'yup';

const validator = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const chanelValidator = yup.object().shape({
  name: yup.string().required().min(3).max(20),
});

export default validator;
