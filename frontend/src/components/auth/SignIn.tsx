import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../Api';
import toast from 'react-hot-toast';

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  interface LogInFormat {
    email: string;
    password: string;
  }

  const [logindata, setlogindata] = useState<LogInFormat>({
    email: '',
    password: '',
  });

  const handleformLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post('/auth/login', logindata);
      if (response.status === 200) {
        toast.success('Login Successful');
        localStorage.setItem('JWT', response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error in Logging in!');
    } finally {
      setLoading(false);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlogindata({ ...logindata, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8 bg-zinc-900">
      <div className="bg-zinc-800 p-6 sm:p-8 w-full sm:max-w-md rounded-xl shadow-md space-y-6 mt-16 text-yellow-700">

        {/* Heading */}
        <div className="text-center">
          <h2 className=" text-2xl sm:text-3xl font-bold">Welcome back</h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleformLogin} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-sm " htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={logindata.email}
                onChange={handleValueChange}
                required
                placeholder="aman123@gmail.com"
                className="w-full py-2 px-3  rounded-md mt-1 bg-zinc-700
                 outline-none text-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-sm " htmlFor="password">
                Password
              </label>
              <input
                required
                name="password"
                type="password"
                value={logindata.password}
                onChange={handleValueChange}
                placeholder="******"
                className="w-full py-2 px-3  rounded-md mt-1 bg-zinc-700
                 outline-none text-white"
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className={`bg-yellow-700 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md w-full transition duration-200 ${loading ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
                }`}
            >
              {loading ? 'Loading...' : 'Log In'}
            </button>
          </div>

          <div className="text-center">
            <span className="">
              Don't have an account?{' '}
              <Link to="/register" className="text-yellow-700 hover:text-yellow-600 underline font-medium">
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;