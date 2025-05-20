import { useFormik } from 'formik';
import Button from './ui/Button';
import InputFelid from './ui/InputFelid';
import newPasswordSchema from '../schema/newPasswordSchema';
import ErrorBlock from '../utils/ErrorBlock';
import { useMutation } from '@tanstack/react-query';
import userHttp from '../http/userHttp';
import { toast } from 'react-toastify';
import useAuthAxios from '../hook/useAuthAxios';

export default function Setting() {
  const authAxios = useAuthAxios();
  const { values, errors, touched, isSubmitting, handleChange, handleSubmit, resetForm, setSubmitting } = useFormik({
    validateOnMount: true,
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: newPasswordSchema,
    onSubmit,
  });

  const { mutate } = useMutation({
    mutationFn: userHttp.changePassword,
    onSuccess: () => {
      toast.success('Successfully Change Password!');
      setSubmitting(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message);
      setSubmitting(false);
    },
  });

  function onSubmit() {
    setTimeout(() => {
      mutate({ authAxios, currentPassword: values.currentPassword, newPassword: values.newPassword });
    }, 400);
    console.log(values);
    setSubmitting(false);
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit} noValidate>
        <h1 className=" font-semibold text-3xl text-themeBlack">Change Password</h1>
        {/* {isError && <ErrorBlock title="Login Unsuccessful!" message={error?.message} />} */}
        <div className=" space-y-7 my-7">
          <InputFelid
            title="Current Password"
            id={'currentPassword'}
            type="password"
            name="currentPassword"
            error={errors.currentPassword && touched.currentPassword}
            errorMessage={errors.currentPassword}
            onChange={handleChange}
            value={values.currentPassword}
            disabled={isSubmitting}
          />
          <div className=" flex flex-wrap   gap-6 ">
            <div className=" flex-1">
              {' '}
              <InputFelid
                title="New password"
                id={'newPassword'}
                type=""
                name="newPassword"
                error={errors.newPassword && touched.newPassword}
                errorMessage={errors.newPassword}
                onChange={handleChange}
                value={values.newPassword}
                disabled={isSubmitting}
              />
            </div>
            <div className="flex-1">
              <InputFelid
                title="Re-type new password"
                id={'confirmPassword'}
                type=""
                name="confirmPassword"
                error={errors.confirmPassword && touched.confirmPassword}
                errorMessage={errors.confirmPassword}
                onChange={handleChange}
                value={values.confirmPassword}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
        <Button disabled={isSubmitting} type="submit" name="submit">
          <span className=" ">Changes Password</span>
        </Button>
      </form>
    </div>
  );
}
