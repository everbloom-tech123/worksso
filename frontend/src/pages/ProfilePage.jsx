import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { serviceStore } from "../store/serviceStore";
import { Camera, Mail, User, MapPin, Phone, Info, Star } from "lucide-react"; // Added Star import
import ServiceForm from "./ServiceForm";

const ProfilePage = () => {
  const { authUser, logout, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const { services, fetchServices } = serviceStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gray-100">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 p-6 bg-white rounded-md shadow-lg md:grid-cols-2">
        {/* Profile Details Section */}
        <div className="p-6 space-y-8 bg-base-300 rounded-xl">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={
                  selectedImg ||
                  authUser.profilePic ||
                  "../../Images/avatar.png"
                }
                alt="Profile"
                className="object-cover border-4 rounded-full size-32"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName || "Not provided"}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email || "Not provided"}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <MapPin className="w-4 h-4" />
                Location
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.location || "Not provided"}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Phone className="w-4 h-4" />
                Phone Number
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.phone || "Not provided"}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Info className="w-4 h-4" />
                Bio
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.bio || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="p-6 space-y-4 bg-base-300 rounded-xl">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button
            className="w-full px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => (window.location.href = "/accountSetting")}
          >
            Account Setting
          </button>
          <button
            className="w-full px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Service Button */}
      <div className="grid items-center justify-center w-full max-w-4xl gap-6 p-6 py-8 mt-8 bg-white rounded-md shadow-lg md:grid-cols-2">
        <h1 className="text-3xl font-semibold text-center text-gray-800 md:text-left">
          Create Your Own Service
        </h1>
        <button
          onClick={() => setIsServiceFormOpen(true)}
          className="w-auto h-16 mx-auto font-semibold text-white transition duration-300 ease-in-out bg-blue-400 rounded-lg md:w-auto hover:bg-blue-500 md:mx-0"
        >
          Click Here
        </button>
      </div>

      {/* Service Form Modal */}
      {isServiceFormOpen && (
        <ServiceForm onClose={() => setIsServiceFormOpen(false)} />
      )}

      {/* Service List Section */}
      <div className="w-full max-w-4xl p-6 mt-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 md:text-left">
          Your Services
        </h1>
        <div className="mt-6 space-y-6">
          {services?.map((service) => (
            <div
              key={service._id}
              className="relative flex items-center p-4 px-6 bg-gray-100 rounded-lg shadow-sm"
            >
              {/* Service Image */}
              <img
                src={service.images[0] || "https://via.placeholder.com/150"}
                alt={service.title}
                className="object-cover w-40 h-40 mr-4 rounded-lg"
              />

              {/* Service Details */}
              <div className="flex-1">
                <h2 className="text-lg font-bold">{authUser.fullName}</h2>

                {/* Rating */}
                <div className="flex items-center my-1 text-yellow-500">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <Star key={i} size={16} />
                    ))}
                  <span className="ml-2 text-gray-500">(07)</span>
                </div>
                <h2 className="text-lg font-bold">{service.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {service.description}
                </p>

                {/* Price */}
                <div className="absolute font-semibold text-gray-600 top-2 right-4">
                  Price: <span className="text-black">${service.price}</span>
                </div>

                {/* Phone Number */}
                <div className="flex items-center mt-2 font-semibold text-red-500">
                  <Phone size={16} className="mr-2" /> {service.number}
                </div>
              </div>

              {/* More Details Button */}
              <button className="absolute px-4 py-2 text-white bg-blue-500 rounded-lg bottom-4 right-4 hover:bg-blue-600">
                More details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
