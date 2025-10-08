"use client"

import { useState } from "react";
const Irrigation = () => {
    // সিমুলেটেড ডেটা - বাস্তবে API থেকে আসবে
    const [weatherData, setWeatherData] = useState({
        temperature: 32,
        humidity: 65,
        rainProbability: 30,
        soilMoisture: 45,
        windSpeed: 12,
        lastRain: '২ দিন আগে'
    });

    const [selectedCrop, setSelectedCrop] = useState('ধান');
    const [soilType, setSoilType] = useState('দোআঁশ');
    const [area, setArea] = useState(1);

    // ফসলের ডেটা
    const cropsData = {
        'ধান': {
            waterRequirement: 25,
            frequency: '৩-৪ দিন পর পর',
            method: 'জমিতে ২-৩ ইঞ্চি পানি রাখুন',
            criticalStages: ['বীজ বপনের ২৫-৩০ দিন', 'ফুল আসার সময়', 'দানা গঠনের সময়']
        },
        'গম': {
            waterRequirement: 18,
            frequency: '৭-১০ দিন পর পর',
            method: 'হালকা থেকে মাঝারি সেচ',
            criticalStages: ['বপনের ২০-২৫ দিন পর', 'কাইচ থোর আসার সময়', 'দানা গঠনের সময়']
        },
        'আলু': {
            waterRequirement: 22,
            frequency: '৫-৭ দিন পর পর',
            method: 'ফুরো পদ্ধতিতে সেচ',
            criticalStages: ['গাছ ১৫-২০ সেমি হলে', 'কন্দ গঠনের সময়', 'কন্দ বড় হওয়ার সময়']
        },
        'পাট': {
            waterRequirement: 28,
            frequency: '৪-৬ দিন পর পর',
            method: 'জমিতে হালকা পানি রাখুন',
            criticalStages: ['বপনের ৩০-৩৫ দিন পর', 'দ্রুত বাড়ন্ত অবস্থায়']
        }
    };

    // মাটির ধরন অনুযায়ী পানির ধারণ ক্ষমতা
    const soilWaterCapacity = {
        'বেলে': 15,
        'দোআঁশ': 25,
        'এটেল': 35
    };

    // সেচ ক্যালকুলেশন
    const calculateIrrigation = () => {
        const crop = cropsData[selectedCrop];
        const soilCapacity = soilWaterCapacity[soilType];
        const currentMoisture = weatherData.soilMoisture;
        const waterDeficit = soilCapacity - currentMoisture;
        
        return {
            requiredWater: Math.max(crop.waterRequirement, waterDeficit),
            timing: currentMoisture < 30 ? 'জরুরি সেচ প্রয়োজন' : 'নিয়মিত সেচ',
            duration: Math.round((area * crop.waterRequirement * 60) / 10) // মিনিটে
        };
    };

    const irrigationAdvice = calculateIrrigation();