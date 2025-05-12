import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-peach">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-[#6B4423] text-xl font-bold">
            Mood Explorer
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link to="/explore" className="text-[#6B4423] hover:text-opacity-80">
              Explore
            </Link>
            <Link to="/profile" className="text-[#6B4423] hover:text-opacity-80">
              Profile
            </Link>
            <Link to="/login" className="text-[#6B4423] hover:text-opacity-80">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#6B4423]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link
              to="/explore"
              className="block py-2 text-[#6B4423] hover:text-opacity-80"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/profile"
              className="block py-2 text-[#6B4423] hover:text-opacity-80"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/login"
              className="block py-2 text-[#6B4423] hover:text-opacity-80"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;