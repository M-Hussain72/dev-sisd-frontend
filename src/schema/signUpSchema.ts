import * as yup from 'yup';

const passwordRule = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
const fullNameRule = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

const SignUpSchema = yup.object().shape({
  email: yup.string().email('please enter valid Email').required('Required'),
  name: yup.string().required('Required').matches(fullNameRule, {
    message: 'Full name must only contain letters, hyphens, apostrophes.',
  }),
  password: yup.string().min(8).matches(passwordRule, { message: 'suggest the strong password' }).required('Required'),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref('password')], 'not matched the password')
  //   .required('Required'),
});
export default SignUpSchema;
