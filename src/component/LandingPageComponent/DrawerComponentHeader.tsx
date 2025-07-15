import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Burger, Drawer } from '@mantine/core';
import { CategoryIn } from '../../interface/courseInterface';
import { useNavigate } from '@tanstack/react-router';

type Props = {
  data: CategoryIn[];
};

export default function DrawerComponentHeader({ data }: Props) {
  const [opened, { close, toggle }] = useDisclosure(false);
  const [path, setPath] = useState<CategoryIn[]>([]);
  const navigate = useNavigate();
  // Current level categories based on navigation path
  const lists: CategoryIn[][] = [data, ...path.map((p) => p.children || [])];
  const level = path.length;

  function drill(cat: CategoryIn) {
    if (cat.children && cat.children.length) {
      setPath((prev) => [...prev, cat]);
    } else {
      navigate({ to: `/courses/category/${cat.categorySlug}` });
      close();
      setPath([]);
    }
  }

  function goBack() {
    setPath((prev) => prev.slice(0, -1));
  }

  function handleClose() {
    if (path.length) {
      goBack();
    } else {
      close();
    }
  }

  return (
    <>
      <Burger
        opened={opened}
        color="black"
        size="sm"
        onClick={toggle}
        aria-label="Toggle navigation"
        className="lg:hidden"
      />

      <Drawer
        position="left"
        size={280} // Fixed pixel width for drawer
        opened={opened}
        onClose={handleClose}
        withCloseButton={false}
        className="lg:hidden"
        padding="lg"
        styles={{
          body: { padding: 0 },
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 py-3">
          {level > 0 ? (
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600" onClick={goBack}>
              ← Back
            </button>
          ) : (
            <div className="text-base font-semibold">Explore by Goal</div>
          )}
        </div>

        {/* Sliding Panel */}
        <div className="relative w-full h-[calc(100vh-56px)] overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              width: `${lists.length * 100}%`,
              transform: `translateX(-${(level * 100) / lists.length}%)`,
            }}
          >
            {lists.map((list, idx) => (
              <div key={idx} className="flex-shrink-0 p-4" style={{ width: `${100 / lists.length}%` }}>
                {idx > 0 && <div className="text-md font-semibold mb-2">All {path[idx - 1]?.categoryName}</div>}
                <ul className="space-y-2">
                  {list.map((cat, idx2) => (
                    <li
                      key={cat._id}
                      className="p-2 hover:bg-gray-100 rounded flex justify-between items-center cursor-pointer text-sm font-medium text-gray-800"
                      onClick={() => drill(cat)}
                    >
                      <span>{cat.categoryName}</span>
                      {cat.children && cat.children.length > 0 && <span className="text-gray-400">›</span>}
                    </li>
                  ))}

                  {/* Extra links at the bottom */}
                  {idx === 0 && (
                    <>
                      <li
                        key={'blog'}
                        className="mt-4 border-t pt-4 text-md font-medium text-themeBlack cursor-pointer hover:text-themeBlue"
                        onClick={() => {
                          close();
                          navigate({ to: '/blogs' });
                        }}
                      >
                        Blog
                      </li>
                      <li
                        key={'contact us'}
                        className="text-md font-medium text-themeBlack cursor-pointer hover:text-themeBlue"
                        onClick={() => {
                          close();
                          navigate({ to: '/contact' });
                        }}
                      >
                        Contact Us
                      </li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
}
