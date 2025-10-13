export const fetchWeather = async (lat, lon) => {
  if (!lat || !lon) throw new Error("Latitude and Longitude are required");

  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Weather fetch failed");
  }

  // 🧠 OpenWeather "forecast" API returns 3-hour intervals (every 3h for 5 days)
  // আমরা এটাকে daily basis-এ group করব।
  const city = data.city?.name || "Unknown Location";

  // আজকের weather (first item)
  const todayData = data.list?.[0];
  const today = {
    date: todayData?.dt_txt,
    temp: todayData?.main?.temp,
    feels_like: todayData?.main?.feels_like,
    humidity: todayData?.main?.humidity,
    weather: todayData?.weather?.[0]?.description,
    icon: todayData?.weather?.[0]?.icon,
  };

  // ৭ দিনের weather summary তৈরি করা (প্রতি দিনের প্রথম record নেওয়া)
  const dailyMap = new Map();
  data.list.forEach((entry) => {
    const day = entry.dt_txt.split(" ")[0];
    if (!dailyMap.has(day)) {
      dailyMap.set(day, entry);
    }
  });

  const weekly = Array.from(dailyMap.values()).map((entry) => ({
    date: entry.dt_txt.split(" ")[0],
    temp: entry.main.temp,
    feels_like: entry.main.feels_like,
    humidity: entry.main.humidity,
    weather: entry.weather[0].description,
    icon: entry.weather[0].icon,
  }));

  return {
    city,
    today,
    weekly,
  };
};
