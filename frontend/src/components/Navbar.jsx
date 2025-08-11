import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-blue-950 text-white shadow-lg fixed top-0 left-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">TaskManager</div>

        {/* Menu button (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Links */}
        <div
          className={`flex flex-col md:flex-row md:items-center md:space-x-8 absolute md:static left-0 w-full md:w-auto bg-blue-950 md:bg-transparent transition-all duration-300 ease-in-out ${isOpen ? "top-16" : "top-[-400px]"
            }`}
        >
          <a href="/" className="px-6 py-3 hover:bg-blue-500 md:hover:bg-transparent md:hover:text-yellow-300 transition">
            Home
          </a>
          <a href="/login" className="px-6 py-3 hover:bg-blue-500 md:hover:bg-transparent md:hover:text-yellow-300 transition">
           Create Tasks
          </a>
           <a
              href="/login"
              className="px-6 py-3 md:px-4 md:py-2 text-white rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Login
            </a>
           <a
              href="/logout"
              className="px-6 py-3 md:px-4 md:py-2 text-white rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Logout
            </a>


        </div>
      </div>
    </nav>
  );
}
