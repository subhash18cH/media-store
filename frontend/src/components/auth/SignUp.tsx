import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../Api";

export default function Signup() {

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  interface SignUpFormat {
    userName: string;
    email: string;
    password: string;
  }

  const [signupdata, setSignupdata] = useState<SignUpFormat>({
    userName: '',
    email: '',
    password: '',
  });

  const handleformSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post('/auth/register', signupdata);
      if (response.status === 201) {
        toast.success('Register Successful');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error in Signing up!');
    } finally {
      setLoading(false);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupdata({ ...signupdata, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8 bg-zinc-900">
      <div className=" bg-zinc-800 text-yellow-700 p-6 sm:px-8 w-full sm:max-w-md rounded-xl shadow-md space-y-6 mt-16">

        {/* Heading */}
        <div className="text-center">
          <h2 className=" text-2xl sm:text-3xl font-bold">Create your Account</h2>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleformSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-sm" htmlFor="userName">
                UserName
              </label>
              <input
                type="text"
                name="userName"
                value={signupdata.userName}
                onChange={handleValueChange}
                required
                className="w-full py-2 px-3  rounded-md mt-1 bg-zinc-700
                 outline-none text-white"
                placeholder="Aman Rawat"
              />
            </div>

            <div>
              <label className="block font-semibold text-sm" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={signupdata.email}
                onChange={handleValueChange}
                required
                placeholder="aman123@gmail.com"
                className="w-full py-2 px-3  rounded-md mt-1 bg-zinc-700
                 outline-none text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-sm" htmlFor="password">
                Password
              </label>
              <input
                required
                minLength={5}
                name="password"
                type="password"
                value={signupdata.password}
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
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </div>

          <div className="text-center">
            <span className="">
              Already have an account?{' '}
              <Link to="/login" className="text-yellow-700 hover:text-yellow-600 underline font-medium">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
