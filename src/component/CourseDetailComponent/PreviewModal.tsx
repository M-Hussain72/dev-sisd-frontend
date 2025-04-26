import { Loader, Modal } from '@mantine/core';
import { useState } from 'react';
import previewIcon from '../../assets/previewIcon.svg';
import { useQuery } from '@tanstack/react-query';
import PreviewSection from './PreviewSection';
import { getPreviewOfCourse } from '../../http/courseHttp';

export default function PreviewModal({
  preview,
  courseId,
  videoId,
  opened,
  setOpened,
}: {
  preview: boolean;
  courseId: string;
  videoId: string | undefined;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { status, isLoading, data } = useQuery({
    queryKey: ['preview', courseId],
    queryFn: () => getPreviewOfCourse({ courseId: courseId }),
    refetchOnWindowFocus: false,
    retry: false,
    // The query will not execute until the userId exists
    enabled: !!opened,
  });
  return (
    <>
      {preview && (
        <img src={previewIcon} alt="Preview" className=" cursor-pointer w-[18px]" onClick={() => setOpened(true)} />
      )}
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        centered
        transitionProps={{ transition: 'fade', duration: 200 }}
        size={'lg'}
        title={'Course Preview'}
      >
        {isLoading ? (
          <Loader size={'lg'} color="blue" />
        ) : data?.length > 0 ? (
          <PreviewSection previewVideos={data} videoId={videoId} />
        ) : (
          <h1 className=" my-8 text-themeBlack font-semibold text-center"> This content is not available for preview</h1>
        )}
      </Modal>
    </>
  );
}
