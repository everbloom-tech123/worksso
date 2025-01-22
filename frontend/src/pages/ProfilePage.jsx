import React from "react";

const ProfileCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 p-6 bg-white rounded-md shadow-lg md:grid-cols-2">
        {/* Profile Card */}
        <div className="p-6 rounded-md shadow-sm bg-gray-50">
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <div className="w-24 h-24 mb-4 bg-gray-200 rounded-full"></div>
            <button className="px-4 py-1 text-sm text-white bg-blue-500 rounded-md">
              Upload Photo
            </button>
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold">John Smith</h2>
            <p className="text-gray-600">emailaddress@gmail.com</p>
            <p className="text-gray-600">0771122334</p>
            <p className="text-gray-600">
              221/f haputhale road, yakkala, colombo
            </p>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold">Bio:</h3>
            <p className="text-sm text-gray-600">
              A dedicated service provider on Worksso, offering reliable and
              professional home repair services to meet your needs.
            </p>
          </div>
        </div>

        {/* Settings Section */}
        <div className="flex flex-col space-y-4">
          <button className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
            Account Setting
            <span className="text-gray-500 material-icons">chevron_right</span>
          </button>
          <button className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
