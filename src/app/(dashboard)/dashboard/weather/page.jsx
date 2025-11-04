"use client";
import { useState, useEffect } from "react";
import axios from "axios"; // npm install axios
import { ClipLoader } from "react-spinners";
// Import your display components
import CurrentWeather from "./components/CurrentWeather";
import AiSuggestions from "./components/AiSuggestions";
import Forecast from "./components/Forecast";

const WeatherPage = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.GOOGLE_API_KEY;
      const lat = 23.8103; // Dhaka Latitude
      const lon = 90.4125; // Dhaka Longitude

      const currentConditionsUrl = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${apiKey}&location.latitude=${lat}&location.longitude=${lon}`;
      const forecastUrl = `https://weather.googleapis.com/v1/forecast:lookup?key=${apiKey}&location.latitude=${lat}&location.longitude=${lon}&dailyForecastSteps=7`;

      try {
        setLoading(true);
        // Fetch both endpoints at the same time
        const [currentRes, forecastRes] = await Promise.all([
          axios.get(currentConditionsUrl),
          axios.get(forecastUrl),
        ]);

        setCurrentWeather(currentRes.data);
        setForecast(forecastRes.data);
      } catch (err) {
        setError(
          "Failed to fetch weather data. Please check your API key and network."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#22c55e" size={60} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!currentWeather || !forecast) {
    return <div className="text-center mt-10">No weather data available.</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-sans space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Weather & Advice</h1>
        <p className="text-green-600">AI-powered suggestions for your farm</p>
      </div>

      {/* Main Weather and Alert Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CurrentWeather data={currentWeather} />
        </div>
        {/* You can create a dedicated Alert component */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <h3 className="font-bold text-yellow-600">Heavy Rain Warning</h3>
          <p className="text-sm text-yellow-700 mt-2">
            Risk of flooding in your area. Secure equipment and livestock.
          </p>
        </div>
      </div>

      {/* AI Suggestions Section */}
      <AiSuggestions weatherData={{ currentWeather, forecast }} />

      {/* 7-Day Forecast Section */}
      <Forecast data={forecast} />
    </div>
  );
};

export default WeatherPage;
