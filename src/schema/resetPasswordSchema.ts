import * as yup from 'yup';

const passwordRule = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

const resetPasswordSchema = yup.object().shape({
  password: yup.string().min(8).matches(passwordRule, { message: 'suggest the strong password' }).required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'not matched the password')
    .required('Required'),
});

export default resetPasswordSchema;
