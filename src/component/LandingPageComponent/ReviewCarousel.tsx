import { useState } from 'react';
import { Carousel, Embla } from '@mantine/carousel';
import reviewWomen from '../../assets/asianWomen1.png';
import reviewMen from '../../assets/bigSimleMen.png';
import reviewMen2 from '../../assets/pinkWomen.png';
import { Rating } from '@mantine/core';
import ControlCarousel from '../ui/ControlCarousel';
const testimonials = [
  {
    id: 2,
    name: 'John Doe',
    uni: 'University Graduate',
    feedback: 'Great materials and easy-to-follow lessons!',
    image: reviewMen,
  },
  {
    id: 1,
    name: 'Selena Marie Gomez',
    uni: 'University Graduate',
    feedback:
      'The design and development course improved my understanding of the subject and enhanced my ability to answer questions effectively, leading to better grades. The materials are well-organized and greatly assist in revision.',
    image: reviewWomen,
  },
  {
    id: 3,
    name: 'Jane Smith',
    uni: 'University Graduate',
    feedback: 'I highly recommend this to anyone wanting to learn.',
    image: reviewMen2,
  },
  {
    id: 4,
    name: 'Selena Marie Gomez',
    uni: 'University Graduate',
    feedback: 'The course was amazing and improved my understanding.',
    image: reviewWomen,
  },
];

const ReviewCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [embla, setEmbla] = useState<Embla>();

  const handleSlideChange = () => {
    if (embla) {
      setActiveIndex(embla.selectedScrollSnap()); // Get the active slide index
    }
  };

  return (
    <div className="  max-xs:mx-1 my-20 ">
      <div className=" xs:mx-0 mx-4">
        {' '}
        <ControlCarousel heading="What Our Students Say About Us" embla={embla} />
      </div>
      <div className=" relative mt-20 ">
        <div className=" -z-10 absolute -top-4 right-[20%] w-[20px] h-[20px] rounded-full bg-[#FEA9CA]"></div>
        <div className=" -z-10 absolute  bottom-[8%]  left-[10%]  w-[20px] h-[20px] rounded-full bg-[#61B5D1]"></div>
        <div className=" lg:block hidden absolute bottom-[20%] left-[22%]">
          <svg width="135" height="100" viewBox="0 0 135 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M109.173 34.9474C108.797 36.4686 108.647 37.7217 108.611 38.7097H110.921C117.307 38.7097 123.432 41.2586 127.947 45.7958C132.463 50.333 135 56.4867 135 62.9032V75.8064C135 82.223 132.463 88.3767 127.947 92.9139C123.432 97.451 117.307 100 110.921 100H98.0789C91.6928 100 85.5682 97.451 81.0526 92.9139C76.5369 88.3767 74 82.223 74 75.8065V69.3548C74 49.5968 77.2985 32.379 85.2702 19.9583C93.4576 7.2014 106.267 1.86311e-06 123.763 3.33587e-07C125.715 1.62939e-07 127.474 1.18391 128.217 2.99769C128.959 4.81146 128.539 6.89629 127.152 8.27648C114.72 20.6495 110.502 29.5816 109.173 34.9474ZM121.137 86.0709C118.427 88.7932 114.753 90.3226 110.921 90.3226L98.0789 90.3226C94.2473 90.3226 90.5725 88.7932 87.8631 86.0709C85.1537 83.3486 83.6316 79.6564 83.6316 75.8064V69.3548C83.6316 50.4032 86.844 35.3629 93.3647 25.203C97.6571 18.5149 103.506 13.7373 111.357 11.3688C104.484 19.9518 101.206 27.0401 99.8267 32.6107C98.8838 36.4184 98.8444 39.4577 99.1186 41.6878C99.2549 42.7967 99.4666 43.6877 99.6715 44.3567C99.7738 44.6908 99.8741 44.9684 99.9618 45.1891C100.006 45.2995 100.046 45.3956 100.083 45.4774C100.101 45.5183 100.118 45.5556 100.133 45.5894L100.156 45.6373L100.167 45.6593L100.172 45.6697C100.174 45.6748 100.177 45.6799 104.5 43.5484L100.177 45.6799C100.986 47.337 102.663 48.3871 104.5 48.3871L110.921 48.3871C114.753 48.3871 118.427 49.9165 121.137 52.6388C123.846 55.3611 125.368 59.0533 125.368 62.9032V75.8064C125.368 79.6564 123.846 83.3486 121.137 86.0709Z"
              fill="#F4F5F6"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M35.7499 34.9474C35.367 36.4686 35.2148 37.7217 35.1786 38.7097H37.5263C44.0171 38.7097 50.2421 41.2586 54.8318 45.7958C59.4215 50.333 62 56.4867 62 62.9032V75.8064C62 82.223 59.4215 88.3767 54.8318 92.9139C50.2421 97.451 44.0171 100 37.5263 100H24.4737C17.9829 100 11.7579 97.451 7.16818 92.9139C2.57848 88.3767 1.51463e-06 82.223 9.53675e-07 75.8065L0 69.3548C-1.72731e-06 49.5968 3.35262 32.379 11.4549 19.9583C19.7766 7.2014 32.7964 1.5546e-06 50.5789 0C52.5629 -1.73446e-07 54.3507 1.18391 55.1055 2.99768C55.8604 4.81146 55.433 6.89628 54.0235 8.27648C41.3871 20.6495 37.1005 29.5816 35.7499 34.9474ZM47.9096 86.0709C45.1558 88.7932 41.4208 90.3226 37.5263 90.3226L24.4737 90.3226C20.5792 90.3226 16.8442 88.7932 14.0904 86.0709C11.3366 83.3486 9.78947 79.6564 9.78947 75.8064V69.3548C9.78947 50.4032 13.0545 35.3629 19.6821 25.203C24.0449 18.5149 29.9901 13.7373 37.9689 11.3688C30.9838 19.9518 27.6522 27.0401 26.2501 32.6107C25.2917 36.4184 25.2517 39.4577 25.5303 41.6878C25.6689 42.7967 25.8841 43.6877 26.0923 44.3567C26.1963 44.6908 26.2983 44.9684 26.3874 45.1891C26.432 45.2995 26.4734 45.3956 26.5102 45.4774C26.5286 45.5183 26.5459 45.5556 26.5619 45.5894L26.5849 45.6373L26.5956 45.6593L26.6007 45.6697C26.6032 45.6748 26.6057 45.6799 31 43.5484L26.6057 45.6799C27.4283 47.337 29.1328 48.3871 31 48.3871L37.5263 48.3871C41.4208 48.3871 45.1558 49.9165 47.9096 52.6388C50.6634 55.3611 52.2105 59.0533 52.2105 62.9032V75.8064C52.2105 79.6564 50.6634 83.3486 47.9096 86.0709Z"
              fill="#F4F5F6"
            />
          </svg>
        </div>
        <div className=" lg:block hidden absolute bottom-0 right-[22%]">
          <svg width="135" height="100" viewBox="0 0 135 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.8267 65.0526C26.2034 63.5314 26.3531 62.2783 26.3888 61.2903H24.079C17.6928 61.2903 11.5682 58.7414 7.05257 54.2042C2.53688 49.667 -5.60951e-07 43.5133 0 37.0968L1.12804e-06 24.1935C1.68899e-06 17.777 2.53688 11.6233 7.05257 7.08613C11.5682 2.54896 17.6928 -5.58293e-07 24.079 0L36.9211 1.12269e-06C43.3072 1.68099e-06 49.4318 2.54895 53.9474 7.08612C58.4631 11.6233 61 17.777 61 24.1935V30.6452C61 50.4032 57.7015 67.621 49.7298 80.0417C41.5424 92.7986 28.7326 100 11.2368 100C9.28486 100 7.52593 98.8161 6.78324 97.0023C6.04057 95.1885 6.46102 93.1037 7.84787 91.7235C20.2804 79.3505 24.4979 70.4184 25.8267 65.0526ZM13.8631 13.9291C16.5725 11.2068 20.2473 9.67742 24.079 9.67742L36.9211 9.67741C40.7527 9.67741 44.4275 11.2068 47.1369 13.9291C49.8463 16.6514 51.3684 20.3436 51.3684 24.1936V30.6452C51.3684 49.5968 48.156 64.6371 41.6353 74.797C37.3429 81.4851 31.4936 86.2627 23.6435 88.6312C30.5159 80.0482 33.7938 72.9599 35.1733 67.3893C36.1162 63.5816 36.1556 60.5423 35.8814 58.3122C35.7451 57.2033 35.5334 56.3123 35.3285 55.6433C35.2262 55.3092 35.1259 55.0316 35.0382 54.8109C34.9943 54.7005 34.9536 54.6044 34.9174 54.5226C34.8992 54.4817 34.8822 54.4444 34.8665 54.4106L34.8439 54.3627L34.8334 54.3407L34.8283 54.3303C34.8258 54.3252 34.8234 54.3201 30.5 56.4516L34.8234 54.3201C34.0141 52.663 32.3371 51.6129 30.5 51.6129L24.079 51.6129C20.2473 51.6129 16.5725 50.0835 13.8631 47.3612C11.1537 44.6389 9.63158 40.9467 9.63158 37.0968L9.63158 24.1935C9.63158 20.3436 11.1537 16.6514 13.8631 13.9291Z"
              fill="#F4F5F6"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M99.2501 65.0526C99.633 63.5314 99.7852 62.2784 99.8214 61.2903H97.4737C90.9829 61.2903 84.7579 58.7414 80.1682 54.2042C75.5785 49.667 73 43.5133 73 37.0968V24.1936C73 17.777 75.5785 11.6233 80.1682 7.08613C84.7579 2.54896 90.9829 5.84893e-06 97.4737 6.41637e-06L110.526 7.55747e-06C117.017 4.9552e-07 123.242 2.54896 127.832 7.08613C132.422 11.6233 135 17.777 135 24.1936V30.6452C135 50.4033 131.647 67.621 123.545 80.0417C115.223 92.7986 102.204 100 84.4211 100C82.4371 100 80.6493 98.8161 79.8945 97.0023C79.1396 95.1885 79.5669 93.1037 80.9765 91.7235C93.6128 79.3505 97.8995 70.4184 99.2501 65.0526ZM87.0904 13.9291C89.8442 11.2068 93.5792 9.67743 97.4737 9.67743L110.526 9.67742C114.421 9.67742 118.156 11.2068 120.91 13.9291C123.663 16.6514 125.211 20.3436 125.211 24.1936V30.6452C125.211 49.5968 121.945 64.6371 115.318 74.797C110.955 81.4851 105.01 86.2627 97.0311 88.6312C104.016 80.0482 107.348 72.9599 108.75 67.3893C109.708 63.5816 109.748 60.5423 109.47 58.3122C109.331 57.2033 109.116 56.3123 108.908 55.6433C108.804 55.3092 108.702 55.0317 108.613 54.8109C108.568 54.7005 108.527 54.6045 108.49 54.5226C108.471 54.4817 108.454 54.4444 108.438 54.4107L108.415 54.3627L108.404 54.3408L108.399 54.3303C108.397 54.3252 108.394 54.3201 104 56.4516L108.394 54.3201C107.572 52.6631 105.867 51.6129 104 51.6129L97.4737 51.6129C93.5792 51.6129 89.8442 50.0835 87.0904 47.3612C84.3366 44.6389 82.7895 40.9467 82.7895 37.0968L82.7895 24.1936C82.7895 20.3436 84.3366 16.6514 87.0904 13.9291Z"
              fill="#F4F5F6"
            />
          </svg>
        </div>
        <Carousel
          getEmblaApi={setEmbla}
          withControls={false}
          withIndicators={false}
          height={'auto'}
          loop
          slideSize="33%"
          align="center"
          onSlideChange={handleSlideChange}
          initialSlide={1}
        >
          {testimonials.map((testimonial, index) => (
            <Carousel.Slide key={testimonial.id}>
              <div
                className={`transition-all duration-500  ${
                  index === activeIndex ? 'scale-105 lg:w-[550px]  py-3 ' : 'scale-90 py-3 '
                }`}
              >
                {index === activeIndex ? (
                  <div className=" h-[400px] sm:w-auto w-[140px]  items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className=" md:w-[180px] md:h-[180px]  sm:w-[140px] sm:h-[140px] w-[110px] h-[110px]  object-cover rounded-full mx-auto mb-4"
                    />
                    <p className="text-center font-semibold text-xl">{testimonial.name}</p>
                    <p className="text-center text-[#949697] md:my-3 my-2 xs:text-sm text-xs">{testimonial.uni}</p>
                    <div className=" mx-auto w-fit">
                      <Rating value={4} size={'xs'} fractions={2} className="gap-1" color="#FFD05A" readOnly />
                    </div>
                    <p className="text-center md:mt-4 mt-2 text-[#949697] md:text-sm xs:text-xs text-[10px]">
                      {testimonial.feedback}
                    </p>
                  </div>
                ) : (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className=" text-end md:w-[110px] md:h-[110px] sm:w-[80px] sm:h-[80px] w-[60px] h-[60px] object-cover rounded-full mx-auto"
                  />
                )}
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ReviewCarousel;
