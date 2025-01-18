import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fromData, setformData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateFrom = () => {};
  const handleSubmit = (e) => {
    e.preventDefaulf();
  };

  return (
    <div className="min-h-screen grid lg: grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8"></div>
      </div>
    </div>
  );
};

export default SignUpPage;
