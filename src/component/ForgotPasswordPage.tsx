import Button from './ui/Button';
import InputFelid from './ui/InputFelid';
import { useFormik } from 'formik';
import { loginSchema } from '../schema/loginSchema';

export default function ForgotPasswordPage() {
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, resetForm, setSubmitting } =
    useFormik({
      validateOnMount: true,
      // validateOnChange: false,
      // validateOnBlur: false,
      initialValues: {
        email: '',
      },
      validationSchema: loginSchema.fields.email,
      onSubmit,
    });

  async function onSubmit() {
    //  await loginUser(values);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }

  return (
    <div className=" min-h-[69vh]">
      <div className=" xs:w-[440px] w-[300px] mt-20 mx-auto">
        <h1 className=" font-semibold text-xl text-themeBlack">Forgot Password</h1>
        <p className=" mt-4 text-themeGray">
          Please enter the email address and we will send you a link to reset your password
        </p>
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
          <Button type="submit" disabled={isSubmitting}>
            <text>Reset Password</text>
          </Button>
        </form>
        <p className=" mt-4 text-themeGray text-sm ">
          Back to <span className=" text-themeBlue font-medium">Login</span>
        </p>
      </div>
    </div>
  );
}
