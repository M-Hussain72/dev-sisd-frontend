import { Link } from '@tanstack/react-router';
import { Avatar, Loader } from '@mantine/core';
import NotFound from './helper/NotFound';
import { useQuery } from '@tanstack/react-query';
import blogHttp from '../http/blogHttp';
import formatTime, { formatDate } from '../utils/formatTime';
export default function Blogs() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogHttp.getBlogs,
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
    <div className=" px-8 mb-32">
      <h1 className=" text-[42px] font-semibold text-themeBlack">Blogs</h1>
      <p className=" text-lg text-themeGray mt-4 ">
        We’re a leading marketplace platform for learning and teaching online. Explore some of our most popular content and
        learn something new.
      </p>
      {data && data?.length > 0 ? (
        <ul className=" mt-10 grid gap-8 grid-cols-1    min-[1250px]:grid-cols-4  min-[950px]:grid-cols-3  sm:grid-cols-2 grid-flow-row ">
          {data.map((item) => (
            <Link
              to={`/blogs/${item.slug}`}
              className="flex flex-col  min-h-[380px] max-w-[324px] w-full mx-auto  cursor-pointer shadow-sm hover:shadow-md  rounded-xl"
            >
              <div className=" aspect-video  overflow-hidden rounded-[10px]  ">
                <img src={item.poster} className=" h-full w-full    cursor-pointer" />
              </div>
              <h2 className=" px-2 flex-1 line-clamp-3 mt-4 text-xl">{item.title}</h2>
              <div className="px-2 mt-2 mb-4 flex items-center gap-1 text-themeGray6">
                <Avatar role="button" src={null} alt={item.author} color="blue" className=" uppercase">
                  {item.author[0]}
                  {item.author.indexOf(' ') !== -1 && item.author[item.author.indexOf(' ') + 1]}
                </Avatar>
                <h3>{item.author}</h3>
                <h1>•</h1>
                <p> {formatDate(item.created_at)}</p>
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center rounded-xl border p-10 text-center shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">Blogs Not Found</h2>
          <p className="mt-2 text-gray-500">
            {' '}
            No blog posts available yet. We’ll be adding fresh content very soon—stay tuned!
          </p>
        </div>
      )}
    </div>
  );
}
