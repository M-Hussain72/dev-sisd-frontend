import { useMutation } from '@tanstack/react-query';
import InputFelid from './ui/InputFelid';
import { useFormik } from 'formik';
import TextAreaField from './ui/textArea';
import Button from './ui/Button';
import { Select } from '@mantine/core';
import ContactSchema from '../schema/contactSchema';

export default function Contact() {
  // const { mutate, isError, data, isSuccess, isPending, error } = useMutation({
  //   mutationFn: register,
  // });

  // if (isSuccess) {
  //   handelSuccess();
  // }

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit, resetForm, setSubmitting } = useFormik({
    validateOnMount: true,
    validateOnBlur: false,
    initialValues: {
      email: '',
      name: '',
      topic: '',
      message: '',
    },
    validationSchema: ContactSchema,
    onSubmit,
  });

  function handelSuccess() {
    resetForm();
  }

  function onSubmit() {
    setTimeout(() => {
      const { ...fromData } = values;
      console.log(values);
      setSubmitting(false);
      resetForm();
    }, 400);
  }

  return (
    <div className=" sm:flex  gap-6 justify-center px-4 sm:my-10 my-4 mb-16">
      <h1 className=" max-w-[450px] text-black font-semibold text-4xl pt-8 ">
        Didn’t find what you’re looking for? Get in touch with us
      </h1>
      <form onSubmit={handleSubmit} className="sm:mt-0  mt-6 space-y-4 max-w-[500px] w-full">
        <Select
          placeholder="Choose your Topic"
          data={['General Support', 'Bug Report', 'Feedback & Feature Requests', 'Account Suspension']}
          maxDropdownHeight={200}
          checkIconPosition="right"
          classNames={{
            input:
              'border px-3 py-6 rounded-lg text-lg text-themeBlack  focus:border-themeBlue  ' +
              (errors.topic && touched.topic ? ' border-red-400' : ' border-gray-400 '),
            dropdown: 'max-h-[200px] overflow-y-auto',
          }}
          onChange={(value, option) => {
            handleChange({
              target: {
                name: 'topic',
                value,
              },
            });
          }}
          value={values.topic}
          id={'topic'}
          name="topic"
          mt="md"
        />

        <InputFelid
          title="Full Name"
          id={'name'}
          type="name"
          name="name"
          error={errors.name && touched.name}
          errorMessage={errors.name}
          onChange={handleChange}
          value={values.name}
          disabled={isSubmitting}
        />
        <InputFelid
          title="Email Address"
          id={'email'}
          type="email"
          name="email"
          error={errors.email && touched.email}
          errorMessage={errors.email}
          onChange={handleChange}
          value={values.email}
          disabled={isSubmitting}
        />
        <TextAreaField
          title="Your Message"
          id={'message'}
          name="message"
          error={errors.message && touched.message}
          errorMessage={errors.message}
          onChange={handleChange}
          value={values.message}
          disabled={isSubmitting}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
