import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { IoIosRainy, IoIosSunny } from "react-icons/io";

const WelcomeHeader = ({ formatDate, weatherData, formatTime }) => {
  const { data: session } = useSession();

  const currentTime = new Date();
  return (
    <div className="bg-white rounded-xl border border-green-100 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-end">
            স্বাগতম,{" "}
            <span className="text-green-600">
              {session?.user?.name || "কৃষক ভাই"}
            </span>
            <Image
              src={"/happy-farmer.png"}
              alt="Happy Farmer"
              width={50}
              height={50}
              className="mb-1 ml-2 animate-welcome-pulse"
            />
          </h1>
          <p className="text-gray-600">
            আজ {formatDate(currentTime)} • {formatTime(currentTime)}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {weatherData ? Math.round(weatherData.today?.temp) : "--"}°C
            </div>
            <div className="text-sm text-gray-600">{weatherData?.city}</div>
          </div>
          <div className="text-4xl text-gray-500">
            {weatherData?.weather?.[0]?.main === "Clear" ? (
              <IoIosSunny />
            ) : (
              <IoIosRainy />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
