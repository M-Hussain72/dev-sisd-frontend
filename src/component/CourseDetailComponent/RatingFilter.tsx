import { Rating } from '@mantine/core';

interface props {
  selectedRating: number;
  setSelectedRating: React.Dispatch<React.SetStateAction<number>>;
  isMobile?: boolean;
}

export default function RatingFilter({ selectedRating, setSelectedRating, isMobile = false }: props) {
  return (
    <>
      <ol className=" space-y-4 ">
        {[5, 4, 3, 2, 1].map((value) => (
          <li
            key={value}
            value={value}
            onClick={() => {
              setSelectedRating((prev) => (prev === value ? 0 : value));
            }}
            className=" flex gap-2 items-center "
          >
            <Rating
              value={value}
              size={isMobile ? 'sm' : 'md'}
              className={
                'gap-1 cursor-pointer ' + (selectedRating !== 0 && selectedRating !== value ? ' opacity-50 ' : ' opacity-1')
              }
              color="#FFD05A"
              readOnly
            />
            <span
              className={
                ' cursor-pointer text-themeBlue font-light sm:text-base text-sm ' +
                (selectedRating !== 0 && selectedRating !== value ? ' opacity-50 ' : ' opacity-1')
              }
            >
              {' '}
              20%
            </span>
            {selectedRating === value && (
              <button className=" sm:ml-2">
                {' '}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.69498 10.295C4.42161 10.5683 3.9784 10.5683 3.70503 10.295C3.43166 10.0216 3.43166 9.57839 3.70503 9.30503L6.01005 7L3.70503 4.69497C3.43166 4.42161 3.43166 3.97839 3.70503 3.70503C3.97839 3.43166 4.42161 3.43166 4.69497 3.70503L7 6.01005L9.30503 3.70503C9.57839 3.43166 10.0216 3.43166 10.295 3.70502C10.5683 3.97839 10.5683 4.42161 10.295 4.69497L7.98995 7L10.295 9.30503C10.5683 9.57839 10.5683 10.0216 10.295 10.295C10.0216 10.5683 9.57839 10.5683 9.30503 10.295L7 7.98995L4.69498 10.295Z"
                    fill="#949697"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 6.09677C0 2.72962 2.72962 0 6.09677 0H7.90323C11.2704 0 14 2.72962 14 6.09677V7.90323C14 11.2704 11.2704 14 7.90323 14H6.09677C2.72962 14 0 11.2704 0 7.90323V6.09677ZM6.09677 1.35484C3.47787 1.35484 1.35484 3.47787 1.35484 6.09677V7.90323C1.35484 10.5221 3.47787 12.6452 6.09677 12.6452H7.90323C10.5221 12.6452 12.6452 10.5221 12.6452 7.90323V6.09677C12.6452 3.47787 10.5221 1.35484 7.90323 1.35484H6.09677Z"
                    fill="#949697"
                  />
                </svg>
              </button>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}
