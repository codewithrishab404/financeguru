import { Link } from "react-router-dom";
<<<<<<< HEAD
import photo from '/assets/photo.png';
import { useEffect, useState } from "react";
=======
import photo from "/assets/photo.png";
>>>>>>> aba7956ed85898733a31c61692864c3b25707ca3

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("idToken");

    async function verifyToken() {
      if (token) {
        const response = await fetch('http://localhost:5000/protected', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
        });
        const data = await response.json();
        if (data.valid) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    }

    verifyToken();
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img className="h-32 w-auto" src={photo} alt="Logo" />
<<<<<<< HEAD
            <span className="ml-2 font-bold text-white text-xl">Finance Guruji</span>
=======
            <span className="ml-2 font-bold text-white text-xl">
              Finance Guruji
            </span>
>>>>>>> aba7956ed85898733a31c61692864c3b25707ca3
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
          {isLoggedIn ?
            <Link
              to="/userform"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Fill up form for better answers
            </Link>
            :
            (
              <div className="flex items-center space-x-4 border-10%">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 border border-blue-700 text-blue-700 rounded hover:bg-blue-50 transition"
                >
                  Register
                </Link>
              </div>
            )}
        </div>
      </div >
    </nav >
  );
}
