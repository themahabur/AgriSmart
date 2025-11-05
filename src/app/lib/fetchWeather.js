export const fetchWeather = async (lat, lon) => {
  if (!lat || !lon) throw new Error("Latitude and Longitude are required");

  try {
    const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`, {
      next: { revalidate: 1800 },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Weather fetch failed");
    }

    console.log("🌦 Weather Data:", data);

    // Expected data from backend:
    // {
    //   place: "Bogura, Bangladesh",
    //   temperature: 29.4,
    //   unit: "C",
    //   humidity: 75,
    //   windSpeed: 2.4,
    //   description: "Partly cloudy",
    //   time: "2025-10-20T10:45:00Z"
    // }

    const city = data.place || "Unknown Location";

    const today = {
      temp: data.temperature,
      unit: data.unit,
      humidity: data.humidity,
      windSpeed: data.windSpeed,
      pressure: data.pressure,
      feelsLike: data.feelsLikeTemperature,
      weather: data.description,
      time: data.time,
      geoData: data.geoData || {},
    };

    // (Future forecast না থাকলে empty array)
    const weekly = [];

    return { city, today, weekly };
  } catch (error) {
    console.error("❌ fetchWeather Error:", error);
    throw new Error("Failed to fetch weather data");
  }
};