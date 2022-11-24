import * as yup from 'yup';

const validator = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default validator;
