import { Checkbox, Radio } from '@mantine/core';
import { useState } from 'react';
import Divider from './ui/divider';
import Button from './ui/Button';
import { useRouter, useNavigate, useParams } from '@tanstack/react-router';
import { QuizIn } from '../interface/courseInterface';
import { setLectureProgress } from '../http/courseHttp';
import useAuthAxios from '../hook/useAuthAxios';
import { toast } from 'react-toastify';

interface quizType {
  questions: QuizIn[];
  title: string;
  completed: boolean;
  userAnswers: (number | number[])[] | null;
  userScore: number | null;
}

export default function Quiz({ questions, title, completed, userAnswers, userScore }: quizType) {
  const [selectedOptions, setSelectedOptions] = useState<(number | number[])[]>(Array(questions.length).fill(''));
  const params = useParams({ from: '/course/$courseSlug/learn/$sectionId/quiz/$quizId' });
  const navigate = useNavigate();
  const router = useRouter();
  const authAxios = useAuthAxios();
  const [isSubmitting, setSubmitting] = useState(false);
  const goBack = () => {
    router.history.back(); // This will navigate back to the previous page
  };

  const handleRadioChange = (questionNo: number, answer: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionNo] = answer;
    setSelectedOptions(updatedOptions);
  };

  const handleCheckBoxChange = (questionNo: number, answer: number[]) => {
    setSelectedOptions((prev) => {
      const updatedOptions = [...prev];
      updatedOptions[questionNo] = answer;
      return updatedOptions;
    });
  };

  const checkItCorrectOption = (questionNo: number, answer: number) => {
    if (questions[questionNo].questionType === 'single-choice' && !!userAnswers) {
      if (questions[questionNo].correctOptionsIndex[0] === answer) {
        return true;
      }
      return false;
    }

    if (questions[questionNo].questionType === 'multiple-choice' && !!userAnswers) {
      if (questions[questionNo].correctOptionsIndex.includes(answer)) {
        return true;
      }
    }
    return false;
  };

  async function handleSubmit() {
    if (questions.length != selectedOptions.length) {
      toast.error('Answering the all question!');
      return;
    }
    setSubmitting(true);
    try {
      await setLectureProgress({
        courseSlug: params.courseSlug,
        lectureId: params.quizId,
        lectureType: 'assessment',
        userAnswers: selectedOptions,
        authAxios,
        lastViewTime: null,
        completed: false,
      });
    } catch (error) {
      setSubmitting(false);
      toast.error('Something went wrong!');
    }

    navigate({
      to: `/course/${params.courseSlug}/learn/${params.sectionId}/lecture/${params.quizId}`,
      replace: true,
    });
  }

  return (
    <>
      <div className=" top-0 left-0 right-0 fixed z-[90] w-[100%] bg-white shadow-md  ">
        <nav className=" flex  max-w-[1440px]  gap-4 justify-between xs:h-[75px] h-[60px] items-center mx-auto px-6   ">
          <div className=" flex gap-4 items-center">
            <div className=" w-fit  cursor-pointer " onClick={() => goBack()}>
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.50242 1.71294C9.7799 1.43547 9.7799 0.985586 9.50242 0.708108C9.22494 0.430631 8.77506 0.430631 8.49758 0.708108L0.208108 8.99758C-0.0693694 9.27506 -0.0693695 9.72494 0.208108 10.0024L8.49758 18.2919C8.77506 18.5694 9.22494 18.5694 9.50242 18.2919C9.7799 18.0144 9.7799 17.5645 9.50242 17.2871L2.42589 10.2105H17.2895C17.6819 10.2105 18 9.89241 18 9.5C18 9.10759 17.6819 8.78947 17.2895 8.78947H2.42589L9.50242 1.71294Z"
                  fill="#949697"
                />
              </svg>
            </div>

            <div>
              <h2 className=" text-themeBlack leading-4 xs:text-base text-sm font-semibold">Graded Quiz: {title}</h2>
              <span className=" text-themeGray text-xs">Quiz</span>
            </div>
          </div>
        </nav>
      </div>

      <div className=" max-w-[900px] mx-auto px-6 mb-20">
        <div className=" mb-6">
          <h1 className=" text-[34px] font-semibold ">{'Introduction Assessment'}</h1>
          <p className=" text-themeGray text-lg">
            {!completed ? 'To pass 80% or higher' : `${userScore ? userScore : ''} %`}
          </p>
        </div>
        <Divider color=" border-[#EEEEEE]" />
        {questions?.map((item, index) => (
          <div className="mt-6 ">
            <h2 className=" text-xl text-themeBlack">
              {index + 1}
              {'. '}
              {item.question}
            </h2>
            <ul className=" mt-4 space-y-4">
              {item.questionType === 'single-choice' ? (
                <Radio.Group
                  name={`${index}`}
                  my={'md'}
                  value={userAnswers !== null && completed ? String(userAnswers[index]) : String(selectedOptions[index])} // Set value properly
                  onChange={(value) => handleRadioChange(index, Number(value))} // Ensure number type
                >
                  {item.options.map((option, index2) => (
                    <Radio
                      label={
                        <span
                          className={
                            ' text-xl leading-[20px] cursor-pointer ' +
                            (completed && userAnswers && userAnswers[index] === index2
                              ? checkItCorrectOption(index, index2)
                                ? ' text-green-400'
                                : 'text-red-500'
                              : checkItCorrectOption(index, index2)
                                ? ' text-green-400'
                                : ' text-themeGray6')
                          }
                        >
                          {option}
                        </span>
                      }
                      value={`${index2}`}
                      onClick={() => handleRadioChange(index, index2)}
                      my={'md'}
                      color={completed ? (checkItCorrectOption(index, index2) ? 'green' : 'red') : 'blue'}
                    />
                  ))}
                </Radio.Group>
              ) : (
                <Checkbox.Group
                  value={
                    Array.isArray(userAnswers?.[index]) && completed
                      ? userAnswers[index].map(String)
                      : Array.isArray(selectedOptions[index])
                        ? selectedOptions[index].map(String)
                        : []
                  } // Convert numbers to strings
                  onChange={(values) => handleCheckBoxChange(index, values.map(Number))}
                >
                  {item.options.map((option, index2) => (
                    <li key={`option-${index2}`} className="flex items-start gap-3">
                      <Checkbox
                        value={`${index2}`}
                        label={
                          <span
                            className={
                              ' text-xl leading-[20px] cursor-pointer ' +
                              (completed &&
                              userAnswers &&
                              Array.isArray(userAnswers[index]) &&
                              userAnswers[index].includes(index2)
                                ? checkItCorrectOption(index, index2)
                                  ? ' text-green-400'
                                  : 'text-red-500'
                                : checkItCorrectOption(index, index2)
                                  ? ' text-green-400'
                                  : ' text-themeGray6')
                            }
                          >
                            {option}
                          </span>
                        }
                        // onClick={() => handleCheckBoxChange(index, index2)}
                        my={'sm'}
                        // disabled={completed}
                        color={completed ? (checkItCorrectOption(index, index2) ? 'green' : 'red') : 'blue'}
                        checked={
                          completed && userAnswers && Array.isArray(userAnswers[index])
                            ? userAnswers[index].includes(index2)
                            : undefined
                        }
                      />
                    </li>
                  ))}
                </Checkbox.Group>
              )}
            </ul>
          </div>
        ))}
        {!completed && (
          <div className=" mt-16">
            <Button disabled={isSubmitting} onClick={handleSubmit}>
              Submit Assessment
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
