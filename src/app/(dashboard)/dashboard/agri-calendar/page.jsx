"use client"
import { useState } from "react";


const KrishiCalendar = () => {
    const [selectedCrop, setSelectedCrop] = useState('');
  const [activeTab, setActiveTab] = useState('crops');
  const [selectedMonth, setSelectedMonth] = useState('');

  const cropData = {
    ধান: {
      বোরো: {
        planting: 'নভেম্বর - ডিসেম্বর',
        irrigation: 'সপ্তাহে ২-৩ বার, মাটি আর্দ্র রাখুন',
        harvesting: 'মার্চ - এপ্রিল',
        suggestions: ['উচ্চ ফলনশীল জাত ব্যবহার করুন', 'সময়মতো সার প্রয়োগ করুন', 'জৈব সারের ব্যবহার বৃদ্ধি করুন'],
        water: 'মাঝারি',
        duration: '৪-৫ মাস',
        fertilizer: 'ইউরিয়া: ২৫০-৩০০ kg/ha, TSP: ১৮০-২০০ kg/ha',
        pestControl: 'নিম তেল স্প্রে করুন, সমন্বিত বালাই ব্যবস্থাপনা',
        profit: 'প্রতি হেক্টরে ৪-৫ টন, লাভ: ৪০-৫০ হাজার টাকা'
      },
      আমন: {
        planting: 'জুলাই - আগস্ট',
        irrigation: 'বৃষ্টির পানির উপর নির্ভরশীল, প্রয়োজন时 সেচ দিন',
        harvesting: 'নভেম্বর - ডিসেম্বর',
        suggestions: ['বন্যামুক্ত জমি নির্বাচন করুন', 'জৈব সার ব্যবহার করুন', 'নিকাশী ব্যবস্থা ভালো রাখুন'],
        water: 'অধিক',
        duration: '৫-৬ মাস',
        fertilizer: 'ইউরিয়া: ২০০-২৫০ kg/ha, MOP: ১০০-১২০ kg/ha',
        pestControl: 'জৈব কীটনাশক, লাইট ট্রাপ ব্যবহার',
        profit: 'প্রতি হেক্টরে ৩-৪ টন, লাভ: ৩০-৪০ হাজার টাকা'
      }
    },
    গম: {
      planting: 'নভেম্বর - ডিসেম্বর',
      irrigation: '১৫-২০ দিন পর পর সেচ দিন',
      harvesting: 'মার্চ - এপ্রিল',
      suggestions: ['সময়মতো বপন করুন', 'ফসল কাটার পর শুকিয়ে নিন', 'সময়মতো আগাছা নিয়ন্ত্রণ করুন'],
      water: 'সল্প',
      duration: '৪-৫ মাস',
      fertilizer: 'ইউরিয়া: ২৫০ kg/ha, TSP: ১৮০ kg/ha',
      pestControl: 'সময়মতো আগাছা নিয়ন্ত্রণ, রোগ প্রতিরোধী জাত',
      profit: 'প্রতি হেক্টরে ৩-৩.৫ টন, লাভ: ৫০-৬০ হাজার টাকা'
    },
    পাট: {
      planting: 'মার্চ - এপ্রিল',
      irrigation: 'অল্প কিন্তু নিয়মিত সেচ দিন',
      harvesting: 'জুলাই - আগস্ট',
      suggestions: ['নিকাশী ব্যবস্থা ভালো রাখুন', 'গুণগত মানের বীজ ব্যবহার করুন', 'সঠিক সময়ে কাটাই করুন'],
      water: 'মাঝারি',
      duration: '৪ মাস',
      fertilizer: 'ইউরিয়া: ১৫০ kg/ha, TSP: ১০০ kg/ha',
      pestControl: 'নিয়মিত আগাছা পরিষ্কার, জৈব বালাইনাশক',
      profit: 'প্রতি হেক্টরে ২.৫-৩ টন, লাভ: ৪০-৫০ হাজার টাকা'
    },
    আলু: {
      planting: 'অক্টোবর - নভেম্বর',
      irrigation: '১০-১২ দিন পর পর সেচ দিন',
      harvesting: 'জানুয়ারী - ফেব্রুয়ারী',
      suggestions: ['উর্বর জমি নির্বাচন করুন', 'নিয়মিত কীটনাশক ব্যবহার করুন', 'সঠিক মাত্রায় সার প্রয়োগ করুন'],
      water: 'মাঝারি',
      duration: '৩-৪ মাস',
      fertilizer: 'ইউরিয়া: ৩০০ kg/ha, TSP: ২৫০ kg/ha, MOP: ২০০ kg/ha',
      pestControl: 'ব্লাইট রোগ নিয়ন্ত্রণ, সঠিক বীজ নির্বাচন',
      profit: 'প্রতি হেক্টরে ২০-২৫ টন, লাভ: ৮০-১০০ হাজার টাকা'
    },
    টমেটো: {
      planting: 'সেপ্টেম্বর - অক্টোবর',
      irrigation: 'সপ্তাহে ২ বার, গাছের গোড়ায় পানি দিন',
      harvesting: 'ডিসেম্বর - ফেব্রুয়ারী',
      suggestions: ['খুঁটি দিয়ে গাছ সোজা রাখুন', 'পর্যাপ্ত সূর্যালোক নিশ্চিত করুন', 'নিয়মিত স্প্রে করুন'],
      water: 'সল্প',
      duration: '৪-৫ মাস',
      fertilizer: 'ইউরিয়া: ২০০ kg/ha, TSP: ১৫০ kg/ha, কম্পোস্ট: ১০ টন/ha',
      pestControl: 'নিম বেসড স্প্রে, ফেরোমন ট্রাপ',
      profit: 'প্রতি হেক্টরে ৩০-৪০ টন, লাভ: ১-১.৫ লাখ টাকা'
    }
  };

  const monthlyActivities = {
    জানুয়ারী: {
      activities: ['গমের যত্ন', 'আলু সংগ্রহ', 'রবি শস্যের সেচ', 'সরিষা পরিচর্যা'],
      tips: ['শীতকালীন সেচ কম দিন', 'কুয়াশা থেকে ফসল রক্ষা করুন'],
      crops: ['আলু', 'গম', 'সরিষা']
    },
    ফেব্রুয়ারী: {
      activities: ['গ্রীষ্মকালীন ফসলের প্রস্তুতি', 'মাটির preparation', 'গম কাটাই প্রস্তুতি'],
      tips: ['বসন্ত কালীন ফসলের প্রস্তুতি নিন', 'জমি চাষ করুন'],
      crops: ['গম', 'মসুর']
    },
    মার্চ: {
      activities: ['পাট বপন', 'গ্রীষ্মকালীন শাকসবজি', 'বোরো ধান সংগ্রহ'],
      tips: ['তাপমাত্রা বাড়ার সাথে সেচ বাড়ান', 'আগাছা নিয়ন্ত্রণ করুন'],
      crops: ['পাট', 'চীনাবাদাম']
    },
    এপ্রিল: {
      activities: ['আমন ধানের চারা', 'বর্ষা প্রস্তুতি', 'খরিফ শস্য বপন'],
      tips: ['বৃষ্টির পানির সংরক্ষণ করুন', 'নিকাশী ব্যবস্থা চেক করুন'],
      crops: ['ধান', 'ভুট্টা']
    },
    মে: {
      activities: ['ধান রোপণ', 'নিয়মিত সেচ', 'কীটনাশক প্রয়োগ'],
      tips: ['বৃষ্টি শুরু হলে সেচ কমিয়ে দিন', 'রোগবালাই নিয়ন্ত্রণ'],
      crops: ['ধান', 'আখ']
    },
    জুন: {
      activities: ['ফসলের যত্ন', 'কীটপতঙ্গ নিয়ন্ত্রণ', 'সার প্রয়োগ'],
      tips: ['বন্যার প্রস্তুতি নিন', 'উঁচু জমিতে ফসল রাখুন'],
      crops: ['ধান', 'ডাল']
    },
    জুলাই: {
      activities: ['ধান পরিচর্যা', 'নিকাশী ব্যবস্থা', 'আগাছা নিয়ন্ত্রণ'],
      tips: ['অতিবৃষ্টি থেকে ফসল বাঁচান', 'জৈব সার প্রয়োগ করুন'],
      crops: ['ধান', 'তিল']
    },
    আগস্ট: {
      activities: ['শরৎকালীন ফসল প্রস্তুতি', 'ধান সংগ্রহ প্রস্তুতি', 'মাঠ পরিদর্শন'],
      tips: ['ফসল সংগ্রহ প্রস্তুতি শুরু করুন', 'বাজারের দাম চেক করুন'],
      crops: ['ধান', 'সয়াবিন']
    },
    সেপ্টেম্বর: {
      activities: ['টমেটো, মরিচ বপন', 'রবি শস্য প্রস্তুতি', 'জমি চাষ'],
      tips: ['শীতকালীন ফসলের বীজতলা তৈরি করুন', 'মাটি পরীক্ষা করুন'],
      crops: ['টমেটো', 'মরিচ']
    },
    অক্টোবর: {
      activities: ['গম, আলু বপন', 'সার প্রয়োগ', 'সেচ ব্যবস্থা'],
      tips: ['শীতের প্রস্তুতি নিন', 'সেচের ব্যবস্থা রাখুন'],
      crops: ['গম', 'আলু']
    },
    নভেম্বর: {
      activities: ['বোরো ধান বপন', 'শীতকালীন ফসল', 'গম পরিচর্যা'],
      tips: ['কুয়াশা থেকে幼苗 রক্ষা করুন', 'হালকা সেচ দিন'],
      crops: ['বোরো ধান', 'গম']
    },
    ডিসেম্বর: {
      activities: ['রবি শস্যের যত্ন', 'সেচ ব্যবস্থাপনা', 'ফসল সংরক্ষণ'],
      tips: ['শীতকালীন সেচ ব্যবস্থাপনা', 'ফসল সংরক্ষণের ব্যবস্থা নিন'],
      crops: ['গম', 'আলু']
    }
  };

  const marketPrices = {
    ধান: '১,২০০-১,৫০০ টাকা/মণ',
    গম: '১,০০০-১,২০০ টাকা/মণ',
    আলু: '৪০০-৬০০ টাকা/মণ',
    টমেটো: '৮০০-১,২০০ টাকা/মণ',
    পাট: '২,৫০০-৩,০০০ টাকা/মণ'
  };
    return (
         <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Emergency Alert */}
        <div className="text-center mb-8">
          <div className="bg-amber-100 border border-amber-400 rounded-lg p-4 mb-6">
            <p className="text-amber-800 font-bold font-bangla">
              🚨 জরুরি: বর্তমান আবহাওয়া পরিস্থিতি - সময়মতো বৃষ্টির সম্ভাবনা, ফসল রক্ষার প্রস্তুতি নিন
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 font-bangla">
            কৃষি ক্যালেন্ডার
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-bangla">
            স্মার্ট কৃষকের জন্য সম্পূর্ণ নির্দেশিকা - ফসল, সেচ, সার এবং বাজার দাম
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200">
            <p className="text-sm text-gray-600 font-bangla">বর্তমান মৌসুম</p>
            <p className="font-bold text-green-700 text-lg font-bangla">রবি মৌসুম</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-200">
            <p className="text-sm text-gray-600 font-bangla">বাজারে চাহিদা</p>
            <p className="font-bold text-amber-700 text-lg font-bangla">আলু, টমেটো</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200">
            <p className="text-sm text-gray-600 font-bangla">আবহাওয়া</p>
            <p className="font-bold text-green-700 text-lg font-bangla">শীতকাল</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-red-200">
            <p className="text-sm text-gray-600 font-bangla">সতর্কতা</p>
            <p className="font-bold text-red-700 text-lg font-bangla">কুয়াশা</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { id: 'crops', label: 'ফসল নির্দেশিকা' },
            { id: 'calendar', label: 'মাসিক কার্যক্রম' },
            { id: 'market', label: 'বাজার দাম' },
            { id: 'tools', label: 'কৃষি সরঞ্জাম' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 font-bangla ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-sm transform scale-105'
                  : 'bg-white text-green-700 hover:bg-green-50 border border-green-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Crops Tab */}
        {activeTab === 'crops' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-6 text-center font-bangla">
                ফসল নির্বাচন করুনxx
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Object.keys(cropData).map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCrop(crop)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 font-bangla ${
                      selectedCrop === crop
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-sm transform scale-105'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      {crop === 'ধান' && '🌾'}
                      {crop === 'গম' && '🌾'}
                      {crop === 'পাট' && '🌿'}
                      {crop === 'আলু' && '🥔'}
                      {crop === 'টমেটো' && '🍅'}
                    </div>
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {selectedCrop && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl">
                    {selectedCrop === 'ধান' && '🌾'}
                    {selectedCrop === 'গম' && '🌾'}
                    {selectedCrop === 'পাট' && '🌿'}
                    {selectedCrop === 'আলু' && '🥔'}
                    {selectedCrop === 'টমেটো' && '🍅'}
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 font-bangla">
                    {selectedCrop} চাষের সম্পূর্ণ নির্দেশিকা
                  </h3>
                </div>

                {selectedCrop === 'ধান' ? (
                  <div className="grid lg:grid-cols-2 gap-6">
                    {Object.keys(cropData[selectedCrop]).map((variety) => (
                      <div key={variety} className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl p-6 border border-green-200">
                        <h4 className="text-xl font-bold text-green-700 mb-4 font-bangla">
                          {variety} ধান 
                        </h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-3 shadow-sm">
                              <p className="text-sm text-gray-600 font-bangla">বপন সময়</p>
                              <p className="font-semibold text-green-800 font-bangla">{cropData[selectedCrop][variety].planting}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 shadow-sm">
                              <p className="text-sm text-gray-600 font-bangla">সংগ্রহ সময়</p>
                              <p className="font-semibold text-green-800 font-bangla">{cropData[selectedCrop][variety].harvesting}</p>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-600 mb-2 font-bangla">💰 আনুমানিক লাভ</p>
                            <p className="text-green-800 font-bangla">{cropData[selectedCrop][variety].profit}</p>
                          </div>

                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-600 mb-2 font-bangla">💧 সেচ পদ্ধতি</p>
                            <p className="text-green-800 font-bangla">{cropData[selectedCrop][variety].irrigation}</p>
                          </div>

                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-600 mb-2 font-bangla">🧪 সার ব্যবস্থাপনা</p>
                            <p className="text-green-800 text-sm font-bangla">{cropData[selectedCrop][variety].fertilizer}</p>
                          </div>

                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-600 mb-2 font-bangla">🐛 রোগবালাই নিয়ন্ত্রণ</p>
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
                        <div className="bg-green-50 rounded-lg p-4 shadow-sm">
                          <p className="text-sm text-gray-600 font-bangla">বপন সময়</p>
                          <p className="font-semibold text-lg text-green-800 font-bangla">{cropData[selectedCrop].planting}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 shadow-sm">
                          <p className="text-sm text-gray-600 font-bangla">সংগ্রহ সময়</p>
                          <p className="font-semibold text-lg text-green-800 font-bangla">{cropData[selectedCrop].harvesting}</p>
                        </div>
                      </div>

                      <div className="bg-amber-50 rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2 font-bangla">💰 আনুমানিক লাভ</p>
                        <p className="text-green-800 text-lg font-bangla">{cropData[selectedCrop].profit}</p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2 font-bangla">💧 সেচ পদ্ধতি</p>
                        <p className="text-green-800 text-lg font-bangla">{cropData[selectedCrop].irrigation}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-5 border border-green-200">
                        <h5 className="font-bold text-green-700 mb-3 font-bangla">🧪 সার ব্যবস্থাপনা</h5>
                        <p className="text-green-800 text-sm font-bangla">{cropData[selectedCrop].fertilizer}</p>
                      </div>

                      <div className="bg-white rounded-xl p-5 border border-amber-200">
                        <h5 className="font-bold text-amber-700 mb-3 font-bangla">🐛 রোগবালাই নিয়ন্ত্রণ</h5>
                        <p className="text-amber-800 text-sm font-bangla">{cropData[selectedCrop].pestControl}</p>
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
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-6 text-center font-bangla">
                মাসভিত্তিক কৃষি কার্যক্রম - {selectedMonth || 'মাস নির্বাচন করুন'}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                {Object.keys(monthlyActivities).map((month) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`p-3 rounded-lg border-2 transition-all font-bangla ${
                      selectedMonth === month
                        ? 'border-green-500 bg-green-100 text-green-800 font-bold'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>

              {selectedMonth && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-xl p-5">
                    <h4 className="font-bold text-green-700 mb-3 font-bangla">📝 এই মাসের কাজ</h4>
                    <ul className="space-y-2">
                      {monthlyActivities[selectedMonth].activities.map((activity, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">•</span>
                          <span className="text-green-800 font-bangla">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-5">
                    <h4 className="font-bold text-amber-700 mb-3 font-bangla">💡 বিশেষ পরামর্শ</h4>
                    <ul className="space-y-2">
                      {monthlyActivities[selectedMonth].tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-amber-500 mr-2 mt-1">•</span>
                          <span className="text-amber-800 font-bangla">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-5">
                    <h4 className="font-bold text-blue-700 mb-3 font-bangla">🌾 চাষযোগ্য ফসল</h4>
                    <div className="flex flex-wrap gap-2">
                      {monthlyActivities[selectedMonth].crops.map((crop, index) => (
                        <span key={index} className="bg-white px-3 py-1 rounded-full text-green-800 text-sm font-bangla border border-blue-200">
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

        {/* Market Prices Tab */}
        {activeTab === 'market' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-6 text-center font-bangla">
                সর্বশেষ বাজার দাম
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(marketPrices).map(([crop, price]) => (
                  <div key={crop} className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl p-5 border border-green-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-green-800 text-lg font-bangla">{crop}</h4>
                      <span className="text-2xl">
                        {crop === 'ধান' && '🌾'}
                        {crop === 'গম' && '🌾'}
                        {crop === 'আলু' && '🥔'}
                        {crop === 'টমেটো' && '🍅'}
                        {crop === 'পাট' && '🌿'}
                      </span>
                    </div>
                    <p className="text-amber-700 font-bold text-xl mt-2 font-bangla">{price}</p>
                    <p className="text-green-600 text-sm mt-1 font-bangla">বর্তমান বাজার মূল্য</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-amber-50 rounded-xl p-5 border border-amber-200">
                <h4 className="font-bold text-amber-800 mb-3 font-bangla">💡 বাজার সংক্রান্ত পরামর্শ</h4>
                <ul className="space-y-2 text-amber-800 font-bangla">
                  <li>• বর্তমানে আলু ও টমেটোর বাজার দাম ভালো</li>
                  <li>• ধানের দাম স্থিতিশীল, বিক্রির ভালো সময়</li>
                  <li>• পাটের চাহিদা বাড়ছে, দাম বৃদ্ধির সম্ভাবনা</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-6 text-center font-bangla">
                কৃষি সরঞ্জাম ও ক্যালকুলেটর
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-5">
                  <h4 className="font-bold text-green-700 mb-3 font-bangla">🧮 সার ক্যালকুলেটর</h4>
                  <p className="text-green-800 mb-4 font-bangla">আপনার জমির পরিমাণ অনুযায়ী সারের পরিমাণ নির্ণয় করুন</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bangla hover:bg-green-700">
                    ক্যালকুলেটর ব্যবহার করুন
                  </button>
                </div>

                <div className="bg-blue-50 rounded-xl p-5">
                  <h4 className="font-bold text-green-700 mb-3 font-bangla">💧 সেচ ক্যালকুলেটর</h4>
                  <p className="text-green-800 mb-4 font-bangla">ফসল ও জমি অনুযায়ী সেচের পরিমাণ নির্ণয় করুন</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bangla hover:bg-blue-700">
                    ক্যালকুলেটর ব্যবহার করুন
                  </button>
                </div>

                <div className="bg-amber-50 rounded-xl p-5">
                  <h4 className="font-bold text-amber-700 mb-3 font-bangla">💰 লাভ ক্যালকুলেটর</h4>
                  <p className="text-amber-800 mb-4 font-bangla">ফসল বিক্রি করে কত লাভ হবে তা নির্ণয় করুন</p>
                  <button className="bg-amber-600 text-white px-4 py-2 rounded-lg font-bangla hover:bg-amber-700">
                    ক্যালকুলেটর ব্যবহার করুন
                  </button>
                </div>

                <div className="bg-purple-50 rounded-xl p-5">
                  <h4 className="font-bold text-green-700 mb-3 font-bangla">🌦️ আবহাওয়া পূর্বাভাস</h4>
                  <p className="text-green-800 mb-4 font-bangla">আপনার এলাকার ৭ দিনের আবহাওয়া পূর্বাভাস</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bangla hover:bg-green-700">
                    পূর্বাভাস দেখুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contact */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-5">
          <h4 className="font-bold text-red-700 mb-3 font-bangla">🚨 জরুরি যোগাযোগ</h4>
          <div className="grid md:grid-cols-2 gap-4 text-red-800 font-bangla">
            <div>
              <p className="font-semibold">কৃষি পরামর্শ কেন্দ্র: ১৬১২৩</p>
              <p className="text-sm">২৪ ঘন্টা কৃষি পরামর্শ সেবা</p>
            </div>
            <div>
              <p className="font-semibold">কৃষি বিপর্যয় সহায়তা: ১০৯০</p>
              <p className="text-sm">বন্যা, খরা বা প্রাকৃতিক দুর্যোগে সাহায্য</p>
            </div>
          </div>
        </div>

      </div>
    </div>
    );
};

export default KrishiCalendar;