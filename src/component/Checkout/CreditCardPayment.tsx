import InputFelid from '../ui/InputFelid';
import { useFormik } from 'formik';
import CreditCardSchema from '../../schema/creditCardSchema';
import usePayment from '../../hook/usePayment';
import { useNavigate } from '@tanstack/react-router';

export default function CreditCardPayment() {
  const paymentContext = usePayment();
  const navigate = useNavigate();
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting, setSubmitting } = useFormik({
    validateOnMount: true,
    validateOnBlur: false,
    initialValues: {
      name: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
    validationSchema: CreditCardSchema,
    onSubmit,
  });

  function onSubmit() {
    setSubmitting(false);
    alert(values);
    navigate({ to: '/payment/success' });
  }

  function handleExpiryDate(e: React.ChangeEvent<HTMLInputElement>) {
    let input = e.target.value;
    let updateEvent = { ...e };

    // Remove non-numeric characters
    input = input.replace(/\D/g, '');

    // Add the slash automatically after MM
    if (input.length > 2) {
      input = `${input.slice(0, 2)}/${input.slice(2)}`;
    }

    // Limit to MM/YYYY format (7 characters)
    if (input.length > 7) {
      input = input.slice(0, 7);
    }
    updateEvent.target.value = input;
    handleChange('expiryDate')(updateEvent);
  }

  function handleCardNumber(e: React.ChangeEvent<HTMLInputElement>) {
    let input = e.target.value;
    let updateEvent = { ...e };

    // Remove all non-digit characters
    input = input.replace(/\D/g, '');

    // Add spaces every 4 digits
    input = input.replace(/(\d{4})(?=\d)/g, '$1 ');

    if (input.length > 19) {
      input = input.slice(0, 19);
    }
    updateEvent.target.value = input;
    handleChange('cardNumber')(updateEvent);
  }

  function handleCVC(e: React.ChangeEvent<HTMLInputElement>) {
    let input = e.target.value;
    let updateEvent = { ...e };

    // Remove all non-digit characters
    input = input.replace(/\D/g, '');

    if (input.length > 4) {
      input = input.slice(0, 4);
    }

    updateEvent.target.value = input;
    handleChange('cvc')(updateEvent);
  }

  //submit form button in PaymentSummary Component Connect with 'id
  return (
    <form id="creditPaymentForm" onSubmit={handleSubmit} className="mt-6 ">
      <div className=" xl:flex xs:mb-6 mb-4  gap-4 ">
        <InputFelid
          title="Card Number"
          type="text"
          id="cardNumber"
          name="cardNumber"
          onChange={handleCardNumber}
          error={errors.cardNumber && touched.cardNumber}
          errorMessage={errors.cardNumber}
        ></InputFelid>
        <div className=" min-[400px]:flex gap-4 xl:mt-0 xs:mt-6 mt-4  min-[400px]:space-y-0 space-y-4 ">
          <InputFelid
            title="Expiry Date (MM / YYYY)"
            type="text"
            name="expiryDate"
            id="expiryDate"
            onChange={handleExpiryDate}
            error={errors.expiryDate && touched.expiryDate}
            errorMessage={errors.expiryDate}
            disabled={isSubmitting}
            width="w-[235px]"
          />
          <InputFelid
            title="CVC"
            name="cvc"
            id="cvc"
            type="text"
            onChange={handleCVC}
            error={errors.cvc && touched.cvc}
            errorMessage={errors.cvc}
            disabled={isSubmitting}
            width="w-[140px]"
          />
        </div>
      </div>
      <InputFelid
        title="Name on card"
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        error={errors.name && touched.name}
        errorMessage={errors.name}
        disabled={isSubmitting}
      />
    </form>
  );
}
