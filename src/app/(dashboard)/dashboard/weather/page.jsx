"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import CurrentWeather from "@/app/components/dashboard/weather/CurrentWeather";
import Forecast from "@/app/components/dashboard/weather/Forecast";
import { generateWeatherAlert } from "@/app/components/utils/weatherAlert";
import WeatherAlert from "@/app/components/dashboard/weather/WeatherAlert";

// --- UPDATED HELPER FUNCTION for Nominatim API ---
const parseNominatimLocation = (nominatimData) => {
  if (!nominatimData || !nominatimData.address) {
    return "Unknown Location";
  }
  const addr = nominatimData.address;

  // Prioritize the most specific name available
  return (
    addr.town ||
    addr.county ||
    addr.state_district ||
    addr.state ||
    "Bangladesh"
  );
};

const WeatherPage = () => {
  const [coordinates, setCoordinates] = useState({
    lat: 25.0015,
    lon: 89.3227,
  }); // Default to Bogura for example
  const [locationName, setLocationName] = useState("Loading location...");

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // This effect will run once to get the user's location if they allow it,
    // otherwise it will proceed with the default coordinates.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          // If user denies, fetch data for the default location
          fetchDataForLocation(coordinates.lat, coordinates.lon);
        }
      );
    } else {
      // If browser doesn't support geolocation, fetch for default
      fetchDataForLocation(coordinates.lat, coordinates.lon);
    }
  }, []);

  // This effect runs whenever the coordinates change
  useEffect(() => {
    fetchDataForLocation(coordinates.lat, coordinates.lon);
  }, [coordinates]);

  const fetchDataForLocation = async (lat, lon) => {
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    // --- UPDATED URLs ---
    const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=bn`;
    const currentConditionsUrl = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${googleApiKey}&location.latitude=${lat}&location.longitude=${lon}`;
    const forecastUrl = `https://weather.googleapis.com/v1/forecast/days:lookup?key=${googleApiKey}&location.latitude=${lat}&location.longitude=${lon}&days=7`;

    try {
      setLoading(true);
      setError("");

      const [geoRes, currentRes, forecastRes] = await Promise.all([
        axios.get(geocodingUrl),
        axios.get(currentConditionsUrl),
        axios.get(forecastUrl),
      ]);

      const generatedAlert = generateWeatherAlert(
        currentRes.data,
        forecastRes.data
      );

      // --- Use the new parser function ---
      setLocationName(parseNominatimLocation(geoRes.data));
      setCurrentWeather(currentRes.data);
      setForecast(forecastRes.data);
      setAlert(generatedAlert);
    } catch (err) {
      setError("Failed to fetch location or weather data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <ClipLoader color="#22c55e" size={60} /> */}
        <p className="ml-4 text-lg">Fetching location and weather...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
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
          <CurrentWeather data={currentWeather} locationName={locationName} />
        </div>
        <WeatherAlert alert={alert} />
      </div>

      {/* <AiSuggestions weatherData={{ currentWeather, forecast }} /> */}
      <Forecast data={forecast} />
    </div>
  );
};

export default WeatherPage;
