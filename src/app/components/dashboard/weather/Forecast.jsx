import { format } from "date-fns";
import { getWeatherIcon } from "./WeatherIcons"; // icon mapping helper

const Forecast = ({ data }) => {
  // Guard clause in case the forecast data is not in the expected format
  if (!data || !Array.isArray(data.forecastDays)) {
    return <p>Forecast data is not available.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">7-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {/*  mapping over forecastDays */}
        {data.forecastDays.map((day, index) => {
          // Create a Date object from the year, month, and day provided by the API
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
                  : "bg-white border"
              }`}
            >
              <p className="font-bold text-lg">
                {/* Format the date to get the short day name (e.g., 'Mon') */}
                {format(date, "E")}
              </p>
              <div className="my-2 h-12 w-12 mx-auto">
                {/* Get the icon from the daytime forecast */}
                {getWeatherIcon(day.daytimeForecast.weatherCondition.type, 48)}
              </div>
              <p className="font-semibold text-xl">
                {/* Get the max and min temperatures */}
                {Math.round(day.maxTemperature.degrees)}°/
                {Math.round(day.minTemperature.degrees)}°
              </p>
              <p className="text-sm text-blue-500 mt-1 flex items-center justify-center">
                <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
                  <path d="M5 10.428V18a2 2 0 002 2h6a2 2 0 002-2v-7.572L10 5.428 5 10.428zM10 0a2 2 0 012 2v2.572l5 5V18a4 4 0 01-4 4H7a4 4 0 01-4-4v-8.428l5-5V2a2 2 0 012-2z" />
                </svg>
                {/* Get the rain probability from the daytime forecast */}
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
