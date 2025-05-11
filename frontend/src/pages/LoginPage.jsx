import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-8 bg-gray-100 ">
      <div className="flex w-full max-w-screen-xl overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="flex justify-start mt-8 mb-8 ml-8 mr-8 rounded-lg shadow-md">
          {/* left section */}
          <div className="flex flex-col items-center justify-center w-1/2 text-white rounded-lg bg-gradient-to-t from-blue-200 to-blue-500">
            <h1 className="mt-16 text-5xl font-bold text-center">
              Access Your Worksso Account and stay
            </h1>
            <p className="text-4xl font-bold text-center ">
              Connected with the
            </p>
            <p className="text-4xl font-bold text-center ">Community.</p>
            <img
              src="../../Images/loginpage.png"
              alt="Logo"
              className="justify-center ml-8 rounded-full "
            />
          </div>
          {/* Right section */}
          <div className="justify-center w-1/2 p-8 ">
            <div className="flex items-center justify-center">
              <img
                src="../../Images/wlogo.png"
                alt="Logo"
                className="flex mb-5 w-28 "
              />
            </div>
            <h3 className="text-xl ">Welcome Back!</h3>
            <h2 className="mb-6 text-6xl font-semibold">Sign In</h2>
            <form action="" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="password" className="block mb-2 text-gray-600">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="off"
                  className="w-full px-4 py-2 border rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 flex items-center mt-8 right-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </p>
            <p className="mt-4 text-sm text-gray-600">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
