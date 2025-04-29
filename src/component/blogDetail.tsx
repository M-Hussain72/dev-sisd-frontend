import { Link, useParams } from '@tanstack/react-router';
import blogHttp from '../http/blogHttp';
import tempImg from '../public/robot.png';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Loader } from '@mantine/core';
import { formatDate } from '../utils/formatTime';
import ReactMarkdown from 'react-markdown';
import NotFound from './helper/NotFound';

export default function BlogDetail() {
  const { slug } = useParams({ from: '/blogs/$slug/' });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs', slug],
    queryFn: () => blogHttp.getBlogBySlug({ slug }),
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className=" mt-16 w-fit mx-auto h-dvh">
        <Loader size={'xl'} className="" />
      </div>
    );
  }
  return (
    <>
      {data != undefined ? (
        <div className="max-w-[900px] mx-auto px-4 mt-4 mb-20">
          <h1 className=" text-2xl font-semibold mt-4 capitalize">{data?.title}</h1>
          <div className=" mt-4 mb-4 flex items-center gap-1 text-themeGray6">
            {data.author && (
              <Avatar role="button" src={null} alt={data?.author} color="blue" className=" uppercase">
                {data?.author[0]}
                {data?.author.indexOf(' ') !== -1 && data?.author[data?.author.indexOf(' ') + 1]}
              </Avatar>
            )}
            <h3>{data.author}</h3>
            <h1>•</h1>
            <p> {formatDate(data.created_at)}</p>
          </div>

          <div className=" aspect-video  overflow-hidden rounded-[10px] mt-4  ">
            <img
              src={data?.poster}
              // onError={(e) => {
              //   // Prevent infinite loop in case default image also fails
              //   e.currentTarget.onerror = null;
              //   e.currentTarget.src = tempImg;
              // }}
              className=" h-full w-full    cursor-pointer"
            />
          </div>

          <div className=" my-20 mx-auto  ">
            <ReactMarkdown
              className={
                ' prose-strong:font-semibold  prose-headings:mb-4 text-themeGray prose-headings:mt-3 prose-headings:text-themeBlack prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl   '
              }
            >
              {data.content}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="max-w-[900px] mx-auto mt-10 flex flex-col items-center justify-center rounded-xl border p-10 text-center shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">Blog Not Found</h2>
          <p className="mt-2 text-gray-500">
            Oops! We can’t find the blog post you’re looking for. It may have been removed or the URL is incorrect.
          </p>
          <Link to="/blogs" className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Back to Blog List
          </Link>
        </div>
      )}
    </>
  );
}
