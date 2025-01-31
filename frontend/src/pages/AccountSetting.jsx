import React, { useState } from "react";
import { Mail, User, MapPin, Phone, Info } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const AccountSetting = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [location, setLocation] = useState(authUser?.location || "");
  const [phone, setPhone] = useState(authUser?.phone || "");
  const [bio, setBio] = useState(authUser?.bio || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdatingProfile) return;

    const updatedInfo = {
      fullName,
      location,
      phone,
      bio,
    };

    console.log("Updated Info:", updatedInfo); // Log updated info to check

    await updateProfile(updatedInfo);
  };
  const handleprofilePage = () => {
    window.location.href = "/profile";
  };

  return (
    <div className="flex justify-center py-10 bg-gray-100 ">
      <div className="grid w-full max-w-3xl p-6 text-center bg-white rounded-lg shadow-lg">
        {/* Account Update settings */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-8 bg-base-300 rounded-xl"
        >
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Update Profile</h1>
            <p className="mt-2 mb-10">Your Profile Information</p>

            {/* Full Name */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="px-4 py-2.5 bg-base-200 rounded-lg border h-10 w-full"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email || "Not provided"}
              </p>
            </div>

            {/* Location */}
            <div className="space-y-1.5 mt-6">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <MapPin className="w-4 h-4" />
                Location
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-4 py-2.5 bg-base-200 rounded-lg border h-10 w-full"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5 mt-6">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Phone className="w-4 h-4" />
                Phone Number
              </div>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="px-4 py-2.5 bg-base-200 rounded-lg border h-10 w-full"
              />
            </div>

            {/* Bio */}
            <div className="space-y-1.5 mt-6">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Info className="w-4 h-4" />
                Bio
              </div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full h-28"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-6/12 px-4 py-2 mt-8 text-sm font-semibold text-gray-700 bg-blue-400 border border-gray-300 rounded-md hover:bg-gray-300"
              disabled={isUpdatingProfile}
              onClick={handleprofilePage}
            >
              {isUpdatingProfile ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSetting;
