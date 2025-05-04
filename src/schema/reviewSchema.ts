import * as Yup from 'yup';

const reviewSchema = Yup.object({
  rating: Yup.number()
    .min(1, 'Please provide a rating')
    .max(5, 'Rating cannot be more than 5')
    .required('Rating is required'),
  comment: Yup.string()
    .max(1000, 'Comment is too long — please keep it under 1000 characters')
    .required('Comment is required'),
});

export default reviewSchema;
