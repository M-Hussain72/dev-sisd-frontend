import Button from './ui/Button';
import InputFelid from './ui/InputFelid';
import { useFormik } from 'formik';
import { loginSchema } from '../schema/loginSchema';
import authHttp from '../http/authHttp';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useCountdown } from '../hook/countDown';
import { Link } from '@tanstack/react-router';

export default function ForgotPasswordPage() {
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, resetForm, setSubmitting } =
    useFormik({
      validateOnMount: true,
      initialValues: {
        email: '',
      },
      validationSchema: loginSchema.fields.email,
      onSubmit,
    });
  const { secondsLeft, start, running } = useCountdown();

  async function onSubmit() {
    try {
      await authHttp.forgetPassword({ email: values.email });
      start(60);
      toast.success('Password reset link sent! Please also check your spam folder.');
    } catch (error) {
      console.log(error);
      //@ts-ignore
      toast.error(error.message || 'Failed to send reset link.');
    }
    setSubmitting(false);
  }

  return (
    <div className=" min-h-[69vh]">
      <div className=" xs:w-[440px] w-[300px] mt-20 mx-auto">
        <h1 className=" font-semibold text-xl text-themeBlack">Forgot Password</h1>
        <p className=" mt-4 text-themeGray">Enter the email address and we will send you a link to reset your password</p>
        <form onSubmit={handleSubmit} noValidate>
          <div className=" space-y-7 my-7">
            <InputFelid
              title="email address"
              id={'email'}
              type="email"
              name="email"
              error={errors.email && touched.email}
              errorMessage={errors.email}
              onChange={handleChange}
              value={values.email}
              defaultChecked={false}
            />
          </div>
          <Button type="submit" disabled={running || isSubmitting}>
            <text>{running ? `Resend in ${secondsLeft}s` : 'Request Password Reset'}</text>
          </Button>
        </form>
        <p className=" mt-4 text-themeGray text-sm ">
          Back to{' '}
          <Link to="/login" className=" text-themeBlue font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
