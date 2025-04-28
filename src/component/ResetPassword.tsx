import { toast } from 'react-toastify';
import authHttp from '../http/authHttp';
import resetPasswordSchema from '../schema/resetPasswordSchema';
import SignUpSchema from '../schema/signUpSchema';
import Button from './ui/Button';
import InputFelid from './ui/InputFelid';
import { useFormik } from 'formik';
import { useNavigate } from '@tanstack/react-router';

export default function ResetPassword({ token }: { token: string }) {
  const navigate = useNavigate();
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, resetForm, setSubmitting } =
    useFormik({
      validateOnMount: true,
      initialValues: {
        password: '',
        confirmPassword: '',
      },
      validationSchema: resetPasswordSchema,
      onSubmit,
    });

  async function onSubmit() {
    try {
      await authHttp.resetpassword({ password: values.password, token });
      toast.success('Your password has been successfully updated.');
      setTimeout(() => {
        navigate({ to: '/login' });
      }, 2000);
    } catch (error) {
      //@ts-ignore
      const errMsg = error?.message || 'An unexpected error occurred during password reset.';
      toast.error(`${errMsg}`);
    }
    setSubmitting(false);
  }

  return (
    <div className=" min-h-[69vh]">
      <div className=" xs:w-[440px] w-[300px] mt-20 mx-auto">
        <h1 className=" font-semibold text-xl text-themeBlack">Create New Password</h1>
        <p className=" mt-4 text-themeGray">
          Create a strong password. Your new password must be different from previous used passwords.
        </p>
        <form onSubmit={handleSubmit} noValidate>
          <div className=" space-y-7 my-7">
            <InputFelid
              title="Password"
              id={'password'}
              type="text"
              name="password"
              error={errors.password && touched.password}
              errorMessage={errors.password}
              onChange={handleChange}
              value={values.password}
              defaultChecked={false}
            />

            <InputFelid
              title="Confirm Password"
              id={'confirmPassword'}
              type="text"
              name="confirmPassword"
              error={errors.confirmPassword && touched.confirmPassword}
              errorMessage={errors.confirmPassword}
              onChange={handleChange}
              value={values.confirmPassword}
              defaultChecked={false}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            <text>Reset Password</text>
          </Button>
        </form>
      </div>
    </div>
  );
}
