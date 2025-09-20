import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img className="h-10 w-auto" src="/logo.png" alt="Logo" />
            <span className="ml-2 font-bold text-white">MyWebsite</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-blue-300 font-medium">
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-blue-300 font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-white hover:text-blue-300 font-medium"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-blue-300 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Login/Register */}
          <div className="flex items-center space-x-4 border-10%">
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
