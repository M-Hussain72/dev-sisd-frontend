import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

export default function SearchModal({ openButton, children }: { openButton: JSX.Element; children: JSX.Element }) {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  return (
    <>
      <Modal opened={opened} onClose={close} fullScreen={isMobile} transitionProps={{ transition: 'fade', duration: 200 }}>
        <div> {children}</div>
      </Modal>

      <button onClick={open}>{openButton}</button>
    </>
  );
}
