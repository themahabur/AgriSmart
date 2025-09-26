"use client"

import React, { useState, useEffect } from 'react';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dhaka coordinates
     const lat = "22.7133";
  const lon = "90.3496";
    const apiKey = 'eed75703a552ed1ad8db7b42f4f3e024';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=bn`;

    // Bengali day names
    const bengaliDays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];

    const getWeatherIcon = (conditionCode) => {
        if (conditionCode >= 200 && conditionCode < 300) return '⛈️'; // Thunderstorm
        if (conditionCode >= 300 && conditionCode < 400) return '🌧️'; // Drizzle
        if (conditionCode >= 500 && conditionCode < 600) return '🌧️'; // Rain
        if (conditionCode >= 600 && conditionCode < 700) return '❄️';  // Snow
        if (conditionCode >= 700 && conditionCode < 800) return '🌫️'; // Atmosphere
        if (conditionCode === 800) return '☀️';  // Clear
        if (conditionCode > 800) return '☁️';    // Clouds
        return '🌤️';
    };

    const getBackgroundGradient = (conditionCode) => {
        if (conditionCode >= 200 && conditionCode < 600) return 'from-blue-400 via-blue-600 to-gray-700'; // Rainy
        if (conditionCode >= 600 && conditionCode < 700) return 'from-blue-200 via-blue-100 to-white'; // Snow
        if (conditionCode === 800) return 'from-yellow-400 via-orange-300 to-yellow-200'; // Clear/Sunny
        if (conditionCode > 800) return 'from-gray-400 via-gray-300 to-gray-200'; // Cloudy
        return 'from-blue-400 to-blue-200';
    };

    const getTextColor = (conditionCode) => {
        if (conditionCode >= 200 && conditionCode < 600) return 'text-white'; // Rainy
        if (conditionCode === 800) return 'text-gray-800'; // Sunny
        return 'text-gray-700'; // Default
    };

    const getConditionText = (conditionCode, description) => {
        // Use the Bengali description from API or fallback to English mapping
        if (description) return description;
        
        if (conditionCode >= 200 && conditionCode < 300) return 'বজ্রবৃষ্টি';
        if (conditionCode >= 300 && conditionCode < 400) return 'হালকা বৃষ্টি';
        if (conditionCode >= 500 && conditionCode < 600) return 'বৃষ্টি';
        if (conditionCode >= 600 && conditionCode < 700) return 'তুষারপাত';
        if (conditionCode >= 700 && conditionCode < 800) return 'কুয়াশা';
        if (conditionCode === 800) return 'পরিষ্কার';
        if (conditionCode > 800) return 'মেঘলা';
        return 'সাধারণ';
    };

    // Process forecast data to get daily forecasts
    const processForecastData = (list) => {
        const dailyForecasts = [];
        const seenDays = new Set();
        
        // Get current day in Dhaka timezone
        const today = new Date().getDay();
        
        list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayIndex = date.getDay();
            const dayName = bengaliDays[dayIndex];
            
            // Only take one forecast per day (around noon for best representation)
            if (!seenDays.has(dayIndex) && date.getHours() >= 10 && date.getHours() <= 14) {
                seenDays.add(dayIndex);
                dailyForecasts.push({
                    day: dayName,
                    temp: Math.round(item.main.temp),
                    condition: item.weather[0].id,
                    description: item.weather[0].description,
                    humidity: item.main.humidity,
                    windSpeed: item.wind.speed
                });
            }
        });

        // Ensure we have 5 days of forecast
        return dailyForecasts.slice(0, 5);
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Process the data for our component
                const processedData = {
                    current: {
                        temperature: Math.round(data.list[0].main.temp),
                        condition: data.list[0].weather[0].id,
                        description: data.list[0].weather[0].description,
                        humidity: data.list[0].main.humidity,
                        windSpeed: data.list[0].wind.speed,
                        feelsLike: Math.round(data.list[0].main.feels_like),
                        pressure: data.list[0].main.pressure,
                        visibility: data.list[0].visibility / 1000, // Convert to km
                    },
                    forecast: processForecastData(data.list),
                    city: data.city.name,
                    country: data.city.country
                };
                
                setWeatherData(processedData);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching weather data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [apiUrl]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                    <div className="text-white text-lg font-semibold">আবহাওয়া তথ্য লোড হচ্ছে...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600">
                <div className="text-center text-white">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold mb-2">ত্রুটি হয়েছে</h2>
                    <p className="text-lg">আবহাওয়া তথ্য লোড করতে সমস্যা হয়েছে</p>
                    <p className="text-sm opacity-80 mt-2">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        আবার চেষ্টা করুন
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(weatherData.current.condition)} ${getTextColor(weatherData.current.condition)}`}>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">আবহাওয়া তথ্য</h1>
                    <p className="text-xl opacity-90">
                        {weatherData.city}, {weatherData.country} - এর সর্বশেষ আবহাওয়া আপডেট
                    </p>
                    <p className="text-sm opacity-70 mt-1">
                        শেষ আপডেট: {new Date().toLocaleString('bn-BD')}
                    </p>
                </div>
                
                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Current Weather Card */}
                    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="text-center md:text-left mb-6 md:mb-0">
                                <h2 className="text-2xl font-semibold mb-4">বর্তমান আবহাওয়া</h2>
                                <div className="text-6xl font-bold mb-2">{weatherData.current.temperature}°C</div>
                                <div className="text-xl font-medium capitalize">
                                    {getConditionText(weatherData.current.condition, weatherData.current.description)}
                                </div>
                            </div>
                            <div className="text-8xl">{getWeatherIcon(weatherData.current.condition)}</div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div className="bg-black/10 rounded-lg p-4 text-center">
                                <div className="text-sm opacity-80">আর্দ্রতা</div>
                                <div className="text-2xl font-semibold">{weatherData.current.humidity}%</div>
                            </div>
                            <div className="bg-black/10 rounded-lg p-4 text-center">
                                <div className="text-sm opacity-80">বাতাসের গতি</div>
                                <div className="text-2xl font-semibold">{weatherData.current.windSpeed} m/s</div>
                            </div>
                            <div className="bg-black/10 rounded-lg p-4 text-center">
                                <div className="text-sm opacity-80">অনুভূত হচ্ছে</div>
                                <div className="text-2xl font-semibold">{weatherData.current.feelsLike}°C</div>
                            </div>
                            <div className="bg-black/10 rounded-lg p-4 text-center">
                                <div className="text-sm opacity-80">চাপ</div>
                                <div className="text-2xl font-semibold">{weatherData.current.pressure} hPa</div>
                            </div>
                        </div>
                    </div>

                    {/* Forecast Section */}
                    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30">
                        <h2 className="text-2xl font-semibold mb-6 text-center">৫ দিনের আবহাওয়া পূর্বাভাস</h2>
                        <div className="space-y-4">
                            {weatherData.forecast.map((day, index) => (
                                <div key={index} className="flex items-center justify-between bg-black/10 rounded-xl p-4 hover:bg-black/20 transition-all duration-300">
                                    <div className="flex-1">
                                        <div className="font-semibold text-lg">{day.day}</div>
                                        <div className="text-sm opacity-80 capitalize">{day.description}</div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-3xl">{getWeatherIcon(day.condition)}</div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">{day.temp}°C</div>
                                            <div className="text-sm opacity-80">আর্দ্রতা: {day.humidity}%</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="max-w-6xl mx-auto mt-8">
                    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30">
                        <h3 className="text-xl font-semibold mb-4 text-center">আবহাওয়া পরামর্শ</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                            <div className="p-3 bg-black/10 rounded-lg">
                                <div className="font-medium">সূর্যকর দিনে</div>
                                <div className="text-sm opacity-80">সানস্ক্রিন ব্যবহার করুন</div>
                            </div>
                            <div className="p-3 bg-black/10 rounded-lg">
                                <div className="font-medium">বৃষ্টির দিনে</div>
                                <div className="text-sm opacity-80">ছাতা সাথে রাখুন</div>
                            </div>
                            <div className="p-3 bg-black/10 rounded-lg">
                                <div className="font-medium">গরমে</div>
                                <div className="text-sm opacity-80">পর্যাপ্ত পানি পান করুন</div>
                            </div>
                            <div className="p-3 bg-black/10 rounded-lg">
                                <div className="font-medium">শীতলে</div>
                                <div className="text-sm opacity-80">গরম কাপড় পরুন</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Refresh Button */}
                <div className="text-center mt-6">
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-white/30 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/40 transition-colors border border-white/30"
                    >
                        🔄 তথ্য রিফ্রেশ করুন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Weather;