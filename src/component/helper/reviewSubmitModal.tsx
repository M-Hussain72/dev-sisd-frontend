import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button, Rating } from '@mantine/core';
import { useState } from 'react';
import TextAreaField from '../ui/textArea';
import reviewSchema from '../../schema/reviewSchema';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

export default function ReviewSubmitModal({
  // openButton,
  setOpened,
  courseSlug,
  courseTitle,
  opened,
}: {
  // openButton: JSX.Element;
  courseSlug: string;
  courseTitle: string;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const [opened, { open, close }] = useDisclosure(false);

  const isMobile = useMediaQuery('(max-width: 50em)');
  const { values, errors, touched, isSubmitting, handleChange, handleSubmit, resetForm, setSubmitting } = useFormik({
    validateOnMount: true,
    initialValues: {
      rating: 0,
      comment: '',
    },
    validationSchema: reviewSchema,
    onSubmit,
  });

  function onSubmit() {
    toast.success('Successfully submit thr review');
    setSubmitting;
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        title={courseTitle}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <form onSubmit={handleSubmit}>
          <h3>Your Review</h3>
          <div className=" my-4 mb-6">
            <Rating
              value={values.rating}
              size={'xl'}
              fractions={2}
              className="gap-1"
              color="#FFD05A"
              onChange={(value) =>
                handleChange({
                  target: {
                    name: 'rating',
                    value,
                  },
                })
              }
            />
          </div>

          <TextAreaField
            title="Your Message"
            id={'comment'}
            name="comment"
            error={errors.comment && touched.comment}
            errorMessage={errors.comment}
            onChange={handleChange}
            value={values.comment}
            disabled={isSubmitting}
            maxLength={1001}
          />
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Modal>
      {/* <button
        className=""
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation(); // prevent parent click

          open();
        }}
        disabled={isSubmitting}
      >
        {openButton}
      </button> */}
    </>
  );
}
