import { Loader, Menu } from '@mantine/core';
import { Link } from '@tanstack/react-router';

import { useAuth } from '../../context/AuthContext';
import { CategoryIn } from '../../interface/courseInterface';
type props = {
  children: string | JSX.Element;
  items: CategoryIn[];
  isLoading: boolean;
};

function Courses({ children, items, isLoading }: props) {
  return (
    <Menu trigger="click-hover" closeDelay={200} position="bottom-start" shadow="md" radius={'md'} width={210}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown bg="#FAFAFA">
        {isLoading ? (
          <Menu.Item>
            <Loader size="sm" color="#307EE1" />
          </Menu.Item>
        ) : (
          items.map((item) => (
            <Link key={item.id} to={`/courses/category/${item.categorySlug}`}>
              <Menu.Item c="#949697" className="group" m={0}>
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
              </Menu.Item>
            </Link>
          ))
        )}
        {/* <Menu.Item c="#307EE1" className="font-medium">
          View all Courses
        </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
}

type profileType = {
  children: string | JSX.Element;
};

function Profile({ children }: profileType) {
  const { user, logOut } = useAuth();
  return (
    <Menu trigger="click-hover" closeDelay={200} position="bottom-end" shadow="md" radius={'md'} width={260}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown bg="#FAFAFA">
        <Menu.Label>
          <div>
            <h2 className=" font-semibold text-black text-lg ">{user?.name}</h2>
            <p className=" font-normal text-themeGray text-sm text-wrap mt-1">{user?.email}</p>
          </div>
        </Menu.Label>
        <Menu.Divider mb={'md'} />
        {[
          {
            label: 'profile',
            value: 'profile',
          },
          {
            label: 'My Purchases',
            value: 'purchases',
          },
          {
            label: 'Settings',
            value: 'setting',
          },
        ].map((item) => (
          <Link key={item.value} to={`/user/${item.value}`}>
            <Menu.Item c={'#949697'} className="group">
              <div className=" flex justify-between">
                <span className=" group-hover:text-[#307EE1] text-sm capitalize">{item.label}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  className=" fill-[#307EE1] hidden group-hover:block -rotate-90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 13L6 8.75972L6.71667 8L10 11.4982L13.2833 8.01767L14 8.77739L10 13Z" />
                </svg>
              </div>
            </Menu.Item>
          </Link>
        ))}

        <Menu.Item c={'#307EE1'} className=" group" onClick={logOut}>
          <span className="font-medium group-hover:text-red-500">Logout</span>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function Login({ children }: { children: JSX.Element }) {
  return (
    <Menu trigger="click-hover" closeDelay={200} position="bottom-end" shadow="md" radius={'md'} width={120}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown bg="#FAFAFA">
        {[
          {
            label: 'Login',
            value: 'login',
          },
          {
            label: 'Sign Up',
            value: 'signup',
          },
        ].map((item) => (
          <Link key={item.value} to={`/${item.value}`}>
            <Menu.Item c={'#949697'} className="group">
              <div className=" flex justify-between">
                <span className=" group-hover:text-[#307EE1] text-sm capitalize">{item.label}</span>
                {/* <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  className=" fill-[#307EE1] hidden group-hover:block -rotate-90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 13L6 8.75972L6.71667 8L10 11.4982L13.2833 8.01767L14 8.77739L10 13Z" />
                </svg> */}
              </div>
            </Menu.Item>
          </Link>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default {
  Profile,
  Courses,
  Login,
};
