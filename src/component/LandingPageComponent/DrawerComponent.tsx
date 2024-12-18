import { useDisclosure } from '@mantine/hooks';
import { Burger, Drawer } from '@mantine/core';

type props = {
  children: string | JSX.Element | JSX.Element[];
};

export default function DrawerComponent({ children }: props) {
  const [opened, { close, toggle }] = useDisclosure();
  return (
    <>
      <Burger
        opened={opened}
        color="black"
        size="sm"
        onClick={toggle}
        aria-label="Toggle navigation"
      />
      <Drawer
        position="left"
        size="mantine-breakpoint-sm"
        style={{}}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        className=" lg:hidden "
      >
        {children}
      </Drawer>
    </>
  );
}
