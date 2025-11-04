const weatherTranslations = {
  // General Conditions
  Clear: "পরিষ্কার আকাশ",
  Sunny: "রৌদ্রোজ্জ্বল",
  "Partly cloudy": "আংশিক মেঘলা",
  "Mostly cloudy": "বেশিরভাগ মেঘলা",
  Cloudy: "মেঘলা",
  Overcast: "মেঘলা",
  "Scattered showers": "বিক্ষিপ্ত বৃষ্টি",
  Showers: "বৃষ্টি",
  Rain: "বৃষ্টি",
  Drizzle: "গুঁড়ি গুঁড়ি বৃষ্টি",
  Thunderstorm: "বজ্রসহ বৃষ্টি",
  "Scattered thunderstorms": "বিক্ষিপ্ত বজ্রসহ বৃষ্টি",
  Haze: "কুয়াশা",
  Fog: "ঘন কুয়াশা",
  Mist: "হালকা কুয়াশা",
  Windy: "ঝড়ো হাওয়া",

  // More specific ones you might encounter
  "Mostly clear": "বেশিরভাগ পরিষ্কার",
  "Clear with periodic clouds": "আংশিক মেঘলা",
  "Mostly sunny": "বেশিরভাগ সময় রৌদ্রোজ্জ্বল",
};

export const translateWeatherDescription = (englishDescription) => {
  return weatherTranslations[englishDescription] || englishDescription;
};
