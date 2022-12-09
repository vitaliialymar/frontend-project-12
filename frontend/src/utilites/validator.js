import * as yup from 'yup';

const validator = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const signupValidator = yup.object().shape({
  username: yup.string().required('Обязательное поле').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов'),
  password: yup.string().required('Обязательное поле').min(6, 'Не менее 6 символов'),
  confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export default validator;
