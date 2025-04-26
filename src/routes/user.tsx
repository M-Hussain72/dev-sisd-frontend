import { Loader } from '@mantine/core';
import {
  createFileRoute,
  Navigate,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
  useRouterState,
} from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Route = createFileRoute('/user')({
  loader: async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    await new Promise((resolve) => setTimeout(resolve, 700)); // Simulate loading

    if (location.pathname === '/user' || location.pathname === '/user/') {
      return redirect({ to: '/user/profile' });
    }
    return null;
  },
  component: RouteComponent,
  pendingComponent: () => {
    return (
      <div className=" h-[400px]">
        <div className=" mt-16 w-fit mx-auto">
          <Loader size={'xl'} />
        </div>
      </div>
    );
  },
  notFoundComponent: () => {
    return <Navigate to="/user/profile" replace />;
  },
});

// export default function UserIndexRedirect() {
//   // Immediately redirects to '/user/profile'

// }

const navBar = [
  {
    label: 'profile',
    value: 'profile',
  },
  {
    label: 'My Purchases',
    value: 'purchases',
  },
  {
    label: 'Setting',
    value: 'setting',
  },
];

function RouteComponent() {
  const currentLabel = useLocation();
  const lastSegment = currentLabel.pathname.split('/').pop();
  const [selected, setSelected] = useState(lastSegment || 'profile');
  const { logOut } = useAuth();
  // const isPending = useRouterState({ select: (s) => s.status === 'pending' });

  const navigate = useNavigate();

  function handleChange(value: string) {
    setSelected(value);
    navigate({ to: `/user/${value}` });
  }
  return (
    <div className=" relative  md:mr-10 md:flex gap-4 min-h-dvh">
      <div className=" md:w-[244px] md:mt-16">
        <ul className="  h-fit w-full  md:py-[24px] py-2 pr-1 lg:border-r-[2px] lg:border-y-[2px] lg:border-l-0  border-[1px] rounded-xl border-[#eeeeee] lg:rounded-l-none  lg:rounded-r-2xl shadow-sm ">
          {navBar.map((item, index) => (
            <li
              key={index}
              className={
                '  text-base text-wrap my-2 min-h-[50px] leading-[50px] capitalize ' +
                (selected === item.value
                  ? ' border-l-[5px]  pl-[10px] pr-[15px] border-l-themeBlue text-themeBlue cursor-default'
                  : ' hover:pl-[10px] hover:border-l-[5px]  pl-[15px] pr-[15px] hover:border-l-[#94969790] hover:bg-[#9496972d]  text-themeGray   cursor-pointer')
              }
              onClick={() => handleChange(item.value)}
            >
              {item.label}
            </li>
          ))}
          <li
            className="text-base text-themeGray  text-wrap my-2 min-h-[50px] leading-[50px] capitalize hover:text-red-500 cursor-pointer pl-[15px]"
            onClick={logOut}
          >
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className=" flex-1 max-w-[904px] md:mx-8 max-md:px-4 mx-auto  my-8 mb-24">
        <Outlet />
      </div>
    </div>
  );
}
