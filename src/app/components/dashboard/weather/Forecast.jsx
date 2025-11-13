import { format } from "date-fns";
import { bn } from "date-fns/locale"; // <-- Import the Bengali locale
import { getWeatherIcon } from "./WeatherIcons";
import { WiRaindrops } from "react-icons/wi";

const Forecast = ({ data }) => {
  if (
    !data ||
    !Array.isArray(data.forecastDays) ||
    data.forecastDays.length === 0
  ) {
    return (
      <p className="text-center text-gray-500">পূর্বাভাস তথ্য পাওয়া যায়নি।</p>
    );
  }

  // --- DYNAMIC TITLE SOLUTION ---
  // The title now uses the actual length of the returned forecast array.
  const forecastLength = data.forecastDays?.length;
  const title = `${forecastLength}-দিনের পূর্বাভাস`;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4`}>
        {data.forecastDays.map((day, index) => {
          const date = new Date(
            day.displayDate.year,
            day.displayDate.month - 1,
            day.displayDate.day
          );

          return (
            <div
              key={index}
              className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                index === 0
                  ? "bg-green-100 border-2 border-green-300 shadow-lg"
                  : "bg-white border border-gray-200"
              }`}
            >
              <p className="font-bold text-lg text-gray-800">
                {/* --- USE BENGALI LOCALE FOR DAY NAME --- */}
                {format(date, "E", { locale: bn })}
              </p>
              <div className="my-2 h-12 w-12 mx-auto">
                {getWeatherIcon(day.daytimeForecast.weatherCondition.type, 48)}
              </div>
              <p className="font-semibold text-xl text-gray-900">
                {Math.round(day.maxTemperature.degrees)}°/
                {Math.round(day.minTemperature.degrees)}°
              </p>
              <p className="text-sm text-blue-600 mt-1 flex items-center justify-center font-medium">
                <WiRaindrops size={20} className="text-blue-500" />
                {day.daytimeForecast.precipitation.probability.percent}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
