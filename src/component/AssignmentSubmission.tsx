import { useMemo, useState } from 'react';
import { getAuthToken } from '../utils/auth';
import { toast } from 'react-toastify';
import { Loader } from '@mantine/core';
import { uploadAssignment } from '../http/courseHttp.ts';
import { useParams, useRouteContext } from '@tanstack/react-router';
import { LectureProgressPayload } from '../interface/courseInterface';
import { MutateOptions } from '@tanstack/react-query';
import formatTime, { formatDate } from '../utils/formatTime.ts';

export default function AssignmentSubmission({
  assignment,
  mutate,
  resSubmit,
}: {
  assignment: {
    title: string;
    description: string;
    startedAt: Date;
    submitWithinDays: number;
    fileUrl: string;
    score: number | undefined;
    feedback: string | undefined;
    isFeedbackDone: boolean;
  };
  resSubmit: boolean;
  mutate: (
    variables: LectureProgressPayload,
    options?: MutateOptions<void, Error, LectureProgressPayload, unknown> | undefined,
  ) => void;
}) {
  const now = new Date();
  const availableAt = new Date(assignment?.startedAt);
  const [downloading, setDownloading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const params = useParams({ from: '/course/$courseSlug/learn/$sectionId/lecture/$lectureId/' });
  const { authAxios } = useRouteContext({ from: '/course/$courseSlug/learn/$sectionId/lecture/$lectureId/' });
  const [file, setFile] = useState<File>();
  const deadline = useMemo(() => {
    return new Date(availableAt.getTime() + assignment?.submitWithinDays * 86400000);
  }, [assignment]);

  const status = useMemo(() => {
    if (now < availableAt) return 'not-started';
    if (now > deadline) return 'expired';
    return 'active';
  }, [now, availableAt, deadline]);

  const handleFileChange = (event: { target: { files: any } }) => {
    const file = event.target.files[0]; // Get the first selected file
    setFile(file);
  };

  const handelSubmit = async () => {
    if (file) {
      setSubmitting(true);
      try {
        const res = await uploadAssignment({ file, courseSlug: params.courseSlug, lectureId: params.lectureId, authAxios });
        if (res.key) {
          mutate({
            courseSlug: params.courseSlug,
            assignment: { fileUrl: res.key, startedAt: deadline },
            authAxios,
            completed: false,
            lectureType: 'assignment',
            userAnswers: null,
            lectureId: params.lectureId,
            lastViewTime: null,
          });
          toast.success('SuccessFully Submit Assignment!');
          setSubmitting(false);
          setSubmit(true);
        }
      } catch (error) {
        toast.error('Fail Upload Assignment!');
        setSubmitting(false);

        return;
      }
    }
  };

  return (
    <div className=" mx-auto sm:mt-8   ">
      {!resSubmit ? (
        <>
          {/* <h2 className="text-2xl font-bold mb-6 capitalize">Assignment:{assignment?.title}</h2> */}

          {status === 'not-started' && (
            <p className="text-yellow-600 font-semibold mt-8">⏳ Assignment will start at: {availableAt.toLocaleString()}</p>
          )}

          {/* {status === 'expired' && (
            <div className="max-w-2xl mx-auto mt-6  p-6 bg-white shadow-md rounded-lg border border-gray-200">
              <div className=" items-center w-fit mx-auto space-x-3 text-center">
                <svg
                  className=" h-28 w-full fill-red-400 "
                  data-name="Layer 1"
                  id="Layer_1"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />
                  <path d="M27.37,2H14.05a8.07,8.07,0,0,1,2.77,6.1,7.91,7.91,0,0,1-.63,3.12h7.48a.94.94,0,1,1,0,1.87H15.1c-.16.2-.34.4-.52.59a8.12,8.12,0,0,1-5.85,2.51,2.17,2.17,0,0,1-.36,0V28a2,2,0,0,0,2,2h17a2,2,0,0,0,2-2V4A2,2,0,0,0,27.37,2Zm-3.7,18.78h-9.6a.94.94,0,1,1,0-1.87h9.6a.94.94,0,1,1,0,1.87Zm0-3.85h-9.6a.93.93,0,1,1,0-1.86h9.6a.93.93,0,1,1,0,1.86Z" />
                  <path d="M8.73,14.19a6.07,6.07,0,0,0,4.41-1.9A5.61,5.61,0,0,0,14,11.23a6,6,0,0,0,.87-3.13,6.1,6.1,0,0,0-5-6h0a6,6,0,0,0-1-.09,6.09,6.09,0,0,0-.36,12.17A2.17,2.17,0,0,0,8.73,14.19Zm-2-3.09A1,1,0,0,1,6,10.8,1,1,0,0,1,6,9.39L7.31,8.1,6,6.8A1,1,0,0,1,7.43,5.39l1.3,1.29.57-.57L10,5.39A1,1,0,0,1,11.43,6.8L10.14,8.1l1.29,1.29a1,1,0,0,1,0,1.41,1,1,0,0,1-1.41,0L8.89,9.67l-.16-.16L7.43,10.8A1,1,0,0,1,6.73,11.1Z" />
                </svg>
                <h2 className=" mt-4 text-2xl font-semibold text-red-600"> Submission closed</h2>
              </div>
              <p className="mt-2  mx-auto w-fit text-center">
                {' '}
                Deadline of this Assignment was:{' '}
                <span className=" text-red-600 font-medium">{deadline.toLocaleString()}</span>
              </p>
            </div>
          )} */}

          {(status === 'active' || status === 'expired') && (
            <>
              <h3 className=" font-bold text-lg mt-2 mb-4">Download Assignment:</h3>
              <button
                onClick={async () => {
                  setDownloading(true);

                  try {
                    const token = getAuthToken();
                    const accessToken = token?.access?.token || '';
                    // 1) Fetch the file as a blob
                    const resp = await fetch(assignment.fileUrl, {
                      method: 'GET',
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                      },
                    });
                    if (!resp.ok) {
                      throw new Error('Download failed');
                    }
                    // 1) Pull out the content-type so we can pass it to the Blob
                    const contentType = resp.headers.get('Content-Type') || 'application/octet-stream';

                    // 2) Read the raw bytes
                    const buffer = await resp.arrayBuffer();

                    // 3) Rewrap in a Blob with the proper MIME
                    const blob = new Blob([buffer], { type: contentType });

                    // 2) Create a temporary <a> tag with object URL
                    const filename = assignment.fileUrl
                      .split('?')[0] // strip any query
                      .split('/')
                      .pop();
                    const href = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = href;
                    a.download = filename || 'download';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();

                    // 3) Release memory
                    URL.revokeObjectURL(href);
                  } catch (err) {
                    console.error(err);
                    toast.error('Fail to download file!');
                    setDownloading(false);
                  } finally {
                    setDownloading(false);
                  }
                }}
                disabled={downloading}
                className=" bg-themeBlue hover:bg-blue-00 rounded px-3 py-2"
              >
                <div className=" flex items-center gap-2">
                  {!downloading ? (
                    <svg
                      className=" fill-white"
                      height="20px"
                      width="20px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path
                            d="M385.766,403.567c-3.337-3.337-8.73-3.337-12.066,0l-19.567,19.567v-98.867c0-4.71-3.823-8.533-8.533-8.533
			c-4.71,0-8.533,3.823-8.533,8.533v98.867L317.5,403.567c-3.337-3.337-8.73-3.337-12.066,0c-3.336,3.336-3.336,8.73,0,12.066
			l34.133,34.133c1.664,1.664,3.849,2.5,6.033,2.5c2.185,0,4.369-0.836,6.033-2.5l34.133-34.133
			C389.103,412.297,389.103,406.904,385.766,403.567z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M345.6,256c-70.579,0-128,57.421-128,128s57.421,128,128,128s128-57.421,128-128S416.179,256,345.6,256z M345.6,494.933
			c-61.167,0-110.933-49.766-110.933-110.933S284.433,273.067,345.6,273.067S456.533,322.833,456.533,384
			S406.767,494.933,345.6,494.933z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M226.133,469.333H55.467V409.6c0-4.71-3.823-8.533-8.533-8.533c-4.71,0-8.533,3.823-8.533,8.533v68.267
			c0,4.71,3.823,8.533,8.533,8.533h179.2c4.71,0,8.533-3.823,8.533-8.533S230.844,469.333,226.133,469.333z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M46.933,366.933c-4.71,0-8.533,3.823-8.533,8.533S42.223,384,46.933,384h0.085c4.71,0,8.491-3.823,8.491-8.533
			S51.644,366.933,46.933,366.933z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M394.3,139.034L257.766,2.5c-1.596-1.604-3.772-2.5-6.033-2.5h-204.8C42.223,0,38.4,3.823,38.4,8.533v332.8
			c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533V17.067H243.2v128c0,4.71,3.823,8.533,8.533,8.533h128v76.8
			c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-85.333C396.8,142.805,395.904,140.629,394.3,139.034z M260.267,136.533
			V29.133l107.401,107.401H260.267z"
                          />
                        </g>
                      </g>
                    </svg>
                  ) : (
                    <Loader color="green" style={{ '--loader-color': '#eef3ef' }} size={'xs'} />
                  )}
                  <p className=" text-white"> Download</p>
                </div>
              </button>

              <div className="sm:mt-8 mt-6 px-2">
                <p className={`font-semibold mb-4 ${status === 'expired' ? 'text-red-600' : 'text-green-600'}`}>
                  {status === 'expired' ? 'Late Submission: ' : 'Submit before: '} {formatDate(deadline)} {' / '}
                  {deadline.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </p>

                <label className="block font-semibold mb-1">
                  Upload Your Answer: ( only .pdf, .docx, .zip file allowed)
                </label>
                <input type="file" accept=".pdf,.docx,.zip" className="border  w-full" onChange={handleFileChange} />
                <div className="mt-4  py-2 ">
                  {!submitting ? (
                    !submit ? (
                      <button className="bg-blue-500 text-white px-4 py-2 rounded " onClick={handelSubmit}>
                        Submit
                      </button>
                    ) : (
                      <>
                        <svg
                          width="45px"
                          height="45px"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          className="fill-themeBlue"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M905.92 237.76a32 32 0 0 0-52.48 36.48A416 416 0 1 1 96 512a418.56 418.56 0 0 1 297.28-398.72 32 32 0 1 0-18.24-61.44A480 480 0 1 0 992 512a477.12 477.12 0 0 0-86.08-274.24z" />
                          <path d="M630.72 113.28A413.76 413.76 0 0 1 768 185.28a32 32 0 0 0 39.68-50.24 476.8 476.8 0 0 0-160-83.2 32 32 0 0 0-18.24 61.44zM489.28 86.72a36.8 36.8 0 0 0 10.56 6.72 30.08 30.08 0 0 0 24.32 0 37.12 37.12 0 0 0 10.56-6.72A32 32 0 0 0 544 64a33.6 33.6 0 0 0-9.28-22.72A32 32 0 0 0 505.6 32a20.8 20.8 0 0 0-5.76 1.92 23.68 23.68 0 0 0-5.76 2.88l-4.8 3.84a32 32 0 0 0-6.72 10.56A32 32 0 0 0 480 64a32 32 0 0 0 2.56 12.16 37.12 37.12 0 0 0 6.72 10.56zM230.08 467.84a36.48 36.48 0 0 0 0 51.84L413.12 704a36.48 36.48 0 0 0 51.84 0l328.96-330.56A36.48 36.48 0 0 0 742.08 320l-303.36 303.36-156.8-155.52a36.8 36.8 0 0 0-51.84 0z" />
                        </svg>
                      </>
                    )
                  ) : (
                    <Loader></Loader>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className=" sm:max-w-2xl mx-auto sm:mt-6  mt-4 sm:p-6 bg-white sm:shadow-md rounded-lg sm:border border-gray-200">
          <div className="flex items-center w-fit mx-auto space-x-3 text-center">
            {/* <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg> */}
            <h2 className="text-xl font-semibold text-green-600">Assignment Submitted</h2>
          </div>
          <p className="mt-2 sm:disabled hidden mx-auto w-fit text-center">
            {' '}
            Your response has been submitted successfully.
          </p>
          <div className=" sm:mt-4">
            {assignment.isFeedbackDone ? (
              <div>
                <h1 className=" mt-2 text-lg font-semibold">Score:</h1>
                <p>{assignment.score}</p>

                <h1 className=" mt-2 text-lg font-semibold ">Feedback:</h1>
                <p className=" sm:text-base text-sm mt-2 sm:h-[250px] h-[140px] w-full overflow-scroll p-2 pt-4 shadow-inner shadow-black/30 rounded-md text-themeGray6">
                  {assignment.feedback}
                </p>
              </div>
            ) : (
              <p className=" mx-auto w-fit font-medium">Feedback in pending...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
