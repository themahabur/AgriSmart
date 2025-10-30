"use client"
import { useState } from "react";
import { 
  FaCalendarAlt, 
  FaSeedling, 
  FaTractor, 
  FaTools, 
  FaExclamationTriangle,
  FaWater,
  FaDollarSign,
  FaCloudSun,
  FaPhoneAlt,
  FaLeaf,
  FaChartLine,
  FaInfoCircle
} from "react-icons/fa";
import { 
  WiRain, 
  WiDaySunny 
} from "react-icons/wi";

const KrishiCalendar = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [activeTab, setActiveTab] = useState('crops');
  const [selectedMonth, setSelectedMonth] = useState('');

  // Your existing cropData and monthlyActivities objects remain the same
 const cropData = {
  "ধান": {
    "বোরো": {
      planting: "নভেম্বর - ডিসেম্বর",
      irrigation: "সপ্তাহে ২-৩ বার, মাটি আর্দ্র রাখুন",
      harvesting: "মার্চ - এপ্রিল",
      soilType: "দোআঁশ বা এঁটেল দোআঁশ মাটি",
      climate: "শীতল ও শুষ্ক আবহাওয়া",
      duration: "৪-৫ মাস",
      water: "মাঝারি",
      fertilizer: "ইউরিয়া: ২৫০-৩০০ kg/ha, TSP: ১৮০-২০০ kg/ha",
      pestControl: "নিম তেল স্প্রে করুন, সমন্বিত বালাই ব্যবস্থাপনা",
      suggestions: ["উচ্চ ফলনশীল জাত ব্যবহার করুন", "সময়মতো সার প্রয়োগ করুন", "জৈব সারের ব্যবহার বৃদ্ধি করুন"],
      seedRate: "২৫-৩০ kg/ha",
      yield: "৪-৫ টন/হেক্টর",
      marketPrice: "১২০০-১৫০০ টাকা/মন",
      profit: "৪০-৫০ হাজার টাকা/হেক্টর"
    },
    "আমন": {
      planting: "জুলাই - আগস্ট",
      irrigation: "বৃষ্টির পানির উপর নির্ভরশীল, প্রয়োজন হলে সেচ দিন",
      harvesting: "নভেম্বর - ডিসেম্বর",
      soilType: "দোআঁশ মাটি",
      climate: "উষ্ণ ও আর্দ্র বর্ষাকালীন আবহাওয়া",
      duration: "৫-৬ মাস",
      water: "অধিক",
      fertilizer: "ইউরিয়া: ২০০-২৫০ kg/ha, MOP: ১০০-১২০ kg/ha",
      pestControl: "জৈব কীটনাশক, লাইট ট্রাপ ব্যবহার",
      suggestions: ["বন্যামুক্ত জমি নির্বাচন করুন", "জৈব সার ব্যবহার করুন", "নিকাশী ব্যবস্থা ভালো রাখুন"],
      seedRate: "৩০-৩৫ kg/ha",
      yield: "৩-৪ টন/হেক্টর",
      marketPrice: "১০০০-১২০০ টাকা/মন",
      profit: "৩০-৪০ হাজার টাকা/হেক্টর"
    },
    "আউশ": {
      planting: "এপ্রিল - মে",
      irrigation: "প্রতি ১০-১৫ দিন পর সেচ দিন",
      harvesting: "আগস্ট - সেপ্টেম্বর",
      soilType: "দোআঁশ বা বেলে দোআঁশ মাটি",
      climate: "গরম ও আর্দ্র আবহাওয়া",
      duration: "৪-৫ মাস",
      water: "মাঝারি",
      fertilizer: "ইউরিয়া: ২০০ kg/ha, TSP: ১৫০ kg/ha",
      pestControl: "পাতা মোড়ানো পোকার দমন, নিম তেল স্প্রে",
      suggestions: ["বন্যা ঝুঁকিহীন এলাকা বেছে নিন", "সময়মতো আগাছা পরিষ্কার করুন"],
      seedRate: "২৫-৩০ kg/ha",
      yield: "২.৫-৩.৫ টন/হেক্টর",
      marketPrice: "৯০০-১১০০ টাকা/মন",
      profit: "২৫-৩০ হাজার টাকা/হেক্টর"
    }
  },

  "গম": {
    planting: "নভেম্বর - ডিসেম্বর",
    irrigation: "১৫-২০ দিন পর পর সেচ দিন",
    harvesting: "মার্চ - এপ্রিল",
    soilType: "দোআঁশ মাটি",
    climate: "শীতল ও শুষ্ক আবহাওয়া",
    duration: "৪-৫ মাস",
    water: "সল্প",
    fertilizer: "ইউরিয়া: ২৫০ kg/ha, TSP: ১৮০ kg/ha",
    pestControl: "ব্লাস্ট রোগ প্রতিরোধী জাত ব্যবহার করুন, আগাছা নিয়ন্ত্রণ করুন",
    suggestions: ["সময়মতো বপন করুন", "ফসল কাটার পর শুকিয়ে নিন"],
    seedRate: "১২০ kg/ha",
    yield: "৩-৩.৫ টন/হেক্টর",
    marketPrice: "১১০০-১৩০০ টাকা/মন",
    profit: "৫০-৬০ হাজার টাকা/হেক্টর"
  },

  "পাট": {
    planting: "মার্চ - এপ্রিল",
    irrigation: "অল্প কিন্তু নিয়মিত সেচ দিন",
    harvesting: "জুলাই - আগস্ট",
    soilType: "বেলে দোআঁশ মাটি",
    climate: "গরম ও আর্দ্র আবহাওয়া",
    duration: "৪ মাস",
    water: "মাঝারি",
    fertilizer: "ইউরিয়া: ১৫০ kg/ha, TSP: ১০০ kg/ha",
    pestControl: "আগাছা নিয়ন্ত্রণ ও জৈব বালাইনাশক ব্যবহার করুন",
    suggestions: ["নিকাশী ব্যবস্থা ভালো রাখুন", "গুণগত মানের বীজ ব্যবহার করুন", "সঠিক সময়ে কাটাই করুন", "জাক দেওয়া ঠিকভাবে সম্পন্ন করুন"],
    seedRate: "৫-৭ kg/ha",
    yield: "২.৫-৩ টন আঁশ/হেক্টর",
    marketPrice: "২০০০-২৫০০ টাকা/মন",
    profit: "৪০-৫০ হাজার টাকা/হেক্টর"
  },

  "আলু": {
    planting: "অক্টোবর - নভেম্বর",
    irrigation: "১০-১২ দিন পর পর সেচ দিন",
    harvesting: "জানুয়ারী - ফেব্রুয়ারী",
    soilType: "বেলে দোআঁশ মাটি",
    climate: "শীতল ও শুষ্ক আবহাওয়া",
    duration: "৩-৪ মাস",
    water: "মাঝারি",
    fertilizer: "ইউরিয়া: ৩০০ kg/ha, TSP: ২৫০ kg/ha, MOP: ২০০ kg/ha",
    pestControl: "লেট ব্লাইট রোগ নিয়ন্ত্রণ, কীটনাশক ব্যবহার",
    suggestions: ["উর্বর জমি নির্বাচন করুন", "সঠিক মাত্রায় সার প্রয়োগ করুন"],
    seedRate: "২০০০ kg/ha (বীজ আলু)",
    yield: "২০-২৫ টন/হেক্টর",
    marketPrice: "১২-১৮ টাকা/কেজি",
    profit: "৮০-১০০ হাজার টাকা/হেক্টর"
  },

  "টমেটো": {
    planting: "সেপ্টেম্বর - অক্টোবর",
    irrigation: "সপ্তাহে ২ বার, গাছের গোড়ায় পানি দিন",
    harvesting: "ডিসেম্বর - ফেব্রুয়ারী",
    soilType: "দোআঁশ মাটি",
    climate: "শীতল ও হালকা রোদযুক্ত আবহাওয়া",
    duration: "৪-৫ মাস",
    water: "সল্প",
    fertilizer: "ইউরিয়া: ২০০ kg/ha, TSP: ১৫০ kg/ha, কম্পোস্ট: ১০ টন/ha",
    pestControl: "নিম বেসড স্প্রে, ফেরোমন ট্রাপ ব্যবহার",
    suggestions: ["খুঁটি দিয়ে গাছ সোজা রাখুন", "পর্যাপ্ত সূর্যালোক নিশ্চিত করুন", "নিয়মিত স্প্রে করুন"],
    seedRate: "২৫০-৩০০ গ্রাম/ha",
    yield: "৩০-৪০ টন/হেক্টর",
    marketPrice: "২৫-৪০ টাকা/কেজি",
    profit: "১-১.৫ লাখ টাকা/হেক্টর"
  },

  "সরিষা": {
    planting: "অক্টোবর - নভেম্বর",
    harvesting: "ফেব্রুয়ারী - মার্চ",
    irrigation: "২-৩ বার সেচ যথেষ্ট",
    soilType: "দোআঁশ বা বেলে দোআঁশ মাটি",
    climate: "শীতল ও শুকনো",
    duration: "৩-৪ মাস",
    fertilizer: "ইউরিয়া: ৮০ kg/ha, TSP: ১৫০ kg/ha, MOP: ৭০ kg/ha",
    pestControl: "পাতা বিছা পোকার দমন, নিম তেল স্প্রে",
    suggestions: ["উচ্চ ফলনশীল জাত ব্যবহার করুন", "সময়মতো সার প্রয়োগ করুন"],
    seedRate: "৫-৭ kg/ha",
    yield: "১.২-১.৫ টন/হেক্টর",
    marketPrice: "২০০০-২২০০ টাকা/মন",
    profit: "৩০-৪০ হাজার টাকা/হেক্টর"
  },

  "ভুট্টা": {
    planting: "নভেম্বর - ডিসেম্বর",
    harvesting: "এপ্রিল - মে",
    irrigation: "প্রতি ১৫ দিন অন্তর সেচ দিন",
    soilType: "বেলে দোআঁশ বা দোআঁশ মাটি",
    climate: "মৃদু ঠান্ডা ও শুষ্ক",
    duration: "৫-৬ মাস",
    fertilizer: "ইউরিয়া: ২৫০ kg/ha, TSP: ২০০ kg/ha, MOP: ১৫০ kg/ha",
    pestControl: "কর্ণ বোরার দমন, ফেরোমন ট্রাপ ব্যবহার",
    suggestions: ["উচ্চ ফলনশীল জাত ব্যবহার করুন", "আগাছা নিয়ন্ত্রণ করুন"],
    seedRate: "২৫ kg/ha",
    yield: "৭-৮ টন/হেক্টর",
    marketPrice: "১০০০-১২০০ টাকা/মন",
    profit: "৬০-৭০ হাজার টাকা/হেক্টর"
  },

  "মসুর": {
    planting: "নভেম্বর",
    harvesting: "মার্চ",
    irrigation: "১-২ বার সেচ প্রয়োজন",
    soilType: "দোআঁশ বা বেলে দোআঁশ",
    climate: "শীতল ও শুষ্ক",
    duration: "৪ মাস",
    fertilizer: "TSP: ৮০ kg/ha, MOP: ৫০ kg/ha",
    pestControl: "পাতা পোড়া রোগ প্রতিরোধী জাত ব্যবহার",
    suggestions: ["অতিরিক্ত সেচ এড়িয়ে চলুন", "বীজে ছত্রাকনাশক ব্যবহার করুন"],
    seedRate: "৩০-৩৫ kg/ha",
    yield: "১.২-১.৫ টন/হেক্টর",
    marketPrice: "২০০০-২২০০ টাকা/মন",
    profit: "৩০-৪০ হাজার টাকা/হেক্টর"
  },

  "মরিচ": {
    planting: "সেপ্টেম্বর - অক্টোবর",
    harvesting: "ফেব্রুয়ারী - এপ্রিল",
    irrigation: "প্রতি সপ্তাহে ১-২ বার সেচ দিন",
    soilType: "দোআঁশ বা বেলে দোআঁশ",
    climate: "উষ্ণ ও রোদযুক্ত",
    duration: "৫-৬ মাস",
    fertilizer: "ইউরিয়া: ২০০ kg/ha, TSP: ১৫০ kg/ha, কম্পোস্ট: ৮ টন/ha",
    pestControl: "এফিড দমন, নিম তেল স্প্রে, ভাইরাস নিয়ন্ত্রণ",
    suggestions: ["গাছের গোড়ায় পানি দিন", "পর্যাপ্ত সূর্যালোক রাখুন"],
    seedRate: "১ kg/ha",
    yield: "১০-১২ টন/হেক্টর",
    marketPrice: "৭০-৯০ টাকা/কেজি",
    profit: "১-১.২ লাখ টাকা/হেক্টর"
  },

  "তিল": {
    planting: "মার্চ - এপ্রিল",
    harvesting: "জুলাই - আগস্ট",
    irrigation: "অল্প সেচ দিন",
    soilType: "বেলে দোআঁশ",
    climate: "গরম ও শুকনো আবহাওয়া",
    duration: "৩-৪ মাস",
    fertilizer: "ইউরিয়া: ৬০ kg/ha, TSP: ৮০ kg/ha",
    pestControl: "পাতা খাওয়া পোকার দমন, জৈব কীটনাশক",
    suggestions: ["শুকনো জমি নির্বাচন করুন", "আগাছা পরিষ্কার রাখুন"],
    seedRate: "৬-৭ kg/ha",
    yield: "১-১.২ টন/হেক্টর",
    marketPrice: "২২০০-২৫০০ টাকা/মন",
    profit: "৩০-৪০ হাজার টাকা/হেক্টর"
  },

  "সয়াবিন": {
    planting: "জুলাই - আগস্ট",
    harvesting: "নভেম্বর",
    irrigation: "বৃষ্টিনির্ভর, প্রয়োজনে হালকা সেচ",
    soilType: "দোআঁশ মাটি",
    climate: "উষ্ণ ও আর্দ্র",
    duration: "৪ মাস",
    fertilizer: "ইউরিয়া: ৫০ kg/ha, TSP: ১৫০ kg/ha",
    pestControl: "পাতা মোড়ানো পোকা দমন",
    suggestions: ["উচ্চ জমি নির্বাচন করুন", "সময়মতো সার দিন"],
    seedRate: "৫০ kg/ha",
    yield: "১.৫-২ টন/হেক্টর",
    marketPrice: "১৮০০-২০০০ টাকা/মন",
    profit: "৩০-৪৫ হাজার টাকা/হেক্টর"
  },

  "বেগুন": {
    planting: "অক্টোবর - নভেম্বর",
    harvesting: "ফেব্রুয়ারী - মে",
    irrigation: "সপ্তাহে ২-৩ বার সেচ দিন",
    soilType: "দোআঁশ মাটি",
    climate: "উষ্ণ ও হালকা ঠান্ডা আবহাওয়া",
    duration: "৫-৬ মাস",
    fertilizer: "ইউরিয়া: ২৫০ kg/ha, TSP: ২০০ kg/ha, কম্পোস্ট: ১০ টন/ha",
    pestControl: "লিফ মাইনর, ফলছিদ্র পোকা নিয়ন্ত্রণ করুন",
    suggestions: ["খুঁটি দিয়ে গাছের সাপোর্ট দিন", "পর্যাপ্ত সূর্যালোক রাখুন"],
    seedRate: "৩০০-৪০০ গ্রাম/ha",
    yield: "২৫-৩০ টন/হেক্টর",
    marketPrice: "২৫-৩৫ টাকা/কেজি",
    profit: "৮০-৯০ হাজার টাকা/হেক্টর"
  },

  "শসা": {
    planting: "ফেব্রুয়ারী - মার্চ",
    harvesting: "এপ্রিল - মে",
    irrigation: "প্রতি ৫-৭ দিন পর সেচ দিন",
    soilType: "বেলে দোআঁশ মাটি",
    climate: "গরম ও আর্দ্র",
    duration: "৩ মাস",
    fertilizer: "ইউরিয়া: ১৫০ kg/ha, TSP: ১২০ kg/ha, কম্পোস্ট: ৮ টন/ha",
    pestControl: "ফলছিদ্র পোকার দমন, নিম স্প্রে",
    suggestions: ["গাছের গোড়া শুকনো রাখুন", "মাচা তৈরি করুন"],
    seedRate: "১.৫ kg/ha",
    yield: "১৮-২০ টন/হেক্টর",
    marketPrice: "২৫-৩০ টাকা/কেজি",
    profit: "৬০-৭০ হাজার টাকা/হেক্টর"
  }
};


  const monthlyActivities = {
  জানুয়ারী: {
    activities: [
      'গমের যত্ন',
      'আলু সংগ্রহ',
      'সরিষা পরিচর্যা',
      'রবি শস্যে সেচ ও সার প্রয়োগ',
      'বেগুন ও টমেটোর ফল সংগ্রহ শুরু'
    ],
    tips: [
      'শীতকালীন সেচ কম দিন',
      'কুয়াশা থেকে ফসল রক্ষা করুন',
      'গুদামে ফসল শুকিয়ে সংরক্ষণ করুন'
    ],
    crops: ['গম', 'আলু', 'সরিষা', 'টমেটো', 'বেগুন']
  },

  ফেব্রুয়ারী: {
    activities: [
      'গম কাটাই প্রস্তুতি',
      'আলু সংরক্ষণ ও বিক্রয়',
      'মসুর ফসল সংগ্রহ',
      'গ্রীষ্মকালীন সবজির জমি প্রস্তুত'
    ],
    tips: [
      'বসন্তকালীন ফসলের জন্য জমি চাষ করুন',
      'অতিরিক্ত সেচ এড়িয়ে চলুন'
    ],
    crops: ['গম', 'মসুর', 'আলু', 'শসা']
  },

  মার্চ: {
    activities: [
      'পাট বপন',
      'তিল ও ভুট্টা বপন',
      'বোরো ধান সংগ্রহ',
      'গ্রীষ্মকালীন সবজি যেমন শসা, করলা রোপণ'
    ],
    tips: [
      'তাপমাত্রা বাড়ার সাথে সেচ বাড়ান',
      'আগাছা নিয়ন্ত্রণ করুন',
      'জলাবদ্ধতা এড়িয়ে চলুন'
    ],
    crops: ['পাট', 'তিল', 'ভুট্টা', 'বোরো ধান', 'শসা']
  },

  এপ্রিল: {
    activities: [
      'আমন ধানের চারা প্রস্তুতি',
      'ভুট্টা ও পাট পরিচর্যা',
      'বর্ষা প্রস্তুতি',
      'খরিফ ফসলের জমি তৈরি'
    ],
    tips: [
      'বৃষ্টির পানি সংরক্ষণ করুন',
      'নিকাশী ব্যবস্থা ঠিক রাখুন'
    ],
    crops: ['ধান', 'ভুট্টা', 'পাট', 'তিল']
  },

  মে: {
    activities: [
      'আউশ ধান রোপণ',
      'ধানের জমিতে নিয়মিত সেচ',
      'কীটনাশক ও সার প্রয়োগ',
      'গ্রীষ্মকালীন শাকসবজি সংগ্রহ'
    ],
    tips: [
      'বৃষ্টি শুরু হলে সেচ কমিয়ে দিন',
      'রোগবালাই নিয়ন্ত্রণ করুন'
    ],
    crops: ['আউশ ধান', 'তিল', 'শসা', 'ভুট্টা']
  },

  জুন: {
    activities: [
      'আমন চারা উৎপাদন',
      'ফসলের যত্ন ও সার প্রয়োগ',
      'কীটপতঙ্গ নিয়ন্ত্রণ',
      'বন্যা প্রতিরোধ ব্যবস্থা'
    ],
    tips: [
      'উঁচু জমিতে চারা সংরক্ষণ করুন',
      'অতিরিক্ত বৃষ্টির পানি বের করে দিন'
    ],
    crops: ['আমন ধান', 'ডাল', 'ভুট্টা', 'তিল']
  },

  জুলাই: {
    activities: [
      'ধান পরিচর্যা ও আগাছা নিয়ন্ত্রণ',
      'নিকাশী ব্যবস্থা পর্যালোচনা',
      'জৈব সার প্রয়োগ',
      'তিল ও সয়াবিন পরিচর্যা'
    ],
    tips: [
      'অতিবৃষ্টি থেকে ফসল বাঁচান',
      'ফসলের পাতা পরীক্ষা করুন'
    ],
    crops: ['আমন ধান', 'তিল', 'সয়াবিন']
  },

  আগস্ট: {
    activities: [
      'আমন ধান পরিচর্যা',
      'তিল ও পাট সংগ্রহ',
      'সয়াবিন পরিচর্যা',
      'শরৎকালীন সবজির প্রস্তুতি'
    ],
    tips: [
      'ধান সংগ্রহ প্রস্তুতি শুরু করুন',
      'বাজারের দাম যাচাই করুন'
    ],
    crops: ['আমন ধান', 'পাট', 'তিল', 'সয়াবিন']
  },

  সেপ্টেম্বর: {
    activities: [
      'টমেটো ও মরিচের বীজতলা তৈরি',
      'রবি শস্যের জন্য জমি প্রস্তুতি',
      'মাটি পরীক্ষা ও সার প্রয়োগ পরিকল্পনা'
    ],
    tips: [
      'শীতকালীন ফসলের বীজতলা তৈরি করুন',
      'মাটি উর্বরতা পরীক্ষা করুন'
    ],
    crops: ['টমেটো', 'মরিচ', 'সরিষা', 'বেগুন']
  },

  অক্টোবর: {
    activities: [
      'গম, আলু, সরিষা বপন',
      'সার প্রয়োগ ও সেচ ব্যবস্থা',
      'শীতকালীন সবজি যেমন বাঁধাকপি, ফুলকপি রোপণ'
    ],
    tips: [
      'শীতের প্রস্তুতি নিন',
      'সেচের ব্যবস্থা রাখুন'
    ],
    crops: ['গম', 'আলু', 'সরিষা', 'বেগুন', 'টমেটো']
  },

  নভেম্বর: {
    activities: [
      'বোরো ধান বপন',
      'গম পরিচর্যা শুরু',
      'আলু ও টমেটো পরিচর্যা',
      'শীতকালীন সবজির যত্ন'
    ],
    tips: [
      'কুয়াশা থেকে চারা রক্ষা করুন',
      'হালকা সেচ দিন'
    ],
    crops: ['বোরো ধান', 'গম', 'আলু', 'টমেটো']
  },

  ডিসেম্বর: {
    activities: [
      'রবি শস্যের যত্ন',
      'গম ও আলু পরিচর্যা',
      'শীতকালীন ফসলের সেচ ব্যবস্থাপনা',
      'ফসল সংরক্ষণ ও রোগ দমন'
    ],
    tips: [
      'শীতকালীন সেচ নিয়মিত করুন',
      'ফসল সংরক্ষণের ব্যবস্থা নিন'
    ],
    crops: ['গম', 'আলু', 'সরিষা', 'টমেটো', 'বেগুন']
  }
};


  const tabs = [
    { id: 'crops', label: 'ফসল নির্দেশিকা', icon: <FaSeedling /> },
    { id: 'calendar', label: 'মাসিক কার্যক্রম', icon: <FaCalendarAlt /> },
    { id: 'tools', label: 'কৃষি সরঞ্জাম', icon: <FaTools /> }
  ];

  const getCropIcon = (crop) => {
    const icons = {
      'ধান': '🌾',
      'গম': '🌾',
      'পাট': '🌿',
      'আলু': '🥔',
      'টমেটো': '🍅',
      'সরিষা': '🟡',
      'ভুট্টা': '🌽',
      'মসুর': '🟤',
      'মরিচ': '🌶️',
      'তিল': '⚫',
      'সয়াবিন': '🟢',
      'বেগুন': '🍆',
      'শসা': '🥒'
    };
    return icons[crop] || '🌱';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Emergency Alert */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-amber-500 rounded-lg p-4 mb-6 shadow-md">
            <div className="flex items-center justify-center gap-3">
              <FaExclamationTriangle className="text-amber-600 text-xl" />
              <p className="text-amber-800 font-bold font-bangla text-lg">
                🚨 জরুরি: বর্তমান আবহাওয়া পরিস্থিতি - সময়মতো বৃষ্টির সম্ভাবনা, ফসল রক্ষার প্রস্তুতি নিন
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <FaLeaf className="text-green-600 text-3xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 font-bangla">
              কৃষি ক্যালেন্ডার
            </h1>
          </div>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-bangla mb-2">
            স্মার্ট কৃষকের জন্য সম্পূর্ণ নির্দেশিকা
          </p>
          {/* <div className="flex justify-center gap-4 text-sm text-gray-600 font-bangla">
            <span className="flex items-center gap-1"><FaSeedling className="text-green-500" /> ফসল ব্যবস্থাপনা</span>
            <span className="flex items-center gap-1"><FaWater className="text-blue-500" /> সেচ পরামর্শ</span>
            <span className="flex items-center gap-1"><FaChartLine className="text-amber-500" /> বাজার দাম</span>
          </div> */}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 font-bangla shadow-sm ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-green-700 hover:bg-green-50 border border-green-200 hover:shadow-md'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Crops Tab */}
        {activeTab === 'crops' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-6 text-center font-bangla flex items-center justify-center gap-3">
                <FaSeedling className="text-green-600" />
                ফসল নির্বাচন করুন
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Object.keys(cropData).map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCrop(crop)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 font-bangla group hover:shadow-md ${
                      selectedCrop === crop
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-sm transform scale-105'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform">
                      {getCropIcon(crop)}
                    </div>
                    <div className="font-semibold">{crop}</div>
                  </button>
                ))}
              </div>
            </div>

            {selectedCrop && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl bg-green-100 p-3 rounded-full">
                    {getCropIcon(selectedCrop)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-800 font-bangla">
                      {selectedCrop} চাষের সম্পূর্ণ নির্দেশিকা
                    </h3>
                    <p className="text-gray-600 font-bangla">বিস্তারিত তথ্য ও পরামর্শ</p>
                  </div>
                </div>

                {selectedCrop === 'ধান' ? (
                  <div className="grid lg:grid-cols-2 gap-6">
                    {Object.keys(cropData[selectedCrop]).map((variety) => (
                      <div key={variety} className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl p-6 border border-green-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-green-600 text-white p-2 rounded-lg">
                            <FaLeaf />
                          </div>
                          <h4 className="text-xl font-bold text-green-700 font-bangla">
                            {variety} ধান
                          </h4>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-3 shadow-sm border border-green-100">
                              <div className="flex items-center gap-2 mb-2">
                                <FaCalendarAlt className="text-green-600" />
                                <p className="text-sm text-gray-600 font-bangla">বপন সময়</p>
                              </div>
                              <p className="font-semibold text-green-800 font-bangla">{cropData[selectedCrop][variety].planting}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 shadow-sm border border-green-100">
                              <div className="flex items-center gap-2 mb-2">
                                <FaTractor className="text-amber-600" />
                                <p className="text-sm text-gray-600 font-bangla">সংগ্রহ সময়</p>
                              </div>
                              <p className="font-semibold text-green-800 font-bangla">{cropData[selectedCrop][variety].harvesting}</p>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-4 shadow-sm border border-amber-200">
                            <div className="flex items-center gap-2 mb-2">
                              <FaDollarSign className="text-green-600" />
                              <p className="text-sm text-gray-600 font-bangla">💰 আনুমানিক লাভ</p>
                            </div>
                            <p className="text-green-800 font-bangla font-semibold">{cropData[selectedCrop][variety].profit}</p>
                          </div>

                          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                              <FaWater className="text-blue-600" />
                              <p className="text-sm text-gray-600 font-bangla">💧 সেচ পদ্ধতি</p>
                            </div>
                            <p className="text-green-800 font-bangla">{cropData[selectedCrop][variety].irrigation}</p>
                          </div>

                          <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
                            <div className="flex items-center gap-2 mb-2">
                              <FaLeaf className="text-purple-600" />
                              <p className="text-sm text-gray-600 font-bangla">🧪 সার ব্যবস্থাপনা</p>
                            </div>
                            <p className="text-green-800 text-sm font-bangla">{cropData[selectedCrop][variety].fertilizer}</p>
                          </div>

                          <div className="bg-white rounded-lg p-4 shadow-sm border border-red-200">
                            <div className="flex items-center gap-2 mb-2">
                              <FaExclamationTriangle className="text-red-600" />
                              <p className="text-sm text-gray-600 font-bangla">🐛 রোগবালাই নিয়ন্ত্রণ</p>
                            </div>
                            <p className="text-green-800 text-sm font-bangla">{cropData[selectedCrop][variety].pestControl}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 shadow-sm border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <FaCalendarAlt className="text-green-600" />
                            <p className="text-sm text-gray-600 font-bangla">বপন সময়</p>
                          </div>
                          <p className="font-semibold text-lg text-green-800 font-bangla">{cropData[selectedCrop].planting}</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 shadow-sm border border-amber-200">
                          <div className="flex items-center gap-2 mb-2">
                            <FaTractor className="text-amber-600" />
                            <p className="text-sm text-gray-600 font-bangla">সংগ্রহ সময়</p>
                          </div>
                          <p className="font-semibold text-lg text-green-800 font-bangla">{cropData[selectedCrop].harvesting}</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-4 shadow-sm border border-green-300">
                        <div className="flex items-center gap-2 mb-2">
                          <FaDollarSign className="text-green-700" />
                          <p className="text-sm text-gray-700 font-bangla font-semibold">💰 আনুমানিক লাভ</p>
                        </div>
                        <p className="text-green-900 text-lg font-bangla font-bold">{cropData[selectedCrop].profit}</p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 shadow-sm border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <FaWater className="text-blue-600" />
                          <p className="text-sm text-gray-600 font-bangla">💧 সেচ পদ্ধতি</p>
                        </div>
                        <p className="text-green-800 text-lg font-bangla">{cropData[selectedCrop].irrigation}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-200">
                        <div className="flex items-center gap-2 mb-3">
                          <FaLeaf className="text-purple-600" />
                          <h5 className="font-bold text-purple-700 font-bangla">🧪 সার ব্যবস্থাপনা</h5>
                        </div>
                        <p className="text-purple-800 text-sm font-bangla leading-relaxed">{cropData[selectedCrop].fertilizer}</p>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-5 border border-red-200">
                        <div className="flex items-center gap-2 mb-3">
                          <FaExclamationTriangle className="text-red-600" />
                          <h5 className="font-bold text-red-700 font-bangla">🐛 রোগবালাই নিয়ন্ত্রণ</h5>
                        </div>
                        <p className="text-red-800 text-sm font-bangla leading-relaxed">{cropData[selectedCrop].pestControl}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <div className="flex items-center justify-center gap-3 mb-6">
                <FaCalendarAlt className="text-green-600 text-2xl" />
                <h2 className="text-2xl font-bold text-green-800 font-bangla">
                  মাসভিত্তিক কৃষি কার্যক্রম - {selectedMonth || 'মাস নির্বাচন করুন'}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                {Object.keys(monthlyActivities).map((month) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`p-3 rounded-lg border-2 transition-all font-bangla flex flex-col items-center gap-1 ${
                      selectedMonth === month
                        ? 'border-green-500 bg-green-100 text-green-800 font-bold shadow-md'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <span>{month}</span>
                    <div className="flex gap-1">
                      <WiDaySunny className="text-amber-500 text-xl" />
                      <WiRain className="text-blue-500 text-xl" />
                    </div>
                  </button>
                ))}
              </div>

              {selectedMonth && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <FaTractor className="text-green-600" />
                      <h4 className="font-bold text-green-700 font-bangla">📝 এই মাসের কাজ</h4>
                    </div>
                    <ul className="space-y-3">
                      {monthlyActivities[selectedMonth].activities.map((activity, index) => (
                        <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                          <span className="text-green-500 mr-2 mt-1 flex-shrink-0">•</span>
                          <span className="text-green-800 font-bangla text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
                    <div className="flex items-center gap-2 mb-3">
                      <FaInfoCircle className="text-amber-600" />
                      <h4 className="font-bold text-amber-700 font-bangla">💡 বিশেষ পরামর্শ</h4>
                    </div>
                    <ul className="space-y-3">
                      {monthlyActivities[selectedMonth].tips.map((tip, index) => (
                        <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                          <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                          <span className="text-amber-800 font-bangla text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <FaSeedling className="text-blue-600" />
                      <h4 className="font-bold text-blue-700 font-bangla">🌾 চাষযোগ্য ফসল</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {monthlyActivities[selectedMonth].crops.map((crop, index) => (
                        <span 
                          key={index} 
                          className="bg-white px-3 py-2 rounded-full text-blue-800 text-sm font-bangla border border-blue-200 shadow-sm flex items-center gap-2"
                        >
                          <span className="text-lg">{getCropIcon(crop)}</span>
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <div className="flex items-center justify-center gap-3 mb-6">
                <FaTools className="text-green-600 text-2xl" />
                <h2 className="text-2xl font-bold text-green-800 font-bangla">
                  কৃষি সরঞ্জাম ও ক্যালকুলেটর
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-600 text-white p-2 rounded-lg">
                      <FaLeaf />
                    </div>
                    <h4 className="font-bold text-green-700 font-bangla">🧮 সার ক্যালকুলেটর</h4>
                  </div>
                  <p className="text-green-800 mb-4 font-bangla text-sm">আপনার জমির পরিমাণ অনুযায়ী সারের পরিমাণ নির্ণয় করুন</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bangla hover:bg-green-700 transition-colors flex items-center gap-2 w-full justify-center">
                    <FaLeaf />
                    ক্যালকুলেটর ব্যবহার করুন
                  </button>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-600 text-white p-2 rounded-lg">
                      <FaWater />
                    </div>
                    <h4 className="font-bold text-blue-700 font-bangla">💧 সেচ ক্যালকুলেটর</h4>
                  </div>
                  <p className="text-blue-800 mb-4 font-bangla text-sm">ফসল ও জমি অনুযায়ী সেচের পরিমাণ নির্ণয় করুন</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bangla hover:bg-blue-700 transition-colors flex items-center gap-2 w-full justify-center">
                    <FaWater />
                    ক্যালকুলেটর ব্যবহার করুন
                  </button>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-amber-600 text-white p-2 rounded-lg">
                      <FaDollarSign />
                    </div>
                    <h4 className="font-bold text-amber-700 font-bangla">💰 লাভ ক্যালকুলেটর</h4>
                  </div>
                  <p className="text-amber-800 mb-4 font-bangla text-sm">ফসল বিক্রি করে কত লাভ হবে তা নির্ণয় করুন</p>
                  <button className="bg-amber-600 text-white px-4 py-2 rounded-lg font-bangla hover:bg-amber-700 transition-colors flex items-center gap-2 w-full justify-center">
                    <FaDollarSign />
                    ক্যালকুলেটর ব্যবহার করুন
                  </button>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-purple-600 text-white p-2 rounded-lg">
                      <FaCloudSun />
                    </div>
                    <h4 className="font-bold text-purple-700 font-bangla">🌦️ আবহাওয়া পূর্বাভাস</h4>
                  </div>
                  <p className="text-purple-800 mb-4 font-bangla text-sm">আপনার এলাকার ৭ দিনের আবহাওয়া পূর্বাভাস</p>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bangla hover:bg-purple-700 transition-colors flex items-center gap-2 w-full justify-center">
                    <FaCloudSun />
                    পূর্বাভাস দেখুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contact */}
        <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-600 text-white p-2 rounded-full">
              <FaPhoneAlt />
            </div>
            <h4 className="font-bold text-red-700 font-bangla text-lg">🚨 জরুরি যোগাযোগ</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-red-800 font-bangla">
            <div className="bg-white p-3 rounded-lg border border-red-200">
              <p className="font-semibold flex items-center gap-2">
                <FaPhoneAlt className="text-red-600" />
                কৃষি পরামর্শ কেন্দ্র: ১৬১২৩
              </p>
              <p className="text-sm text-red-600 mt-1">২৪ ঘন্টা কৃষি পরামর্শ সেবা</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-red-200">
              <p className="font-semibold flex items-center gap-2">
                <FaExclamationTriangle className="text-red-600" />
                কৃষি বিপর্যয় সহায়তা: ১০৯০
              </p>
              <p className="text-sm text-red-600 mt-1">বন্যা, খরা বা প্রাকৃতিক দুর্যোগে সাহায্য</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default KrishiCalendar;