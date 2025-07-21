import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import Filter from './Filter';
import { filterIn } from '../interface/filterInterface';

export type CustomDrawerRef = {
  open: () => void;
  close: () => void;
};

const FilterDrawer = forwardRef(
  (
    {
      onChange,
    }: {
      onChange: Dispatch<SetStateAction<filterIn | null>>;
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => setVisible(true),
      close: () => setVisible(false),
    }));

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (visible && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
          setVisible(false);
        }
      };

      if (visible) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [visible]);

    if (typeof document === 'undefined') return null;

    return createPortal(
      <>
        {visible && <div className="fixed inset-0 bg-black/30 z-[999] transition-opacity" />}
        <div
          ref={drawerRef}
          className={`fixed top-0 right-0 h-full w-[90%]  sm:max-w-[300px] max-w-[250px] bg-white shadow-xl z-[1000] transform transition-transform duration-300 ease-in-out ${
            visible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Filter Courses</h2>
            <button onClick={() => setVisible(false)} className="text-xl font-bold">
              ×
            </button>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
            <Filter onChange={onChange} />
          </div>
        </div>
      </>,
      document.body,
    );
  },
);

export default FilterDrawer;
