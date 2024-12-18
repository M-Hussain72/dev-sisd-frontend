import { Link, useNavigate } from '@tanstack/react-router';
import Button from './ui/Button';
import InputFelid from './ui/InputFelid';
import { useFormik } from 'formik';
import { loginSchema } from '../schema/loginSchema';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import ErrorBlock from '../utils/ErrorBlock';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { values, errors, touched, isSubmitting, handleChange, handleSubmit, resetForm, setSubmitting } = useFormik({
    validateOnMount: true,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  const { mutate, isError, isPending, data, isSuccess, error } = useMutation({
    mutationFn: login,
    onSuccess: handelSuccess,
    onError: () => {
      setSubmitting(false);
    },
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  function handelSuccess() {
    navigate({ to: '/', replace: true });
  }

  function onSubmit() {
    setTimeout(() => {
      mutate({ fromData: values });
    }, 400);
  }

  return (
    <div className="">
      <div className=" xs:w-[440px] w-[300px] mt-20 mb-[130px] mx-auto">
        <form onSubmit={handleSubmit} noValidate>
          <h1 className=" font-semibold text-xl text-themeBlack">Log in to your Account</h1>
          {isError && <ErrorBlock title="Login Unsuccessful!" message={error?.message} />}
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
              disabled={isSubmitting}
            />
            <InputFelid
              title="password"
              id={'password'}
              type="password"
              name="password"
              error={errors.password && touched.password}
              errorMessage={errors.password}
              onChange={handleChange}
              value={values.password}
              disabled={isSubmitting}
            />
          </div>
          <Button disabled={isSubmitting} type="submit" name="submit">
            <span className=" xs:px-[176px] px-[118px]">Login</span>
          </Button>
        </form>
        <div className="mt-4">
          <div className="flex justify-between">
            <p className="xs:text-sm text-xs font-light text-themeGray cursor-default">
              Don’t have an account?{' '}
              <span className="text-themeBlue font-medium cursor-pointer hover:text-blue-700">
                <Link to="/signup">Sign Up</Link>
              </span>
            </p>
            <p className="xs:text-sm text-xs font-light text-themeGray cursor-pointer hover:text-blue-700">
              <Link to="/login/forgotpassword">Forgot password?</Link>
            </p>
          </div>
          <div className="relative flex items-center justify-center mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#B4B4B466]"></div>
            </div>
            <div className="relative bg-[#fafafa]  px-4  text-[#AEABBA] text-sm">Or continue with</div>
          </div>
          <ul className="flex gap-4 w-fit mx-auto mt-4">
            <li id="google" className=" w-fit p-3  rounded-lg bg-[#F2F3F8] border-[0.5px] border-[#AEABBA]">
              <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M25.5 12.7778C25.5 11.75 25.4149 11 25.2307 10.2222H13.2549V14.8611H20.2845C20.1428 16.0139 19.3775 17.75 17.6767 18.9166L17.6529 19.0719L21.4394 21.9465L21.7018 21.9722C24.111 19.7916 25.5 16.5833 25.5 12.7778Z"
                  fill="#4285F4"
                />
                <path
                  d="M13.2546 25C16.6985 25 19.59 23.8888 21.7018 21.9722L17.6767 18.9166C16.5997 19.6527 15.1537 20.1666 13.2546 20.1666C9.88155 20.1666 7.01872 17.9861 5.9982 14.9722L5.84862 14.9847L1.91134 17.9708L1.85985 18.1111C3.95736 22.1944 8.26582 25 13.2546 25Z"
                  fill="#34A853"
                />
                <path
                  d="M5.9982 14.9722C5.72893 14.1945 5.57377 13.3611 5.57377 12.5C5.57377 11.6388 5.72961 10.8055 5.98471 10.0278L5.97758 9.86214L1.99096 6.82805L1.86053 6.88885C0.996043 8.58332 0.5 10.4861 0.5 12.5C0.5 14.5139 0.995369 16.4166 1.85985 18.1111L5.9982 14.9722Z"
                  fill="#FBBC05"
                />
                <path
                  d="M13.2546 4.83329C15.6497 4.83329 17.2653 5.84718 18.1866 6.69445L21.7864 3.24999C19.5756 1.23611 16.6985 0 13.2546 0C8.26582 0 3.95804 2.80556 1.86053 6.88885L5.98471 10.0278C7.0194 7.0139 9.88156 4.83329 13.2546 4.83329Z"
                  fill="#EB4335"
                />
              </svg>
            </li>
            <li id="facebook" className=" w-fit p-3  rounded-lg bg-[#F2F3F8] border-[0.5px] border-[#AEABBA]">
              <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M25.5 12.5755C25.4992 5.6302 19.9035 0 13 0C6.09649 0 0.5 5.63104 0.5 12.5772C0.5 18.8297 5.03454 24.0162 10.9745 24.9899L11.0461 25V16.2121H7.87197V12.5755H11.0461V9.80609C11.0303 9.66603 11.022 9.50332 11.022 9.33894C11.022 6.88741 12.9975 4.89969 15.434 4.89969C15.5515 4.89969 15.6682 4.90472 15.7841 4.91311L15.7691 4.91227C16.7685 4.92653 17.7354 5.01543 18.679 5.17395L18.5673 5.15801V8.25282H16.9902C16.9185 8.24275 16.836 8.23688 16.7527 8.23688C15.7549 8.23688 14.9455 9.05042 14.9455 10.0552C14.9455 10.1122 14.948 10.1684 14.953 10.2246L14.9522 10.2171V12.5755H18.4189L17.8646 16.2121H14.9522V25C20.9646 24.0154 25.4992 18.828 25.5 12.5755Z"
                  fill="#1877F2"
                />
              </svg>
            </li>
            <li id="apple" className=" w-fit p-3  rounded-lg bg-[#F2F3F8] border-[0.5px] border-[#AEABBA]">
              <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.1478 1.93355C13.0995 0.847925 14.693 0.0527884 16.0211 0.000165877C16.1303 -0.00413621 16.2272 0.0757329 16.2394 0.182786C16.3931 1.54873 15.884 3.07354 14.8773 4.26191C13.9211 5.38743 12.5197 6.08655 11.2214 6.08655C11.1297 6.08655 11.0388 6.08319 10.9489 6.07639C10.8494 6.06872 10.769 5.99484 10.756 5.89882C10.5481 4.36641 11.3384 2.84503 12.1478 1.93355Z"
                  fill="black"
                />
                <path
                  d="M3.19465 21.7975C0.792564 18.4234 -0.588791 12.8568 1.58367 9.18972C2.72572 7.25722 4.79865 6.03649 6.99289 6.00593C7.01468 6.00506 7.03654 6.00506 7.05923 6.00506C8.00036 6.00506 8.88913 6.34773 9.67479 6.6505L9.67959 6.65237C10.2672 6.8792 10.7754 7.07541 11.1666 7.07541C11.5149 7.07541 12.0196 6.88175 12.6038 6.65748C13.4499 6.33296 14.5038 5.92862 15.604 5.92862C15.6983 5.92862 15.7926 5.9313 15.8853 5.93716C15.9308 5.94003 15.9759 5.94365 16.0205 5.94814C16.9574 5.98723 19.2835 6.31257 20.8011 8.47365C20.8151 8.49354 20.8252 8.51536 20.8311 8.53818C20.8389 8.56792 20.8398 8.59922 20.8334 8.62995C20.8282 8.65446 20.8187 8.67759 20.8053 8.69829C20.7891 8.72354 20.7672 8.74524 20.7408 8.76157L20.7207 8.77435C20.2798 9.04021 18.0812 10.5047 18.1091 13.2697C18.1388 16.6727 21.0324 17.9214 21.3625 18.0531C21.3651 18.0539 21.3773 18.059 21.3773 18.059C21.4751 18.1032 21.5231 18.2111 21.4891 18.3104L21.4821 18.3325C21.3031 18.8915 20.7722 20.3526 19.7131 21.8578L19.7125 21.8587C18.6979 23.3001 17.5481 24.9337 15.6756 24.9677C14.8032 24.9838 14.2113 24.7348 13.6374 24.4932L13.6324 24.4912L13.6303 24.4902C13.0468 24.2451 12.4438 23.9917 11.4992 23.9917C10.5047 23.9917 9.87083 24.2542 9.25783 24.5082L9.25495 24.5093C8.71007 24.735 8.14584 24.9686 7.36569 24.9983C7.33339 24.9991 7.30199 25 7.27052 25C5.60801 25 4.39438 23.4854 3.19465 21.7975Z"
                  fill="black"
                />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
