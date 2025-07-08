import InputFelid from './ui/InputFelid';
import Button from './ui/Button';
import ImageUpload from './helper/imageUpload';
import SignUpSchema from '../schema/signUpSchema';
import { useFormik } from 'formik';
import { useAuth } from '../context/AuthContext';
import VerifiedEmail from './VerifiedEmail';
import { useMutation } from '@tanstack/react-query';
import userHttp from '../http/userHttp';
import { toast } from 'react-toastify';
import useAuthAxios from '../hook/useAuthAxios';
import ProfileSchema from '../schema/profileSchema';

export default function Profile() {
  const { user, getUser } = useAuth();
  const authAxios = useAuthAxios();

  const { mutate } = useMutation({
    mutationFn: userHttp.updateUser,
    onSuccess: () => {
      toast.success('Successfully Update Profile!');
      setSubmitting(false);
      getUser({ authAxios });
    },
    onError: (error) => {
      toast.error(error.message);
      setSubmitting(false);
    },
  });
  const { values, errors, touched, isSubmitting, handleChange, handleSubmit, resetForm, setSubmitting, initialValues } =
    useFormik({
      validateOnMount: true,
      initialValues: {
        name: user?.name || '',
        email: user?.email || '',
        phoneNo: user?.phoneNo || '',
        profileImage: user?.profileImage || '',
      },
      validationSchema: ProfileSchema,
      onSubmit,
    });

  function onSubmit() {
    const hasChanged = JSON.stringify(values) !== JSON.stringify(initialValues);
    if (!hasChanged) {
      toast.error('No changes detected.');
      setSubmitting(false);
      return;
    }
    setTimeout(async () => {
      if (user?.profileImage) {
        if (user?.profileImage != values.profileImage) {
          await userHttp.deleteImage({
            url: user?.profileImage,
            authAxios,
          });
        }
      }
      mutate({ ...values, authAxios: authAxios });
    }, 400);
    console.log(values);
    setSubmitting(false);
  }

  return (
    <>
      <VerifiedEmail />
      <div>
        <form onSubmit={handleSubmit}>
          <ImageUpload
            onChange={(url) =>
              handleChange({
                target: {
                  name: 'profileImage',
                  value: url,
                },
              })
            }
            initialImage={user?.profileImage}
            currentImage={values.profileImage}
          />
          <div className=" mt-10">
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
                type="string"
                id="phoneNo"
                error={errors.phoneNo && touched.phoneNo}
                errorMessage={errors.phoneNo}
                onChange={handleChange}
                value={values.phoneNo}
                disabled={isSubmitting}
              />
            </div>
          </div>
          <Button className=" mt-6" disabled={isSubmitting}>
            Save Changes
          </Button>
        </form>
      </div>
    </>
  );
}
