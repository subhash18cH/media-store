import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from "/src/assets/logo.png";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  type USER = {
    name: string;
    email: string;
  };
  const token = localStorage.getItem("JWT");
  const [user, setUser] = useState<USER>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [token]);
  return (
    <nav className="bg-zinc-900 shadow-lg fixed w-full h-18 p-2 z-20">
      <div className="flex justify-between items-center p-3">
        <Link to={token ? "/home" : "/"} className="flex items-center justify-center gap-2">
          <img src={logo} alt="logo" className="rounded-full w-10 " />
          <span className="font-semibold md:text-2xl lg:text-2xl text-xl text-yellow-700 ">MediaStore</span>
        </Link>

        <div className="space-x-6">
          {token ? (
            <div className="flex gap-5">
              <div className="flex items-center space-x-3 relative group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-700 flex items-center justify-center text-white font-semibold cursor-pointer text-sm sm:text-base">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                {/* Tooltip */}
                <div className="absolute top-12 sm:top-14 right-0 sm:-right-12 bg-yellow-600 text-white text-xs sm:text-sm rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  <span className="font-bold text-sm sm:text-base block">Name: {user?.name}</span>
                  <span className="font-bold text-sm sm:text-base block">Email: {user?.email}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem("JWT");
                  localStorage.removeItem("user");
                  navigate("/");
                }}
                className="border px-4 py-3 bg-red-700 border-none text-white hover:bg-red-600 font-semibold rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="border px-4 py-3 bg-yellow-700 border-none text-white hover:bg-yellow-600 font-semibold rounded-md"
              >
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className="border px-4 py-3 bg-yellow-700 border-none text-white hover:bg-yellow-600 font-semibold rounded-md"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar