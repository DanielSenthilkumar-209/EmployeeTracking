import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h2 className="text-6xl font-bold mb-4">404</h2>
        <p className="text-2xl mb-8">Oops! Page Not Found</p>
        <Link to="/" className="text-lg bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-300">
          Go Back Home
        </Link>
      </div>
      <div className="mt-10">
        <img src="https://via.placeholder.com/500x300.png?text=404+Not+Found" alt="404 Not Found" className="w-full max-w-md rounded-lg shadow-lg" />
      </div>
    </div>
  );
}

export default NotFound;
