import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { error, isLoading, verifyEmail } = useAuthStore();

  // Handle input changes
  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      // Handle pasted content
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      inputRefs.current[5].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle Backspace Navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Auto-submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length < 6) {
      toast.error("Please enter a 6-digit code.");
      return;
    }
    try {
      await verifyEmail(verificationCode);
      toast.success("Email verified successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Verification failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center">
          Verify Your Email
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* OTP Input Fields */}
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                maxLength={1}
                className="w-12 h-12 text-lg font-bold text-center transition-all duration-150 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          {error && <p className="text-center text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 font-bold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Didn't receive the code?{" "}
          <button className="text-blue-500 hover:underline">Resend Code</button>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
