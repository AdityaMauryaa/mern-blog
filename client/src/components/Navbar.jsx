import React from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Navbar = () => {
  const { navigate, token ,globalName} = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="w-32 sm:w-44 cursor-pointer"
      />

      {/* Auth Buttons */}
      {token ? (
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white  px-3 py-2 hover:scale-105 transition"
        >
          {globalName.toUpperCase()}
          <img src={assets.arrow} alt="Arrow" className="w-3 max-sm:hidden" />
        </button>
      ) : (
        <div className="flex">
          <button
            onClick={() => navigate('/admin/register')}
            className="flex items-center gap-1 rounded-l-full max-sm:hidden text-sm cursor-pointer bg-primary text-white px-4 py-2 hover:scale-105 transition"
          >
            Register <span>/</span>
          </button>

          <button
            onClick={() => navigate('/admin/login')}
            className="flex items-center gap-2 text-sm cursor-pointer bg-primary text-white py-2 pr-3  max-sm:pl-3 rounded-r-full max-sm:rounded-l-full hover:scale-105 transition"
          >
            Login
            <img src={assets.arrow} alt="Arrow" className="w-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
