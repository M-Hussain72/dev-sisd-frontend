import * as yup from 'yup';

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const fullNameRule = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

const SignUpSchema = yup.object().shape({
  email: yup.string().email('please enter valid Email').required('Required'),
  name: yup.string().required('Required').matches(fullNameRule, {
    message: 'Full name must only contain letters, hyphens, apostrophes.',
  }),
  phoneNo: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});
export default SignUpSchema;
