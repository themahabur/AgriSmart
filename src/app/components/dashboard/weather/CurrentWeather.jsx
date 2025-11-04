"use client";

import { getWeatherIcon } from "./WeatherIcons";
import { WiHumidity, WiStrongWind, WiRaindrops } from "react-icons/wi";

// Reusable component for the info pills with an improved design
const InfoPill = ({ icon, label, value }) => (
  <div
    className="flex items-center space-x-2 bg-green-100 text-green-900 rounded-full px-4 py-2 border border-green-200 shadow-sm
                  hover:bg-green-200 hover:border-green-300 transform hover:-translate-y-1 transition-all duration-300 cursor-default"
  >
    <div className="text-green-600">{icon}</div>
    <span className="text-sm">
      <span className="font-semibold">{label}:</span> {value}
    </span>
  </div>
);

const CurrentWeather = ({ data }) => {
  // Guard clause with a translated loading message
  if (!data) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-lg border flex items-center justify-center h-full min-h-[250px]">
        <p className="text-lg text-gray-500">বর্তমান আবহাওয়া লোড হচ্ছে...</p>
      </div>
    );
  }

  // --- Data Extraction for Clarity ---
  const temp = Math.round(data?.temperature?.degrees || 0);
  const description = data?.weatherCondition?.description?.text || "তথ্য নেই";
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

  // Translate the description
  const translatedDescription =
    description === "Partly cloudy" ? "আংশিক মেঘলা" : description;

  return (
    <div className="bg-gradient-to-br from-white to-green-50 p-6 sm:p-8 rounded-3xl  shadow-green-100/50 border border-green-200">
      {/* Top section: Stacks on mobile, side-by-side on larger screens */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        {/* Left side: Temperature and Text */}
        <div className="w-full">
          <p className="text-gray-500 font-medium text-lg">
            ঢাকার বর্তমান আবহাওয়া
          </p>
          <div className="flex items-center space-x-4 mt-2">
            {/* HUGE Temperature */}
            <p className="text-8xl lg:text-9xl font-extrabold bg-clip-text  text-accent bg-gradient-to-b from-gray-800 to-gray-600">
              {temp}°
            </p>

            <div className="flex flex-col">
              <p className="text-2xl font-semibold text-gray-700">
                {translatedDescription}
              </p>
              <p className="text-md text-gray-500 mt-1">
                সর্বোচ্চ: {highTemp}° | সর্বনিম্ন: {lowTemp}°
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Weather Icon */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 self-center sm:self-start">
          {getWeatherIcon(conditionType, "100%")}
        </div>
      </div>

      {/* Bottom section with info pills and a separator */}
      <div className="mt-8 pt-6 border-t border-green-100 flex flex-wrap gap-4">
        <InfoPill
          icon={<WiHumidity size={28} />}
          label="আর্দ্রতা"
          value={`${humidity}%`}
        />
        <InfoPill
          icon={<WiStrongWind size={28} />}
          label="বাতাস"
          value={`${windSpeed} কিমি/ঘন্টা`}
        />
        <InfoPill
          icon={<WiRaindrops size={28} />}
          label="বৃষ্টি"
          value={`${rainChance}%`}
        />
      </div>
    </div>
  );
};

export default CurrentWeather;
