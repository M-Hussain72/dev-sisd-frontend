import { useRef, useState } from 'react';
import userHttp from '../../http/userHttp';
import { toast } from 'react-toastify';
import useAuthAxios from '../../hook/useAuthAxios';
import { Loader } from '@mantine/core';

export default function ImageUpload({
  initialImage,
  onChange,
  currentImage,
}: {
  initialImage: string | null | undefined;
  currentImage: string | null;
  onChange: (url: string) => void;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(currentImage);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(currentImage);
  const [pending, setPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const authAxios = useAuthAxios();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPending(true);
      try {
        const res = await userHttp.uploadImage({
          file: file,
          authAxios,
        });
        onChange(res.url);
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setSelectedImage(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
        setSelectedImageUrl(res.url);
        setPending(false);
      } catch (error: any) {
        setPending(false);
        toast.error(error?.message || '');
      }
    }
  };

  const handleDeleteImage = async () => {
    if (selectedImageUrl && selectedImage != initialImage) {
      try {
        await userHttp.deleteImage({
          url: selectedImageUrl,
          authAxios,
        });
      } catch (error: any) {
        toast.error(error?.message || '');
      }
    }
    setSelectedImage(null);
    setSelectedImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange('');
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Profile Image</h2>

      <div className="relative ">
        {selectedImage ? (
          <div className="relative w-fit gap-4">
            <img
              src={selectedImage}
              alt="Profile preview"
              className=" md:w-48 md:h-48 w-36 h-36 rounded-full object-cover border-2 border-dashed border-gray-200"
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="absolute top-2 -right-10 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ) : (
          <label
            htmlFor="profile-upload"
            className=" md:w-48 md:h-48 w-36 h-36 group cursor-pointer  rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors"
          >
            <div className="text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
                id="profile-upload"
              />
              {!pending ? (
                <div className="cursor-pointer text-gray-500 group-hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mx-auto mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>

                  <span className="text-sm">Upload Image</span>
                </div>
              ) : (
                <Loader size={'md'} />
              )}
            </div>
          </label>
        )}
      </div>

      {/* <p className="mt-2 text-sm text-gray-500">Recommended size: 300x300 pixels (1:1 aspect ratio)</p> */}
    </div>
  );
}
