import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useEffect } from 'react';

export default function SearchModal({ openButton, children }: { openButton: JSX.Element; children: JSX.Element }) {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && opened) {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [opened, close]);

  return (
    <>
      <Modal opened={opened} onClose={close} fullScreen={isMobile} transitionProps={{ transition: 'fade', duration: 200 }}>
        <div> {children}</div>
      </Modal>

      <button onClick={open}>{openButton}</button>
    </>
  );
}
