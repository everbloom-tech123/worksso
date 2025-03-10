import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer.jsx";
import AccountSetting from "./pages/AccountSetting.jsx";
import AdminDashboard from "./pages/AdminDashboard .jsx"; // Removed extra space
import CategoryPage from "./pages/CategoryPage.jsx";
import ServicePage from "./pages/servicePage.jsx"; // Corrected import name
import CategoryByIdPage from "./pages/CategoryByIdPage.jsx"; // Corrected import name
import UpdateServiceModal from "./pages/UpdateServiceModalPage.jsx";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Check the user's auth status on page load
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/accountSetting"
          element={authUser ? <AccountSetting /> : <Navigate to="/login" />}
        />

        {/* Admin-only route */}
        <Route
          path="/admin/dashboard"
          element={
            authUser?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/category"
          element={
            authUser?.role === "admin" ? <CategoryPage /> : <Navigate to="/" />
          }
        />

        {/* Service Page */}
        <Route
          path="/services/:categoryId"
          element={authUser ? <CategoryByIdPage /> : <Navigate to="/" />}
        />
        <Route
          path="/servicePage"
          element={authUser ? <ServicePage /> : <Navigate to="/" />}
        />
        <Route
          path="/updateService/:serviceId"
          element={authUser ? <UpdateServiceModal /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
