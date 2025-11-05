export const generateWeatherAlert = (currentWeather, forecast) => {
  // Ensure we have the data we need before proceeding
  if (!currentWeather || !forecast || !forecast.forecastDays) {
    return null;
  }

  const todayForecast = forecast.forecastDays[0];

  // --- Rule 1: Thunderstorm Warning (Highest Priority) ---
  if (
    currentWeather.thunderstormProbability > 50 ||
    todayForecast.daytimeForecast.thunderstormProbability > 50
  ) {
    return {
      type: "danger", // This will control the color
      title: "বজ্রপাতের সতর্কতা",
      message:
        "বজ্রঝড়ের সম্ভাবনা রয়েছে। নিরাপদ আশ্রয়ে থাকুন এবং খামারের সরঞ্জাম সুরক্ষিত করুন।",
    };
  }

  // --- Rule 2: Heavy Rain & Flooding Warning ---
  if (todayForecast.daytimeForecast.precipitation.probability.percent > 70) {
    return {
      type: "warning",
      title: "ভারী বৃষ্টির সতর্কতা",
      message:
        "আপনার এলাকায় বন্যার ঝুঁকি রয়েছে। সরঞ্জাম এবং গবাদি পশু সুরক্ষিত করুন।",
    };
  }

  // --- Rule 3: High Wind Warning ---
  if (
    currentWeather.wind.speed.value > 25 ||
    todayForecast.daytimeForecast.wind.speed.value > 25
  ) {
    return {
      type: "warning",
      title: "শক্তিশালী বাতাসের সতর্কতা",
      message:
        "দমকা হাওয়া ফসল এবং কাঠামোকে ক্ষতিগ্রস্ত করতে পারে। দুর্বল গাছপালা ঢেকে দিন।",
    };
  }

  // --- Rule 4: Extreme Heat Warning ---
  if (
    currentWeather.temperature.degrees > 38 ||
    todayForecast.maxTemperature.degrees > 38
  ) {
    return {
      type: "danger",
      title: "তীব্র তাপপ্রবাহের সতর্কতা",
      message:
        "তীব্র গরমে হিট স্ট্রোকের ঝুঁকি রয়েছে। সেচ দিন এবং দিনের বেলায় কাজ করা থেকে বিরত থাকুন।",
    };
  }

  // --- Rule 5: High UV Index Info ---
  if (currentWeather.uvIndex > 8 || todayForecast.daytimeForecast.uvIndex > 8) {
    return {
      type: "info",
      title: "উচ্চ UV সূচক",
      message:
        "সূর্যের ক্ষতিকারক রশ্মি থেকে নিজেকে রক্ষা করুন। লম্বা হাতার পোশাক পরুন।",
    };
  }

  // If no severe conditions are met, return null
  return null;
};
