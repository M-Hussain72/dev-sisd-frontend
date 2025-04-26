import * as yup from 'yup';

const CreditCardSchema = yup.object().shape({
  name: yup.string().required('Please enter your cardholder name'),
  cardNumber: yup
    .string()
    .required('Please enter your card number')
    .max(19)
    .matches(/^(\d{4}[- ]?){3}\d{4}$/, { message: 'Please enter your full card number' }),
  expiryDate: yup
    .string()
    .required('Please enter a valid expiration date')
    .min(7, { message: 'Please enter your full expiration date' })
    .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, { message: 'Please enter valid date.' }),
  cvc: yup
    .string()
    .matches(/^\d{3,4}$/, { message: 'Please enter your full CVC ' })
    .required('Please enter your CVC'),
});

export default CreditCardSchema;
