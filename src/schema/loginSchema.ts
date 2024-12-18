import * as yup from 'yup';

const passwordRule = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email('please enter valid Email').required('Required'),
  password: yup
    .string()
    .min(8, 'Password invalid')
    // .matches(passwordRule, { message: 'Password invalid' })
    .required('Required'),
});
