import { Menu } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
type props = {
  children: string | JSX.Element;
  items: string[];
};

function Courses({ children, items }: props) {
  return (
    <Menu trigger="click-hover" closeDelay={200} position="bottom-start" shadow="md" radius={'md'} width={210}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown bg="#FAFAFA">
        {items.map((item) => (
          <Link
            key={item}
            to="/courses"
            search={{
              category: item,
            }}
          >
            <Menu.Item c={'#949697'} className="group" m={0}>
              <div className=" flex justify-between">
                <span className=" group-hover:text-[#307EE1] text-sm">{item}</span>
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

        <Menu.Item c={'#307EE1'} className=" font-medium">
          View all Courses
        </Menu.Item>
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
        {['Profile', 'My Purchases', 'Payment', 'Settings', 'Help Center'].map((item) => (
          <Link key={item}>
            <Menu.Item c={'#949697'} className="group">
              <div className=" flex justify-between">
                <span className=" group-hover:text-[#307EE1] text-sm">{item}</span>
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

export default {
  Profile,
  Courses,
};
