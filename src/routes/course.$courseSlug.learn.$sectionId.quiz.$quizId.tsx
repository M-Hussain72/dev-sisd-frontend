import { createFileRoute } from '@tanstack/react-router'
import Quiz from '../component/Quiz'
import QuizResult from '../component/QuizResult'
import { useQuery } from '@tanstack/react-query'
import { fetchLecture } from '../http/courseHttp'
import ErrorBlock from '../utils/ErrorBlock'
import NotFound from '../component/helper/NotFound'
import { Loader } from '@mantine/core'

export const Route = createFileRoute(
  '/course/$courseSlug/learn/$sectionId/quiz/$quizId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  const { authAxios } = Route.useRouteContext()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['quiz', params.quizId],
    queryFn: () =>
      fetchLecture({ lectureId: params.quizId, ...params, authAxios }),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 0,
  })

  if (isLoading) {
    return (
      <div className=" h-[400px]">
        <div className=" mt-16 w-fit mx-auto">
          <Loader size={'xl'} />
        </div>
      </div>
    )
  }
  if (isError) {
    return (
      <NotFound
        message={`We're sorry, but the Quiz you're looking for is not available at the moment. It may have been removed or is temporarily unavailable.`}
      />
    )
  }

  const question = data?.lecture.assessment ? data?.lecture.assessment : []

  if (!data?.lecture.assessment) {
    return (
      <NotFound
        message={`We're sorry, but the Quiz you're looking for is not available at the moment. It may have been removed or is temporarily unavailable.`}
      />
    )
  }
  return (
    <Quiz
      questions={question}
      title={data?.lecture.title || ''}
      completed={data?.progress?.completed || false}
      userAnswers={data.progress?.userAnswers || null}
      userScore={data.progress?.quizScore || null}
    />
  )
}
