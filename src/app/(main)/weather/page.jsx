"use client"
import React, { useState, useEffect } from 'react';
import { 
  FaSeedling, 
  FaTint, 
  FaCloudSun, 
  FaCalendarAlt,
  FaSearch,
  FaLeaf,
  FaTree,
  FaCarrot,
  FaWind,
  FaTemperatureHigh,
  FaTachometerAlt,
  FaInfoCircle
} from 'react-icons/fa';

const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [expandedTasks, setExpandedTasks] = useState({});

  const lat = "23.8103";
  const lon = "90.4125";
  const apiKey = "eed75703a552ed1ad8db7b42f4f3e024";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=bn`;

  // Work  farming types
  const workSchedule = {
    rice: [
      {
        task: "বীজ বপন",
        description: "অক্টোবরের প্রথম সপ্তাহে আমন ধানের বীজ বপন করুন। মাটি আর্দ্র রাখুন এবং নিষ্কাশন নিশ্চিত করুন।",
        nextStep: "১৫-২০ দিন পর চারা রোপণের জন্য প্রস্তুতি নিন।",
        month: "অক্টোবর",
        duration: "৭ দিন",
        priority: "উচ্চ",
        steps: [
          "জমি ভালভাবে চাষ ও মই দিয়ে প্রস্তুত করুন",
          "বীজ ২৪ ঘন্টা পানিতে ভিজিয়ে রাখুন",
          "প্রতি হেক্টরে ৩০-৪০ কেজি বীজ ব্যবহার করুন",
          "বীজ বপনের পর হালকা সেচ দিন"
        ]
      },
      {
        task: "সেচ ব্যবস্থাপনা",
        description: "প্রতি ৫-৭ দিনে সেচ দিন। জমিতে পানির স্তর ৫-৭ সেমি রাখুন।",
        nextStep: "আগাছা পরিষ্কার করুন এবং কীটপতঙ্গ পর্যবেক্ষণ করুন।",
        month: "অক্টোবর-নভেম্বর",
        duration: "নিয়মিত",
        priority: "মাধ্যমিক",
        steps: [
          "চারা রোপণের পর ২-৩ সেমি পানি রাখুন",
          "বৃদ্ধি পর্যায়ে ৫-৭ সেমি পানি বজায় রাখুন",
          "ফসল পাকার ১৫ দিন আগে সেচ বন্ধ করুন"
        ]
      },
      {
        task: "সার প্রয়োগ",
        description: "নভেম্বরের মাঝামাঝি ইউরিয়া এবং পটাশ সার প্রয়োগ করুন।",
        nextStep: "১০-১৫ দিন পর ফসলের বৃদ্ধি পরীক্ষা করুন।",
        month: "নভেম্বর",
        duration: "৩-৫ দিন",
        priority: "উচ্চ",
        steps: [
          "জমি তৈরির সময় হেক্টরপ্রতি ১০ টন জৈব সার দিন",
          "ইউরিয়া তিন কিস্তিতে প্রয়োগ করুন",
          "চারা রোপণের ১৫-২০ দিন পর প্রথম কিস্তি",
          "চারা রোপণের ৩০-৩৫ দিন পর দ্বিতীয় কিস্তি"
        ]
      },
      {
        task: "ফসল সংগ্রহ",
        description: "ডিসেম্বরের শেষ সপ্তাহে ফসল সংগ্রহ করুন। শুকনো আবহাওয়ায় সংগ্রহ করা উচিত।",
        nextStep: "পরবর্তী ফসলের জন্য জমি প্রস্তুত করুন।",
        month: "ডিসেম্বর",
        duration: "৭-১০ দিন",
        priority: "উচ্চ",
        steps: [
          "ধান যখন ৮০-৮৫% পাকবে তখন সংগ্রহ করুন",
          "সকালে কুয়াশা কাটলে সংগ্রহ শুরু করুন",
          "ধানের গাছ কেটে শুকানোর জন্য রাখুন",
          "ভালভাবে শুকিয়ে মাড়াই করুন"
        ]
      },
    ],
    vegetables: [
      {
        task: "মাটি প্রস্তুতি",
        description: "অক্টোবরে শীতকালীন সবজি (যেমন ফুলকপি, বাঁধাকপি) জন্য মাটি চাষ করুন। জৈব সার মেশান।",
        nextStep: "৭-১০ দিন পর বীজ বা চারা রোপণ করুন।",
        month: "অক্টোবর",
        duration: "৫-৭ দিন",
        priority: "উচ্চ",
        steps: [
          "জমি ২-৩ বার চাষ ও মই দিন",
          "প্রতি হেক্টরে ১৫-২০ টন জৈব সার প্রয়োগ করুন",
          "বেড তৈরি করুন এবং নিষ্কাশনের ব্যবস্থা করুন",
          "মাটির pH ৬-৬.৫ এর মধ্যে রাখুন"
        ]
      },
      {
        task: "চারা রোপণ",
        description: "টমেটো, বেগুন বা মরিচের চারা নভেম্বরের প্রথম সপ্তাহে রোপণ করুন।",
        nextStep: "নিয়মিত সেচ এবং আগাছা নিয়ন্ত্রণ করুন।",
        month: "নভেম্বর",
        duration: "৭-১০ দিন",
        priority: "উচ্চ",
        steps: [
          "সুস্থ ও সবল চারা নির্বাচন করুন",
          "সন্ধ্যার আগে চারা রোপণ করুন",
          "চারার মধ্যে দূরত্ব বজায় রাখুন",
          "রোপণের পর হালকা সেচ দিন"
        ]
      },
      {
        task: "কীটনাশক প্রয়োগ",
        description: "পোকামাকড়ের আক্রমণ দেখা গেলে জৈব কীটনাশক ব্যবহার করুন।",
        nextStep: "প্রতি সপ্তাহে ফসল পর্যবেক্ষণ করুন।",
        month: "নভেম্বর-ডিসেম্বর",
        duration: "নিয়মিত",
        priority: "মাধ্যমিক",
        steps: [
          "সপ্তাহে একবার ফসল পরিদর্শন করুন",
          "জৈব কীটনাশক যেমন নিম তেল ব্যবহার করুন",
          "আক্রান্ত অংশ সরিয়ে ফেলুন",
          "ফেরোমন ফাঁদ ব্যবহার করুন"
        ]
      },
      {
        task: "ফসল সংগ্রহ",
        description: "ডিসেম্বর-জানুয়ারিতে সবজি সংগ্রহ করুন। সকালে সংগ্রহ করা ভালো।",
        nextStep: "বাজারজাতকরণের জন্য প্রস্তুতি নিন।",
        month: "ডিসেম্বর-জানুয়ারি",
        duration: "১৫-২০ দিন",
        priority: "উচ্চ",
        steps: [
          "সকালে বা বিকেলে সংগ্রহ করুন",
          "পরিপক্ব কিন্তু কচি সবজি সংগ্রহ করুন",
          "সাবধানে সংগ্রহ করে ক্ষতি এড়ান",
          "সংগ্রহের পর ঠান্ডা স্থানে রাখুন"
        ]
      },
    ],
    fruits: [
      {
        task: "গাছ ছাঁটাই",
        description: "অক্টোবরে আম, লিচু বা কাঁঠাল গাছের অতিরিক্ত ডাল ছাঁটাই করুন।",
        nextStep: "ছাঁটাইয়ের পর কীটনাশক স্প্রে করুন।",
        month: "অক্টোবর",
        duration: "১০-১৫ দিন",
        priority: "মাধ্যমিক",
        steps: [
          "শুকনো ও রোগাক্রান্ত ডাল কাটুন",
          "অতিরিক্ত ঘন ডাল পাতলা করুন",
          "ছাঁটাই করার পর কাটা স্থানে বোর্দো পেস্ট লাগান",
          "ছাঁটাই কাঁচি জীবাণুমুক্ত করুন"
        ]
      },
      {
        task: "সার প্রয়োগ",
        description: "নভেম্বরে ফল গাছের গোড়ায় জৈব সার এবং পটাশ প্রয়োগ করুন।",
        nextStep: "মাটির আর্দ্রতা পরীক্ষা করুন এবং সেচ দিন।",
        month: "নভেম্বর",
        duration: "৫-৭ দিন",
        priority: "উচ্চ",
        steps: [
          "গাছের চারপাশে গোড়া থেকে ১ মিটার দূরে সার দিন",
          "জৈব সার, ইউরিয়া ও পটাশ মিশ্রণ প্রয়োগ করুন",
          "সার প্রয়োগের পর হালকা সেচ দিন",
          "মালচিং করুন মাটির আর্দ্রতা রাখতে"
        ]
      },
      {
        task: "ফল সংগ্রহ",
        description: "ডিসেম্বরে পাকা ফল (যেমন কমলা, পেয়ারা) সংগ্রহ শুরু করুন।",
        nextStep: "বাজারজাতকরণের জন্য প্রস্তুতি নিন।",
        month: "ডিসেম্বর",
        duration: "১৫-২০ দিন",
        priority: "উচ্চ",
        steps: [
          "ফলের রং ও আকার দেখে পরিপক্বতা যাচাই করুন",
          "সকালে ফল সংগ্রহ করুন",
          "ফল সাবধানে পেড়ে ক্ষতি এড়ান",
          "সংগ্রহের পর ছায়ায় রাখুন"
        ]
      },
      {
        task: "গাছের যত্ন",
        description: "জানুয়ারিতে গাছের গোড়ায় খুঁটি দিন এবং শীতকালীন সুরক্ষা নিশ্চিত করুন।",
        nextStep: "বসন্তের জন্য প্রস্তুতি নিন।",
        month: "জানুয়ারি",
        duration: "৭-১০ দিন",
        priority: "মাধ্যমিক",
        steps: [
          "তরুণ গাছকে খুঁটি দিয়ে সোজা রাখুন",
          "গোড়ায় খড় বা পলিথিন দিয়ে ঢেকে দিন",
          "শীতকালীন স্প্রে করুন রোগ প্রতিরোধে",
          "নিয়মিত পানি দিন কিন্তু অতিরিক্ত নয়"
        ]
      },
    ],
    potato: [
      {
        task: "জমি প্রস্তুতি",
        description: "অক্টোবরে আলু চাষের জন্য জমি প্রস্তুত করুন। মাটি গভীরভাবে চাষ করুন।",
        nextStep: "বীজ আলু বপন করুন",
        month: "অক্টোবর",
        duration: "৭-১০ দিন",
        priority: "উচ্চ",
        steps: [
          "জমি ১৫-২০ সেমি গভীর পর্যন্ত চাষ করুন",
          "মই দিয়ে মাটি সমতল ও নরম করুন",
          "প্রতি হেক্টরে ১৫-২০ টন জৈব সার মিশান",
          "বেড তৈরি করুন এবং নিষ্কাশনের ব্যবস্থা করুন"
        ]
      },
      {
        task: "বীজ বপন",
        description: "নভেম্বরের প্রথম সপ্তাহে সুস্থ ও রোগমুক্ত বীজ আলু বপন করুন।",
        nextStep: "সেচ ও আগাছা নিয়ন্ত্রণ করুন",
        month: "নভেম্বর",
        duration: "৫-৭ দিন",
        priority: "উচ্চ",
        steps: [
          "প্রতি হেক্টরে ১.৫-২ টন বীজ আলু ব্যবহার করুন",
          "লাইন থেকে লাইন ৬০ সেমি ও গাছ থেকে গাছ ২৫ সেমি দূরত্ব রাখুন",
          "বীজ ৪-৫ সেমি গভীরে বপন করুন",
          "বপনের পর হালকা সেচ দিন"
        ]
      },
      {
        task: "সার ও সেচ ব্যবস্থাপনা",
        description: "নিয়মিত সেচ দিন এবং সঠিক সময়ে সার প্রয়োগ করুন।",
        nextStep: "কীটপতঙ্গ নিয়ন্ত্রণ করুন",
        month: "নভেম্বর-ডিসেম্বর",
        duration: "নিয়মিত",
        priority: "উচ্চ",
        steps: [
          "বপনের ৩০ ও ৫০ দিন পর ইউরিয়া সার দিন",
          "মাটি আর্দ্র কিন্তু ভেজা না রাখুন",
          "ফসল সংগ্রহের ১৫ দিন আগে সেচ বন্ধ করুন",
          "আগাছা নিয়মিত পরিষ্কার করুন"
        ]
      },
      {
        task: "ফসল সংগ্রহ",
        description: "জানুয়ারি-ফেব্রুয়ারিতে আলু সংগ্রহ করুন যখন গাছের পাতা শুকিয়ে যায়।",
        nextStep: "সংগ্রহিত আলু সংরক্ষণ করুন",
        month: "জানুয়ারি-ফেব্রুয়ারি",
        duration: "১০-১৫ দিন",
        priority: "উচ্চ",
        steps: [
          "গাছের পাতা শুকিয়ে গেলে সংগ্রহ শুরু করুন",
          "খনন করার সময় আলু ক্ষতিগ্রস্ত না হয় সেদিকে খেয়াল রাখুন",
          "সংগ্রহের পর আলু ১০-১৫ দিন ছায়ায় শুকান",
          "শুকনো আলু ঠান্ডা ও শুষ্ক স্থানে সংরক্ষণ করুন"
        ]
      },
    ],
    jute: [
      {
        task: "জমি প্রস্তুতি",
        description: "মার্চ-এপ্রিলে পাট চাষের জন্য জমি প্রস্তুত করুন। মাটি ভালভাবে চাষ করুন।",
        nextStep: "বীজ বপন করুন",
        month: "মার্চ-এপ্রিল",
        duration: "১০-১২ দিন",
        priority: "উচ্চ",
        steps: [
          "জমি ৪-৫ বার চাষ ও মই দিন",
          "মাটি ঝুরঝুরে ও সমতল করুন",
          "প্রতি হেক্টরে ১০-১২ টন জৈব সার প্রয়োগ করুন",
          "জমিতে পর্যাপ্ত নিষ্কাশনের ব্যবস্থা করুন"
        ]
      },
      {
        task: "বীজ বপন",
        description: "এপ্রিল-মে মাসে পাটের বীজ বপন করুন। বপনের আগে বীজ শোধন করুন।",
        nextStep: "চারা পাতলা করুন",
        month: "এপ্রিল-মে",
        duration: "৫-৭ দিন",
        priority: "উচ্চ",
        steps: [
          "প্রতি হেক্টরে ৮-১০ কেজি বীজ ব্যবহার করুন",
          "বপনের আগে বীজ ভিটাভেক্স বা ক্যাপটান দিয়ে শোধন করুন",
          "ছিটিয়ে বা সারিতে বীজ বপন করুন",
          "বপনের পর হালকা সেচ দিন"
        ]
      },
      {
        task: "পরিচর্যা ও সার প্রয়োগ",
        description: "নিয়মিত আগাছা পরিষ্কার করুন এবং সঠিক সময়ে সার প্রয়োগ করুন。",
        nextStep: "পাট পাকার জন্য পর্যবেক্ষণ করুন",
        month: "মে-জুন",
        duration: "নিয়মিত",
        priority: "মাধ্যমিক",
        steps: [
          "চারা গজানোর ১৫-২০ দিন পর পাতলা করুন",
          "বপনের ২৫-৩০ দিন পর প্রথম কিস্তির সার দিন",
          "আগাছা নিয়মিত পরিষ্কার করুন",
          "মাটি আর্দ্র রাখুন কিন্তু জলাবদ্ধতা এড়ান"
        ]
      },
      {
        task: "ফসল সংগ্রহ",
        description: "জুলাই-আগস্টে পাট সংগ্রহ করুন যখন ফুল ফোটার পর্যায় আসে।",
        nextStep: "পাট পচান ও আঁশ分离 করুন",
        month: "জুলাই-আগস্ট",
        duration: "১৫-২০ দিন",
        priority: "উচ্চ",
        steps: [
          "যখন ৫০% গাছে ফুল আসে তখন সংগ্রহ করুন",
          "জমি কাদা করলে গাছ উপড়ে ফেলুন",
          "১০-১৫ দিন পানিতে ভিজিয়ে পাট পচান",
          "পচানোর পর আঁশ ছাড়িয়ে শুকান"
        ]
      },
    ],
    mustard: [
      {
        task: "জমি প্রস্তুতি",
        description: "অক্টোবর-নভেম্বরে সরিষা চাষের জন্য জমি প্রস্তুত করুন। মাটি হালকা চাষ করুন।",
        nextStep: "বীজ বপন করুন",
        month: "অক্টোবর-নভেম্বর",
        duration: "৫-৭ দিন",
        priority: "উচ্চ",
        steps: [
          "জমি ২-৩ বার চাষ ও মই দিন",
          "মাটি সমতল ও ঝুরঝুরে করুন",
          "প্রতি হেক্টরে ৮-১০ টন জৈব সার প্রয়োগ করুন",
          "বেড পদ্ধতিতে চাষ করা ভালো"
        ]
      },
      {
        task: "বীজ বপন",
        description: "নভেম্বরের মাঝামাঝি সরিষার বীজ বপন করুন। সারিতে বপন করা ভালো।",
        nextStep: "চারা পাতলা করুন",
        month: "নভেম্বর",
        duration: "৩-৫ দিন",
        priority: "উচ্চ",
        steps: [
          "প্রতি হেক্টরে ৬-৮ কেজি বীজ ব্যবহার করুন",
          "সারি থেকে সারি ৩০ সেমি ও গাছ থেকে গাছ ১০ সেমি দূরত্ব রাখুন",
          "বীজ ২-৩ সেমি গভীরে বপন করুন",
          "বপনের পর হালকা সেচ দিন"
        ]
      },
      {
        task: "সার প্রয়োগ ও পরিচর্যা",
        description: "সঠিক সময়ে সার প্রয়োগ করুন এবং আগাছা নিয়ন্ত্রণ করুন।",
        nextStep: "ফসল পাকার জন্য পর্যবেক্ষণ করুন",
        month: "নভেম্বর-ডিসেম্বর",
        duration: "নিয়মিত",
        priority: "মাধ্যমিক",
        steps: [
          "বপনের ২৫-৩০ দিন পর প্রথম কিস্তির সার দিন",
          "আগাছা নিয়মিত পরিষ্কার করুন",
          "হালকা সেচ দিন, জলাবদ্ধতা এড়ান",
          "প্রয়োজনে হাত দিয়ে পাতলা করুন"
        ]
      },
      {
        task: "ফসল সংগ্রহ",
        description: "জানুয়ারি-ফেব্রুয়ারিতে সরিষা সংগ্রহ করুন যখন ফল বাদামি রং ধারণ করে।",
        nextStep: "বীজ মাড়াই ও সংরক্ষণ করুন",
        month: "জানুয়ারি-ফেব্রুয়ারি",
        duration: "৭-১০ দিন",
        priority: "উচ্চ",
        steps: [
          "যখন ৭৫% ফল বাদামি হয় তখন সংগ্রহ করুন",
          "সকালে কাটুন যাতে ফল ফেটে না যায়",
          "কাটার পর ৫-৭ দিন শুকান",
          "শুকানোর পর মাড়াই করে বীজ সংগ্রহ করুন"
        ]
      },
    ]
  }
  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("আবহাওয়া তথ্য লোড করতে ব্যর্থ");
        }
        const data = await response.json();
        // Filter for daily data at 12:00 PM
        const dailyData = data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
        setWeatherData(dailyData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchWeather();
  }, [apiUrl]);

  // current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Toggle task expansion
  const toggleTaskExpansion = (index) => {
    setExpandedTasks(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Filter schedule based on selected crop and search term
  const displayedSchedule = selectedCrop === 'all'
    ? [
        ...workSchedule.rice, 
        ...workSchedule.vegetables, 
        ...workSchedule.fruits,
        ...workSchedule.potato,
        ...workSchedule.jute,
        ...workSchedule.mustard
      ]
    : workSchedule[selectedCrop];

  const filteredSchedule = displayedSchedule.filter(item => 
    item.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get weather advice based on conditions
  const getWeatherAdvice = (forecast) => {
    const temp = forecast.main.temp;
    const humidity = forecast.main.humidity;
    const windSpeed = forecast.wind.speed;
    const weatherMain = forecast.weather[0].main;

    if (weatherMain === "Rain") {
      return "বৃষ্টির সম্ভাবনা আছে, সেচ কমিয়ে দিন।";
    } else if (temp > 35) {
      return "অতিরিক্ত গরম, সকাল ও সন্ধ্যায় সেচ দিন।";
    } else if (temp < 15) {
      return "ঠান্ডা আবহাওয়া, ফসল সুরক্ষার ব্যবস্থা নিন।";
    } else if (humidity > 80) {
      return "উচ্চ আর্দ্রতা, ফসলের রোগের ঝুঁকি বেশি।";
    } else if (windSpeed > 5) {
      return "তীব্র বাতাস, গাছের সুরক্ষা নিশ্চিত করুন।";
    } else {
      return "নিয়মিত সেচ ও পরিচর্যা বজায় রাখুন।";
    }
  };

  // Get  color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'উচ্চ':
        return 'bg-red-50 border-red-500 text-red-800';
      case 'মাধ্যমিক':
        return 'bg-yellow-50 border-yellow-500 text-yellow-800';
      default:
        return 'bg-green-50 border-green-500 text-green-800';
    }
  };

  // Get crop icon
  const getCropIcon = (cropType) => {
    switch (cropType) {
      case 'rice':
        return <FaSeedling className="text-green-600" />;
      case 'vegetables':
        return <FaCarrot className="text-orange-500" />;
      case 'fruits':
        return <FaTree className="text-red-500" />;
      case 'potato':
        return <FaLeaf className="text-purple-500" />;
      case 'jute':
        return <FaLeaf className="text-yellow-600" />;
      case 'mustard':
        return <FaLeaf className="text-yellow-400" />;
      default:
        return <FaSeedling className="text-green-600" />;
    }
  };

    return (
         <div className="bg-gradient-to-br from-green-50 via-amber-50 to-blue-50 min-h-screen flex flex-col items-center p-4 font-['Noto_Sans_Bengali']">
      <header className="text-center mb-8 w-full ">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex items-center">
            <FaSeedling className="text-4xl text-green-600 mr-3" />
            <div>
              <h1 className="text-4xl font-bold text-green-800">কৃষকের সহায়ক</h1>
              <p className="text-lg text-gray-700">বিভিন্ন ফসলের জন্য কাজের সময়সূচী এবং আবহাওয়া তথ্য</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow mt-4 md:mt-0">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <FaCalendarAlt className="mr-2" />
              <span>
                {currentDateTime.toLocaleDateString("bn-BD", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <p className="text-lg font-semibold text-green-700">
              {currentDateTime.toLocaleTimeString("bn-BD")}
            </p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="flex justify-center mb-2">
              <FaSeedling className="text-2xl text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{workSchedule.rice.length}</p>
            <p className="text-sm text-gray-600">ধান</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="flex justify-center mb-2">
              <FaCarrot className="text-2xl text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-green-600">{workSchedule.vegetables.length}</p>
            <p className="text-sm text-gray-600">সবজি</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="flex justify-center mb-2">
              <FaTree className="text-2xl text-red-500" />
            </div>
            <p className="text-2xl font-bold text-green-600">{workSchedule.fruits.length}</p>
            <p className="text-sm text-gray-600">ফল</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="flex justify-center mb-2">
              <FaLeaf className="text-2xl text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-green-600">{workSchedule.potato.length}</p>
            <p className="text-sm text-gray-600">আলু</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="flex justify-center mb-2">
              <FaLeaf className="text-2xl text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{workSchedule.jute.length}</p>
            <p className="text-sm text-gray-600">পাট</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="flex justify-center mb-2">
              <FaLeaf className="text-2xl text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-green-600">{workSchedule.mustard.length}</p>
            <p className="text-sm text-gray-600">সরিষা</p>
          </div>
        </div>
      </header>

      <main className="w-full ">
        {/* Crop Filter and Search */}
        <section className="mb-6 bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full md:w-auto">
              <h2 className="text-xl font-semibold text-green-700 mb-2 flex items-center">
                <FaSeedling className="mr-2" />
                ফসল নির্বাচন করুন
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 rounded-lg transition-all flex items-center ${selectedCrop === 'all' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setSelectedCrop('all')}
                >
                  <FaSeedling className="mr-2" />
                  সব ফসল
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-all flex items-center ${selectedCrop === 'rice' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setSelectedCrop('rice')}
                >
                  <FaSeedling className="mr-2" />
                  ধান
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-all flex items-center ${selectedCrop === 'vegetables' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setSelectedCrop('vegetables')}
                >
                  <FaCarrot className="mr-2" />
                  সবজি
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-all flex items-center ${selectedCrop === 'fruits' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setSelectedCrop('fruits')}
                >
                  <FaTree className="mr-2" />
                  ফল
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-all flex items-center ${selectedCrop === 'potato' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setSelectedCrop('potato')}
                >
                  <FaLeaf className="mr-2" />
                  আলু
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-all flex items-center ${selectedCrop === 'jute' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setSelectedCrop('jute')}
                >
                  <FaLeaf className="mr-2" />
                  পাট
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-all flex items-center ${selectedCrop === 'mustard' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setSelectedCrop('mustard')}
                >
                  <FaLeaf className="mr-2" />
                  সরিষা
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-64">
              <h2 className="text-xl font-semibold text-green-700 mb-2 flex items-center">
                <FaSearch className="mr-2" />
                কাজ খুঁজুন
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="কাজের নাম বা বর্ণনা লিখুন..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Work Schedule Section */}
        <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-green-700 flex items-center">
              <FaCalendarAlt className="mr-2" />
              কৃষি কাজের সময়সূচী
            </h2>
            <div className="text-sm text-gray-600 flex items-center">
              <FaInfoCircle className="mr-1" />
              মোট কাজ: {filteredSchedule.length}টি
            </div>
          </div>
          
          {filteredSchedule.length === 0 ? (
            <div className="text-center py-8">
              <FaSearch className="text-4xl text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">কোন কাজ পাওয়া যায়নি। অনুসন্ধান পরিবর্তন করুন।</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSchedule.map((item, index) => (
                <div 
                  key={index} 
                  className={`border-l-4 p-4 rounded-r-lg transition-all hover:shadow-md ${getPriorityColor(item.priority)}`}
                >
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-2 md:mb-0 flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-medium">{item.task}</h3>
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${
                          item.priority === 'উচ্চ' ? 'bg-red-500 text-white' : 
                          item.priority === 'মাধ্যমিক' ? 'bg-yellow-500 text-white' : 
                          'bg-green-500 text-white'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-gray-700">{item.description}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>পরবর্তী কাজ:</strong> {item.nextStep}
                      </p>
                      
                      {/* Expandable Steps Section */}
                      {item.steps && (
                        <div className="mt-3">
                          <button
                            onClick={() => toggleTaskExpansion(index)}
                            className="flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            <span>ধাপে ধাপে পদ্ধতি {expandedTasks[index] ? 'লুকান' : 'দেখুন'}</span>
                            <svg 
                              className={`ml-1 w-4 h-4 transition-transform ${expandedTasks[index] ? 'rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {expandedTasks[index] && (
                            <div className="mt-2 bg-white p-3 rounded-lg border border-green-200">
                              <h4 className="font-medium text-green-700 mb-2">বিস্তারিত পদ্ধতি:</h4>
                              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                                {item.steps.map((step, stepIndex) => (
                                  <li key={stepIndex} className="pl-2">{step}</li>
                                ))}
                              </ol>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col text-sm space-y-2">
                      <div className="flex items-center bg-white px-2 py-1 rounded">
                        <FaCalendarAlt className="mr-1 text-green-600" />
                        <span><strong>মাস:</strong> {item.month}</span>
                      </div>
                      <div className="flex items-center bg-white px-2 py-1 rounded">
                        <FaTachometerAlt className="mr-1 text-blue-600" />
                        <span><strong>সময়:</strong> {item.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
         {/* Weather Forecast Section */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center">
            <FaCloudSun className="mr-2" />
            আবহাওয়ার পূর্বাভাস (ঢাকা)
          </h2>
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              <p className="ml-4 text-gray-600">তথ্য লোড হচ্ছে...</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
              <button 
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center"
                onClick={() => window.location.reload()}
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {weatherData.map((forecast, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-4 text-center shadow hover:shadow-md transition-shadow"
                >
                  <p className="font-medium text-lg">
                    {new Date(forecast.dt * 1000).toLocaleDateString("bn-BD", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                  <div className="my-3">
                    <img 
                      src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
                      alt={forecast.weather[0].description}
                      className="mx-auto"
                    />
                    <p className="text-lg capitalize">{forecast.weather[0].description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-white bg-opacity-70 p-2 rounded flex flex-col items-center">
                      <FaTemperatureHigh className="text-red-500 mb-1" />
                      <p className="font-semibold">তাপমাত্রা</p>
                      <p>{Math.round(forecast.main.temp)}°C</p>
                    </div>
                    <div className="bg-white bg-opacity-70 p-2 rounded flex flex-col items-center">
                      <FaTint className="text-blue-500 mb-1" />
                      <p className="font-semibold">আর্দ্রতা</p>
                      <p>{forecast.main.humidity}%</p>
                    </div>
                    <div className="bg-white bg-opacity-70 p-2 rounded flex flex-col items-center">
                      <FaWind className="text-gray-500 mb-1" />
                      <p className="font-semibold">বাতাস</p>
                      <p>{forecast.wind.speed} মি/সে</p>
                    </div>
                    <div className="bg-white bg-opacity-70 p-2 rounded flex flex-col items-center">
                      <FaTachometerAlt className="text-purple-500 mb-1" />
                      <p className="font-semibold">চাপ</p>
                      <p>{forecast.main.pressure} hPa</p>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-white bg-opacity-80 rounded">
                    <p className="text-sm font-semibold text-green-700 flex items-center justify-center">
                      <FaInfoCircle className="mr-1" />
                      কৃষি পরামর্শ:
                    </p>
                    <p className="text-sm mt-1">{getWeatherAdvice(forecast)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Additional Resources Section */}
        <section className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">কৃষি সম্পদ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-700 mb-2">কৃষি পরামর্শ</h3>
              <p className="text-sm text-gray-600 mb-3">বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট থেকে সর্বশেষ কৃষি প্রযুক্তি সম্পর্কে জানুন।</p>
              <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors">
                আরও জানুন
              </button>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-700 mb-2">বাজার দর</h3>
              <p className="text-sm text-gray-600 mb-3">সর্বশেষ ফসলের বাজার মূল্য এবং বাজার সংবাদ সম্পর্কে আপডেট থাকুন।</p>
              <button className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-600 transition-colors">
                দেখুন
              </button>
            </div>
          </div>
        </section>
      </main>

      
    </div>
    );
};

export default WeatherPage;