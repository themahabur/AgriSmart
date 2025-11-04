import next from "next";
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

    if (!GOOGLE_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // 1️⃣ Fetch weather data
    const weatherUrl = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${GOOGLE_KEY}&location.latitude=${lat}&location.longitude=${lon}`;

    const weatherRes = await fetch(weatherUrl, {
      next: { revalidate: 600 },
    });
    const weatherText = await weatherRes.text();

    if (!weatherRes.ok) {
      console.error("Weather API Error:", weatherRes.status, weatherText);
      return NextResponse.json(
        { error: "Failed to fetch weather data" },
        { status: weatherRes.status }
      );
    }

    const weatherData = JSON.parse(weatherText);

    // 2️⃣ Fetch place name from Nominatim
    const geoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=bn`;

    const geoRes = await fetch(geoUrl, {
      headers: {
        "User-Agent": "AgriSmartApp/1.0",
      },
    });

    const geoText = await geoRes.text();
    let geoData = {};

    try {
      geoData = JSON.parse(geoText);
    } catch (e) {
      console.error("Geocoding parse error:", e);
    }

    const place =
      geoData.address?.town ||
      geoData.address?.city ||
      geoData.address?.village ||
      "Unknown Location";

    // 3️⃣ Format response
    const response = {
      place,
      temperature: weatherData.temperature?.degrees,
      unit: weatherData.temperature?.unit || "CELSIUS",
      humidity: weatherData.relativeHumidity,
      windSpeed: weatherData.wind?.speed?.value,
      pressure: weatherData.airPressure?.meanSeaLevelMillibars,
      feelsLikeTemperature: weatherData.feelsLikeTemperature?.degrees,
      description: weatherData.weatherCondition?.description?.text || "N/A",
      time: weatherData.currentTime || new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Weather API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
