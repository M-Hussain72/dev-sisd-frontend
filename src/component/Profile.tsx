import InputFelid from './ui/InputFelid';
import Button from './ui/Button';
import ImageUpload from './helper/imageUpload';
import SignUpSchema from '../schema/signUpSchema';
import { useFormik } from 'formik';
import { useAuth } from '../context/AuthContext';
import VerifiedEmail from './VerifiedEmail';

export default function Profile() {
  const { user } = useAuth();
  const { values, errors, touched, isSubmitting, handleChange, handleSubmit, resetForm, setSubmitting } = useFormik({
    validateOnMount: true,
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phoneNo: '',
    },
    validationSchema: SignUpSchema,
    onSubmit,
  });

  function onSubmit() {
    setTimeout(() => {
      //  mutate({ fromData: values });
    }, 400);
    console.log(values);
    setSubmitting(false);
  }

  return (
    <>
      <VerifiedEmail />
      <div>
        <ImageUpload />
        <form className=" mt-10">
          <div className=" ">
            <InputFelid
              title="Name"
              name="name"
              id="name"
              type="name"
              error={errors.name && touched.name}
              errorMessage={errors.name}
              onChange={handleChange}
              value={values.name}
              disabled={isSubmitting}
            />
          </div>
          <div className="  mt-7 flex flex-wrap  gap-7 flex-row">
            <div className=" flex-1">
              <InputFelid
                title="email"
                name="email"
                id="email"
                type="email"
                error={errors.email && touched.email}
                errorMessage={errors.email}
                onChange={handleChange}
                value={values.email}
                disabled={true}
                readOnly
              />
            </div>

            <div className=" flex-1">
              <InputFelid
                title="Phone No"
                name="phoneNo"
                type="tel"
                id="phoneNo"
                error={errors.phoneNo && touched.phoneNo}
                errorMessage={errors.phoneNo}
                onChange={handleChange}
                value={values.phoneNo}
                disabled={isSubmitting}
              />
            </div>
          </div>
          <Button className=" mt-6"> Save Changes</Button>
        </form>
      </div>
    </>
  );
}
