import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ResetPasswordPage = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const { resetPassword } = useAuthStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(token, password);
      setMessage("Your password has been reset successfully!");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-center">
          Reset Password
        </h2>
        <p className="mb-6 text-sm text-center text-gray-600">
          Enter your new password below.
        </p>
        {message && (
          <p className="mb-4 text-center text-green-600">{message}</p>
        )}
        {error && <p className="mb-4 text-center text-red-600">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-gray-600">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mx-auto animate-spin" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
