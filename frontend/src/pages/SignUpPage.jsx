import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  // Validate the form and return true or false
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false; // Return false to prevent form submission
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    // Password strength checks (uppercase, number)
    if (!/[A-Z]/.test(formData.password)) {
      toast.error("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[0-9]/.test(formData.password)) {
      toast.error("Password must contain at least one number");
      return false;
    }

    // Check if confirm password is provided
    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return false;
    }

    // If all validations pass
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from default behavior

    if (validateForm()) {
      signup(formData); // Proceed to signup if validation passes
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="flex w-full max-w-screen-xl overflow-hidden bg-white rounded-lg shadow-lg">
        {/* left section */}
        <div className="flex justify-start mt-8 mb-8 ml-8 mr-8 rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center w-1/2 text-white rounded-lg bg-gradient-to-t from-blue-200 to-blue-500">
            <h1 className="mt-16 text-6xl font-bold">Welcome Aboard!</h1>
            <p className="mb-24 text-6xl font-bold">Let's get Started.</p>
            <img
              src="../../Images/signup.png"
              alt="Logo"
              className="justify-center ml-8 rounded-full mt-9 "
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
            <h3 className="text-xl ">Welcome Here!</h3>
            <h2 className="mb-6 text-6xl font-semibold">Sign Up</h2>

            <form action="" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
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

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm your Password"
                  className="w-full px-4 py-2 border rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
                disabled={isSigningUp}
              >
                {isSigningUp ? <>Loading...</> : "Create Account"}
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
