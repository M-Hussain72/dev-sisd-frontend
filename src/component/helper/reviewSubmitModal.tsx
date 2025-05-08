import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Loader, Modal, Rating } from '@mantine/core';
import { useState } from 'react';
import TextAreaField from '../ui/textArea';
import reviewSchema from '../../schema/reviewSchema';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import Button from '../ui/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import reviewHttp from '../../http/reviewHttp';
import useAuthAxios from '../../hook/useAuthAxios';

export default function ReviewSubmitModal({
  // openButton,
  setOpened,
  courseId,
  courseTitle,
  opened,
  reviewLoading,
  hasReviewed,
  reviewData,
}: {
  // openButton: JSX.Element;
  reviewData: {
    rating?: number;
    comment?: string;
  };
  courseId: string;
  courseTitle: string;
  opened: boolean;
  hasReviewed: boolean;
  reviewLoading: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [reviewSubmit, setReviewSubmit] = useState(!!hasReviewed);
  const authAxios = useAuthAxios();

  const isMobile = useMediaQuery('(max-width: 50em)');
  const { values, errors, touched, isSubmitting, handleChange, handleSubmit, resetForm, setSubmitting } = useFormik({
    // validateOnMount: true,
    initialValues: {
      rating: reviewData?.rating || 0,
      comment: reviewData?.comment || '',
    },
    validationSchema: reviewSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const createMutation = useMutation({
    mutationFn: reviewHttp.addCourseReview,
    onSuccess: handelSuccess,
    onError: (error) => {
      setSubmitting(false);
      toast.error(error.message || 'Fail Submit Review');
    },
  });

  const updateMutation = useMutation({
    mutationFn: reviewHttp.updateCourseReview,
    onSuccess: handelSuccess,
    onError: (error) => {
      setSubmitting(false);
      toast.error(error.message || 'Failed to update review');
    },
  });

  function onSubmit() {
    const payload = {
      authAxios,
      rating: values.rating,
      comment: values.comment,
      courseId: courseId,
    };

    if (hasReviewed) {
      updateMutation.mutate({ ...payload });
    } else {
      createMutation.mutate({ ...payload });
    }
  }

  function handelSuccess() {
    toast.success('Successfully Submit  Review');
    setSubmitting(false);
    setReviewSubmit(hasReviewed);
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setReviewSubmit(true);
        }}
        title={!reviewSubmit && courseTitle}
        transitionProps={{ transition: 'fade', duration: 200 }}
        radius={'lg'}
        size={'lg'}
        centered
        classNames={{
          header: ' pb-0 pr-4 min-h-[5px] ' + (!reviewSubmit ? ' pt-4' : ' pt-2'),
          title: ' text-xl font-semibold line-clamp-2',
        }}
      >
        {reviewLoading ? (
          <Loader size={'md'} className=" mt-8" />
        ) : (
          <>
            {!reviewSubmit ? (
              <form onSubmit={handleSubmit}>
                <h3 className=" font-medium mt-4 ">Please rate your experience</h3>
                <div className=" my-4 mb-8">
                  <Rating
                    value={values.rating}
                    size={'xl'}
                    fractions={2}
                    className="gap-1"
                    color="#FFD05A"
                    onChange={(value) => {
                      const fixedValue = Math.max(1, value);
                      handleChange({
                        target: {
                          name: 'rating',
                          value: fixedValue,
                        },
                      });
                    }}
                  />
                  {errors.rating && touched.rating && (
                    <p className="w-fit text-red-500 text-xs my-1 mt-3">{errors.rating}</p>
                  )}
                </div>

                <TextAreaField
                  title=""
                  id={'comment'}
                  name="comment"
                  error={errors.comment && touched.comment}
                  errorMessage={errors.comment}
                  onChange={handleChange}
                  value={values.comment}
                  disabled={isSubmitting}
                  maxLength={1001}
                  placeholder="Tell us about your own personal experience taking this course. Was it a good match for you?"
                />
                <Button type="submit" className="mt-4" disabled={isSubmitting}>
                  Submit
                </Button>
              </form>
            ) : (
              <div className="">
                <h2 className=" text-xl font-semibold ">Your Review</h2>

                <div className=" mt-4  text-wrap">
                  <Rating value={values.rating} size={'md'} fractions={2} className="gap-1" color="#FFD05A" readOnly />

                  <p className=" mt-4 text-black  break-words whitespace-pre-wrap">{values.comment}</p>
                </div>

                <div className=" flex gap-4 items-center mt-10 w-fit ml-auto ">
                  <button
                    className=" text-themeBlue font-medium hover:bg-[#3b83f643] p-3 rounded-lg"
                    onClick={() => setOpened(false)}
                  >
                    Close
                  </button>
                  <Button onClick={() => setReviewSubmit(false)}>Edit Review</Button>
                </div>
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
}
