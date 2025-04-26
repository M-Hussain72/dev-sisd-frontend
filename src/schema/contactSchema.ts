import * as yup from 'yup';

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const fullNameRule = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

const ContactSchema = yup.object().shape({
  email: yup.string().email('please enter valid Email').required('Required'),
  name: yup.string().required('Required').matches(fullNameRule, {
    message: 'Full name must only contain letters, hyphens, apostrophes.',
  }),
  topic: yup.string().required('Required'),
  message: yup.string().required('Required'),
});
export default ContactSchema;
