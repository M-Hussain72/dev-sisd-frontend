import * as yup from 'yup';

const passwordRule = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

const newPasswordSchema = yup.object().shape({
  currentPassword: yup.string().min(8, 'Wrong password').required('Please enter your current password'),

  newPassword: yup
    .string()
    .min(8)
    .matches(passwordRule, { message: 'suggest the strong password' })
    .required('Required')
    .notOneOf([yup.ref('currentPassword')], 'New password must be different from the current password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords do not match')
    .required('Required'),
});
export default newPasswordSchema;
