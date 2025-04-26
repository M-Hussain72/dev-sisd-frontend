import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import logo from '../assets/logo.svg';
import Button from './ui/Button.tsx';
import DrawerComponent from './LandingPageComponent/DrawerComponent.tsx';
import { Avatar, Loader } from '@mantine/core';
import { useState } from 'react';
import AutoCompleteSearchInput from './AutoCompleteSearchInput.tsx';
import { useAuth, User } from '../context/AuthContext.tsx';
import createAuthAxios from '../hook/useAuthAxios.tsx';
import { useQuery } from '@tanstack/react-query';
import DropDown from './helper/DropDown.tsx';
import CartIcon from './helper/CartIcon.tsx';
import categoryHttp from '../http/categoriesHttp.ts';
import SearchModal from './helper/SearchModal.tsx';
import { useMediaQuery } from '@mantine/hooks';

const Category = [
  'design',
  'IT & Software',
  'Business',
  'Finance & Accounting',
  'Marketing',
  'Health & Fitness',
  'Development',
];

const Header = () => {
  const navigation = useNavigate();
  const [opened, setOpened] = useState(true);
  const { isAuthenticate, user, getUser } = useAuth();
  const authAxios = createAuthAxios();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery('(max-width: 40em)');

  const { isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      console.log('call query user');
      return await getUser({ authAxios });
    },
    enabled: isAuthenticate && !!!user,
  });

  const { isLoading: categoryLoading, data } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryHttp.getCategories,
    // Adjust staleTime as needed; here we're caching for 10 minutes.
    staleTime: Infinity,
  });

  return (
    <div className=" xs:pb-24 pb-[65px]">
      {!isLoading && (
        <div className=" top-0 left-0 right-0 fixed z-[90] w-[100%] bg-white shadow-md  ">
          <nav className=" flex  max-w-[1440px]  gap-4 justify-between xs:h-[75px] h-[60px] items-center mx-auto px-4   ">
            <div className=" flex w-full items-center  min-w-0">
              {/* DrawerComponent for mobile Screen  */}
              <div>
                <div className=" mr-1 xs:mr-4 lg:hidden p-2   hover:bg-gray-100 rounded-full">
                  <DrawerComponent>
                    <div className=" mt-[45px] w-full min-w-[180px]">
                      <ul className="    px-2 items-center space-y-4   w-full capitalize text-[#949697] text-[16px]  ">
                        <li>
                          <div
                            className=" flex group hover:text-[#307EE1] py-1 px-2  hover:bg-gray-100 rounded-md cursor-pointer"
                            onClick={() => setOpened((prev) => !prev)}
                          >
                            Courses
                            <svg
                              width="20"
                              height="21"
                              viewBox="0 0 20 21"
                              className="mt-[2px] fill-[#949697]  group-hover:fill-[#307EE1]"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M10 13L6 8.75972L6.71667 8L10 11.4982L13.2833 8.01767L14 8.77739L10 13Z" />
                            </svg>
                          </div>
                          {opened && (
                            <ul className=" pl-5 mt-1 space-y-2">
                              {data
                                ? data.map((item) => (
                                    <li className="hover:text-[#307EE1] py-1 px-2  hover:bg-gray-100 rounded-md cursor-pointer">
                                      <Link key={item.id} to={`/courses/category/${item.categorySlug}`}>
                                        <div className="flex justify-between">
                                          <span className="group-hover:text-[#307EE1] text-sm">{item.categoryName}</span>
                                          <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 21"
                                            className="fill-[#307EE1] hidden group-hover:block -rotate-90"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path d="M10 13L6 8.75972L6.71667 8L10 11.4982L13.2833 8.01767L14 8.77739L10 13Z" />
                                          </svg>
                                        </div>
                                      </Link>
                                    </li>
                                  ))
                                : categoryLoading && <Loader size="sm" color="#307EE1" />}
                            </ul>
                          )}
                        </li>

                        <li className="hover:text-[#307EE1] py-1 px-2  hover:bg-gray-100 rounded-md cursor-pointer">
                          Blogs
                        </li>
                        <li className="hover:text-[#307EE1] py-1 px-2   hover:bg-gray-100 rounded-md cursor-pointer">
                          Events
                        </li>
                        <li className="hover:text-[#307EE1] py-1 px-2   hover:bg-gray-100 rounded-md cursor-pointer">
                          Contact us
                        </li>
                      </ul>
                    </div>
                  </DrawerComponent>
                </div>
              </div>
              <img
                src={logo}
                alt="Logo"
                className="xs:w-[85px] w-[65px] h-full object-contain"
                onClick={() => navigation({ to: '/' })}
              />

              {/* search bar on header */}

              {!isMobile && <AutoCompleteSearchInput />}
            </div>

            <div className="flex gap-6  ">
              <ul className=" lg:flex hidden ml-4 items-center  justify-evenly  w-[345px] capitalize text-[#949697] text-[16px]  ">
                <DropDown.Courses isLoading={categoryLoading} items={data || []}>
                  <li className=" flex group hover:text-[#307EE1] cursor-pointer">
                    Courses
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      className="mt-[2px] fill-[#949697] group-hover:fill-[#307EE1]"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 13L6 8.75972L6.71667 8L10 11.4982L13.2833 8.01767L14 8.77739L10 13Z" />
                    </svg>
                  </li>
                </DropDown.Courses>

                <li className="hover:text-[#307EE1] cursor-pointer">
                  <Link to="/blogs">Blogs</Link>
                </li>
                {/* <li className="hover:text-[#307EE1] cursor-pointer">Events</li> */}
                <li className="hover:text-[#307EE1] cursor-pointer">
                  <Link to="/contact">Contact us</Link>
                </li>
              </ul>
              <div className="flex items-center gap-4">
                {/* Search Icon  */}
                {isMobile && (
                  <SearchModal
                    openButton={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className=" cursor-pointer"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.7961 20.2041L17.3439 15.75C18.6788 14.0104 19.302 11.8282 19.0871 9.64607C18.8723 7.4639 17.8354 5.44516 16.1868 3.99937C14.5383 2.55357 12.4015 1.78899 10.21 1.86071C8.01841 1.93244 5.9362 2.8351 4.3857 4.38559C2.83521 5.93608 1.93255 8.0183 1.86083 10.2098C1.7891 12.4014 2.55369 14.5382 3.99948 16.1867C5.44527 17.8353 7.46401 18.8722 9.64618 19.087C11.8284 19.3019 14.0106 18.6787 15.7501 17.3438L20.2061 21.8006C20.3107 21.9053 20.4349 21.9883 20.5717 22.0449C20.7084 22.1016 20.8549 22.1307 21.0029 22.1307C21.1509 22.1307 21.2975 22.1016 21.4342 22.0449C21.5709 21.9883 21.6952 21.9053 21.7998 21.8006C21.9044 21.696 21.9875 21.5717 22.0441 21.435C22.1007 21.2983 22.1299 21.1517 22.1299 21.0037C22.1299 20.8558 22.1007 20.7092 22.0441 20.5725C21.9875 20.4358 21.9044 20.3115 21.7998 20.2069L21.7961 20.2041ZM4.12512 10.5C4.12512 9.23915 4.499 8.0066 5.1995 6.95824C5.89999 5.90988 6.89563 5.09278 8.06051 4.61027C9.22539 4.12776 10.5072 4.00151 11.7438 4.2475C12.9804 4.49348 14.1164 5.10064 15.0079 5.9922C15.8995 6.88376 16.5066 8.01967 16.7526 9.2563C16.9986 10.4929 16.8724 11.7747 16.3898 12.9396C15.9073 14.1045 15.0902 15.1001 14.0419 15.8006C12.9935 16.5011 11.761 16.875 10.5001 16.875C8.80989 16.8733 7.1894 16.2011 5.99423 15.0059C4.79906 13.8107 4.12685 12.1902 4.12512 10.5Z"
                          fill="#949697"
                        />
                      </svg>
                    }
                  >
                    {/* <AutoCompleteSearchInput /> */}
                    <div>
                      <AutoCompleteSearchInput />
                    </div>
                  </SearchModal>
                )}

                {/* Cart icon with showing total items of cart */}
                <CartIcon />

                {!isAuthenticate ? (
                  <>
                    <DropDown.Login>
                      <Avatar src={null} className="sm:hidden block "></Avatar>
                    </DropDown.Login>
                    <div className=" hidden  sm:flex gap-2">
                      <button
                        onClick={() => navigation({ to: '/login' })}
                        className=" py-3 px-6 text-[#307EE1] text-nowrap bg-white border-[1px] border-[#307EE1] hover:bg-[#307EE1] hover:text-white   rounded-lg"
                      >
                        Log in
                      </button>
                      <Button onClick={() => navigation({ to: '/signup' })}>Sign up</Button>
                    </div>
                  </>
                ) : (
                  <div className=" flex items-center gap-4 ">
                    {/* notification Icon */}
                    {/* <svg
                      width="24"
                      height="25"
                      role="button"
                      className=" fill-[#949697] hover:fill-[#307EE1]"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.6259 9.65708C18.6259 7.0133 16.8939 4.73891 14.4565 3.81194C13.9604 3.02441 13.0554 2.5 12.0234 2.5C10.9931 2.5 10.0893 3.02276 9.59269 3.80823C7.15017 4.73147 5.42041 7.00402 5.42041 9.65708V12.2409C5.42041 12.4021 5.38068 12.6588 5.29742 12.9445C5.21454 13.2289 5.11 13.4684 5.02336 13.6074L5.02245 13.6088L3.94515 15.3132C3.47462 16.0581 3.36963 16.9073 3.66592 17.6695C3.96178 18.4306 4.62044 19.0093 5.47971 19.2863L5.48151 19.2869L5.48331 19.2875C6.44748 19.5944 7.42895 19.8315 8.41987 19.999C8.60747 20.5502 8.92989 21.0454 9.34643 21.4422C10.0274 22.0909 10.9847 22.5 12.023 22.5C13.704 22.5 15.136 21.4463 15.6279 19.9971C16.6146 19.8299 17.5918 19.5935 18.552 19.288C20.2813 18.7426 21.0299 16.8026 20.0924 15.3142L20.0916 15.313L19.0177 13.6139C18.9322 13.4706 18.8298 13.2296 18.7485 12.9472C18.6657 12.6596 18.6259 12.4024 18.6259 12.2409V9.65708ZM7.36322 9.65708C7.36322 7.67564 8.73208 5.99389 10.6166 5.42462C11.2734 5.25096 11.9834 5.20135 12.7383 5.29123L12.7419 5.29165C12.954 5.31615 13.1652 5.35677 13.3764 5.41059C15.2838 5.96701 16.6831 7.66551 16.6831 9.65708V12.2409C16.6831 12.6248 16.7653 13.056 16.8749 13.4367C16.9848 13.8184 17.1434 14.2226 17.3387 14.5451L17.3432 14.5526L18.4268 16.2669C18.7274 16.7449 18.4818 17.3609 17.9409 17.5313L17.9394 17.5317L17.938 17.5322C14.0932 18.7558 9.94577 18.756 6.10093 17.5328C5.74117 17.4164 5.56025 17.2131 5.48784 17.0269C5.41576 16.8414 5.414 16.5775 5.6097 16.2676L6.69014 14.5582L6.69122 14.5565C6.89536 14.2303 7.05786 13.8224 7.16944 13.4395C7.28094 13.0569 7.36322 12.6251 7.36322 12.2409V9.65708ZM13.1619 20.2705C12.4028 20.3107 11.6419 20.3109 10.8827 20.2709C11.1977 20.5068 11.5991 20.6493 12.023 20.6493C12.4514 20.6493 12.8475 20.5074 13.1619 20.2705Z"
                      />
                    </svg> */}

                    <DropDown.Profile>
                      <Avatar role="button" src={null} alt={user?.name} color="blue" className=" uppercase">
                        {user?.name[0]}
                        {user?.name.indexOf(' ') !== -1 && user?.name[user?.name.indexOf(' ') + 1]}
                      </Avatar>
                    </DropDown.Profile>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
