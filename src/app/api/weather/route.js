import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Latitude and Longitude are required" },
        { status: 400 }
      );
    }

    const GOOGLE_KEY = process.env.GOOGLE_API_KEY;

    // 🟢 1️⃣ Get weather data
    const weatherUrl = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${GOOGLE_KEY}&location.latitude=${lat}&location.longitude=${lon}`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const weatherForecast = await fetch(`https://weather.googleapis.com/v1/forecast/days:lookup?key=AIzaSyCBfKPwasdEN-Yw9wpJcJJytVUGETvKfdA&location.latitude=24.274215&location.longitude=89.014914&days=10&pageSize=10`);
    const forecastData = await weatherForecast.json();
   

    if (!weatherRes.ok) {
      return NextResponse.json(
        { error: weatherData.message || "Failed to fetch weather" },
        { status: weatherRes.status }
      );
    }

    // 🟢 2️⃣ Get place name from Geocoding API
    const geoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    

    const place = geoData.address?.county || "Unknown Location";
    const forecast = forecastData.forecastDays || [];

    // 🟢 3️⃣ Combine both responses
    const condition = weatherData.temperature || {};
    const response = {
      geoData,
      place,
      forecast,
      temperature: condition.degrees,
      unit: condition.unit || "C",
      humidity: weatherData.relativeHumidity,
      windSpeed: weatherData.wind?.speed?.value,
      pressure: weatherData.airPressure?.meanSeaLevelMillibars,
      feelsLikeTemperature: weatherData.feelsLikeTemperature?.degrees,
      description: weatherData.weatherCondition.description.text || "N/A",
      time: condition.observationTime?.value || new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Weather API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
