import React from "react";
import { Clock } from "lucide-react";

const ServiceStatusBadge = ({ isExpired, isExpiringSoon, minutesLeft }) => {
  if (isExpired) {
    return (
      <div className="absolute flex items-center px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full top-2 left-2">
        <Clock className="w-3 h-3 mr-1" />
        Expired
      </div>
    );
  }

  if (isExpiringSoon) {
    return (
      <div className="absolute flex items-center px-2 py-1 text-xs font-bold text-white bg-yellow-500 rounded-full top-2 left-2">
        <Clock className="w-3 h-3 mr-1" />
        {minutesLeft} min{minutesLeft !== 1 ? "s" : ""} left
      </div>
    );
  }

  return (
    <div className="absolute flex items-center px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full top-2 left-2">
      <Clock className="w-3 h-3 mr-1" />
      Active
    </div>
  );
};

export default ServiceStatusBadge;
