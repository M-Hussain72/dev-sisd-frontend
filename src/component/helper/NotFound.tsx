import { useNavigate } from '@tanstack/react-router';
import Button from '../ui/Button';

export default function NotFound({ message, search }: { message: string; search?: string }) {
  const navigate = useNavigate();
  return (
    <div className="mb-[13%]  px-10 my-10 max-w-[800px] ">
      {!search ? (
        <h1 className=" mt-[30px] text-4xl text-themeBlack">404 - Course Not Found</h1>
      ) : (
        <h1 className=" mt-[30px] text-4xl text-themeBlack"> Sorry, we couldn’t find any results for "{search}"</h1>
      )}
      <h1 className=" text-themeBlack font-semibold mt-6 text-2xl  "> {message}</h1>
      {search && (
        <ul className="list-disc list-inside mt-2">
          <li>Check your spelling.</li>
          <li>Try using more general terms.</li>
          <li>Experiment with different keywords.</li>
        </ul>
      )}
      {!search && (
        <Button className=" mt-6" onClick={() => navigate({ to: '/' })}>
          Go to Home
        </Button>
      )}
    </div>
  );
}
