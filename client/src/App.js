import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ManageBooks from "./ManageBooks"; // 書籍管理頁面
import Home from "./Home"; // 首頁

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md p-4">
          <div className="max-w-7xl mx-auto flex justify-between">
            <Link to="/" className="text-blue-500 font-bold text-xl">
              Home
            </Link>
            <Link to="/manage-books" className="text-blue-500 font-bold text-xl">
              Manage Books
            </Link>
          </div>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manage-books" element={<ManageBooks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
