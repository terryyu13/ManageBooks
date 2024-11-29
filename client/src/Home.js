import React from "react";

function Home() {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold text-gray-700 text-center">Welcome to the App</h1>
      <p className="text-gray-600 mt-4 text-center">
        This is the homepage. Navigate to "Manage Books" to manage your book list.
      </p>
    </div>
  );
}

export default Home;
