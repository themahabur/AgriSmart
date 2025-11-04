"use client";

import { getWeatherIcon } from "./WeatherIcons";
import { WiHumidity, WiStrongWind, WiRaindrops } from "react-icons/wi"; // Using weather-specific icons

// A small, reusable component for the info pills at the bottom
const InfoPill = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 rounded-full px-4 py-2 text-sm">
    {icon}
    <span>
      <strong>{label}:</strong> {value}
    </span>
  </div>
);

const CurrentWeather = ({ data }) => {
  // Guard clause to prevent rendering if data is not yet available
  if (!data) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center justify-center h-full">
        <p>Loading current weather...</p>
      </div>
    );
  }

  // --- Data Extraction with Fallbacks ---
  // We use optional chaining (?.) to prevent errors if the API response is incomplete
  const temp = Math.round(data?.temperature?.degrees || 0);
  const description =
    data?.weatherCondition?.description?.text || "Not available";
  const highTemp = Math.round(
    data?.currentConditionsHistory?.maxTemperature?.degrees || temp
  );
  const lowTemp = Math.round(
    data?.currentConditionsHistory?.minTemperature?.degrees || temp
  );
  const humidity = data?.relativeHumidity || 0;
  const windSpeed = Math.round(data?.wind?.speed?.value || 0);
  const rainChance = data?.precipitation?.probability?.percent || 0;
  const conditionType = data?.weatherCondition?.type || "UNKNOWN";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      {/* Top section with temperature and icon */}
      <div className="flex justify-between items-start">
        {/* Left side: Temp and Text */}
        <div>
          <p className="text-gray-500 font-medium">Current Weather in Dhaka</p>
          <div className="flex items-baseline space-x-4 mt-2">
            <p className="text-7xl font-bold text-gray-800">{temp}°C</p>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-600">
                {description}
              </p>
              <p className="text-sm text-gray-500">
                H: {highTemp}° L: {lowTemp}°
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Weather Icon */}
        <div className="w-24 h-24">{getWeatherIcon(conditionType, "100%")}</div>
      </div>

      {/* Bottom section with info pills */}
      <div className="mt-6 flex flex-wrap gap-4">
        <InfoPill
          icon={<WiHumidity size={24} />}
          label="Humidity"
          value={`${humidity}%`}
        />
        <InfoPill
          icon={<WiStrongWind size={24} />}
          label="Wind"
          value={`${windSpeed} km/h`}
        />
        <InfoPill
          icon={<WiRaindrops size={24} />}
          label="Rain"
          value={`${rainChance}%`}
        />
      </div>
    </div>
  );
};

export default CurrentWeather;
