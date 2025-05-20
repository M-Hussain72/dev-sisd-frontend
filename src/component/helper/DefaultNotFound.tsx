// src/components/NotFound.tsx
import { Link } from '@tanstack/react-router';
import React from 'react';

export default function DefaultNotFound() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center px-6 pb-20">
      {/* Illustration */}
      <svg
        className="mb-8 opacity-20 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 240 240"
      >
        <circle cx="120" cy="120" r="120" fill="#307ee1" />
        <text x="50%" y="50%" textAnchor="middle" dy=".35em" fill="white" fontSize="96" fontWeight="bold">
          404
        </text>
      </svg>

      <h1 className="mb-4 font-bold text-themeBlue text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Page Not Found</h1>
      <p className="mb-8 text-center max-w-md text-base sm:text-lg md:text-xl text-themeBlue">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-block  px-6 py-3 bg-themeBlue hover:bg-blue-500 text-white font-medium rounded-lg shadow-md transition text-sm sm:text-base"
      >
        Take Me Home
      </Link>
    </div>
  );
}
