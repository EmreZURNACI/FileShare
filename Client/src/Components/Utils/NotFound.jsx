import React from "react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          Aradığınız sayfa bulunamadı.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Ana Sayfaya Dön
        </a>
      </div>
    </div>
  );
}
