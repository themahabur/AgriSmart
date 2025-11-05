"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import CurrentWeather from "@/app/components/dashboard/weather/CurrentWeather";
import Forecast from "@/app/components/dashboard/weather/Forecast";
import { generateWeatherAlert } from "@/app/components/utils/weatherAlert";
import WeatherAlert from "@/app/components/dashboard/weather/WeatherAlert";
import { getLocation } from "@/app/lib/getlocation";
import Loading from "@/app/components/loading/Loading";

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
  const [locationName, setLocationName] = useState("Loading location...");

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(null);

  // This effect runs whenever the coordinates change
  useEffect(() => {
    fetchDataForLocation();
  }, []);

  const fetchDataForLocation = async (lat, lon) => {
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    const location = await getLocation();
    if (!location) {
      throw new Error("Unable to get location");
    }

    const { latitude, longitude } = location;

    // --- UPDATED URLs ---
    const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=bn`;
    const currentConditionsUrl = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${googleApiKey}&location.latitude=${latitude}&location.longitude=${longitude}`;
    const forecastUrl = `https://weather.googleapis.com/v1/forecast/days:lookup?key=${googleApiKey}&location.latitude=${latitude}&location.longitude=${longitude}&days=7`;

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
    return <Loading />;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-sans space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">আবহাওয়া ও পরামর্শ</h1>
        <p className="text-green-600">আপনার খামারের জন্য AI-চালিত পরামর্শ</p>
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
