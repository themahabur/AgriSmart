import { useState, useEffect } from "react";
import { 
  FaCalendarAlt, 
  FaSeedling, 
  FaTractor, 
  FaExclamationTriangle,
  FaWater,
  FaDollarSign,
  FaPhoneAlt,
  FaLeaf,
  FaInfoCircle,
  FaSun,
  FaTint,
  FaWind,
  FaTemperatureHigh,
  FaUser,
  FaMapMarkerAlt,
  FaClock,
  FaTasks,
  FaCheckCircle,
  FaArrowRight,
  FaRegCalendarCheck,
  FaShieldAlt,
  FaBug,
  FaRobot,
  FaSpinner
} from "react-icons/fa";

// Reusable Farm Card Component
const FarmCard = ({ farm, cropData, getCropIcon }) => {
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);

  const cropGuidance = farm.cropDetails?.type ? getCropGuidance(farm, cropData) : null;

  function getCropGuidance(farm, cropData) {
    if (!farm.cropDetails?.type) return null;
    
    const cropType = farm.cropDetails.type;
    const variety = farm.cropDetails.variety;
    
    if (cropData[cropType]) {
      if (cropType === 'ধান' && cropData[cropType][variety]) {
        return cropData[cropType][variety];
      }
      return cropData[cropType];
    }
    return null;
  }

  // Fetch AI suggestions based on farm crop details
  const fetchAiSuggestions = async () => {
    if (!farm.cropDetails?.type) return;
    
    setLoadingAi(true);
    try {
      const today = new Date();
      const plantingDate = new Date(farm.cropDetails.plantingDate);
      const daysSincePlanting = Math.floor((today - plantingDate) / (1000 * 60 * 60 * 24));
      
      // Calculate crop stage based on days since planting
      let cropStage = "";
      if (daysSincePlanting <= 7) cropStage = "শুরুর阶段 (বীজ অঙ্কুরোদগম)";
      else if (daysSincePlanting <= 30) cropStage = "বৃদ্ধি阶段 (চারা বৃদ্ধি)";
      else if (daysSincePlanting <= 60) cropStage = "মধ্য阶段 (কাণ্ড ও পাতা বৃদ্ধি)";
      else if (daysSincePlanting <= 90) cropStage = "ফলন阶段 (মঞ্জরি ও শীষ গঠন)";
      else cropStage = "পরিপক্ব阶段 (ফসল সংগ্রহ প্রস্তুতি)";

      const question = `
        আমি একজন কৃষক। আমার ফসলের বিস্তারিত তথ্য:
        
        🌾 ফসলের ধরন: ${farm.cropDetails.type}
        🎯 জাত: ${farm.cropDetails.variety || 'সাধারণ'}
        📅 বপনের তারিখ: ${plantingDate.toLocaleDateString('bn-BD')}
        ⏰ বপন থেকে দিন পার: ${daysSincePlanting} দিন
        📈 ফসলের বর্তমান stage: ${cropStage}
        🗺️ অবস্থান: ${farm.location}
        📏 জমির আয়তন: ${farm.sizeAcre} একর
        🌱 অবস্থা: ${farm.status}
        🏆 জৈব চাষ: ${farm.organicPractices ? 'হ্যাঁ' : 'না'}
        
        আজকের তারিখ: ${today.toLocaleDateString('bn-BD')}
        
        দয়া করে আমাকে বলুন:
        ১. আজ আমার কি কি কাজ করা উচিত?
        ২. সেচ ও সারের সময়সূচী কি?
        ৩. রোগ-পোকা থেকে রক্ষার উপায় কি?
        ৪. বিশেষ কোন সতর্কতা আছে কি?
        
        অনুগ্রহ করে সংক্ষিপ্ত, ব্যবহারযোগ্য এবং বাংলায় পরামর্শ দিন। আজকের তারিখের উপর ভিত্তি করে সঠিক পরামর্শ দিন।
      `;

      const response = await fetch('/api/ai-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiSuggestions(data.answer);
      } else {
        setAiSuggestions("দুঃখিত, AI পরামর্শ এখন লোড করা যাচ্ছে না। পরে আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error('AI suggestion error:', error);
      setAiSuggestions("দুঃখিত, ইন্টারনেট সংযোগ সমস্যার কারণে পরামর্শ লোড করতে পারছি না।");
    } finally {
      setLoadingAi(false);
    }
  };

  // Get current tasks based on crop stage and planting date
  const getCurrentTasks = (farm, cropGuidance) => {
    if (!farm.cropDetails?.plantingDate || !cropGuidance) return [];
    
    const plantingDate = new Date(farm.cropDetails.plantingDate);
    const currentDate = new Date();
    const daysSincePlanting = Math.floor((currentDate - plantingDate) / (1000 * 60 * 60 * 24));
    
    const tasks = [];
    
    // Rice (ধান) specific tasks based on BRRI guidelines
    if (farm.cropDetails.type === 'ধান') {
      // Germination stage (0-7 days)
      if (daysSincePlanting <= 7) {
        tasks.push({
          id: 'germination_check',
          task: "অঙ্কুরোদগম পরীক্ষা করুন",
          priority: "high",
          icon: <FaSeedling className="text-green-500" />,
          description: "৮০% এর বেশি বীজ গজানো হয়েছে কিনা দেখুন",
          daysAfterPlanting: 7
        });
      }
      
      // Initial growth stage (8-15 days)
      if (daysSincePlanting > 7 && daysSincePlanting <= 15) {
        tasks.push({
          id: 'first_irrigation',
          task: "প্রথম সেচ দিন",
          priority: "high",
          icon: <FaTint className="text-blue-500" />,
          description: "২-৩ সেমি পানির স্তর বজায় রাখুন",
          daysAfterPlanting: 15
        });
      }
      
      // Tillering stage (16-30 days)
      if (daysSincePlanting > 15 && daysSincePlanting <= 30) {
        tasks.push({
          id: 'first_fertilizer',
          task: "প্রথম সার প্রয়োগ",
          priority: "high",
          icon: <FaLeaf className="text-green-600" />,
          description: "ইউরিয়া সারের প্রথম কিস্তি দিন",
          daysAfterPlanting: 25
        });
        tasks.push({
          id: 'weed_control',
          task: "আগাছা দমন",
          priority: "medium",
          icon: <FaShieldAlt className="text-orange-500" />,
          description: "জমি থেকে আগাছা পরিষ্কার করুন",
          daysAfterPlanting: 30
        });
      }
      
      // Stem elongation stage (31-45 days)
      if (daysSincePlanting > 30 && daysSincePlanting <= 45) {
        tasks.push({
          id: 'second_fertilizer',
          task: "দ্বিতীয় সার প্রয়োগ",
          priority: "high",
          icon: <FaLeaf className="text-green-600" />,
          description: "সারের দ্বিতীয় কিস্তি দিন",
          daysAfterPlanting: 40
        });
      }
      
      // Panicle initiation stage (46-60 days)
      if (daysSincePlanting > 45 && daysSincePlanting <= 60) {
        tasks.push({
          id: 'pest_monitoring',
          task: "পোকামাকড় নিয়ন্ত্রণ",
          priority: "medium",
          icon: <FaBug className="text-red-500" />,
          description: "ফসল পরিদর্শন করে প্রয়োজনীয় স্প্রে করুন",
          daysAfterPlanting: 55
        });
      }
      
      // Heading stage (61-75 days)
      if (daysSincePlanting > 60 && daysSincePlanting <= 75) {
        tasks.push({
          id: 'water_management',
          task: "পানি ব্যবস্থাপনা",
          priority: "medium",
          icon: <FaTint className="text-blue-400" />,
          description: "পর্যায়ক্রমিক সেচ দিন",
          daysAfterPlanting: 70
        });
      }
      
      // Ripening stage (76-90 days)
      if (daysSincePlanting > 75 && daysSincePlanting <= 90) {
        tasks.push({
          id: 'harvest_preparation',
          task: "কাটাই প্রস্তুতি",
          priority: "low",
          icon: <FaTractor className="text-yellow-600" />,
          description: "কাটাইয়ের প্রস্তুতি নিন",
          daysAfterPlanting: 85
        });
      }
      
      // Harvest stage (91-105 days)
      if (daysSincePlanting > 90 && daysSincePlanting <= 105) {
        tasks.push({
          id: 'harvest_time',
          task: "ফসল কাটাই",
          priority: "high",
          icon: <FaTractor className="text-green-700" />,
          description: "ফসল সংগ্রহ করুন",
          daysAfterPlanting: 100
        });
      }
    }
    
    // Always add these general tasks
    tasks.push({
      id: 'regular_monitoring',
      task: "নিয়মিত ফসল পর্যবেক্ষণ",
      priority: "low",
      icon: <FaInfoCircle className="text-purple-500" />,
      description: "রোগ ও পোকামাকড়ের লক্ষণ দেখুন",
      daysAfterPlanting: 'ongoing'
    });
    
    // Filter out completed tasks and tasks that are not yet due
    return tasks
      .filter(task => !completedTasks.includes(task.id))
      .filter(task => task.daysAfterPlanting === 'ongoing' || daysSincePlanting <= task.daysAfterPlanting)
      .slice(0, 4);
  };

  // Mark task as completed
  const markTaskCompleted = (taskId) => {
    setCompletedTasks(prev => [...prev, taskId]);
  };

  // Get urgent alerts based on farm condition
  const getUrgentAlerts = (farm, cropGuidance) => {
    const alerts = [];
    
    if (!farm.cropDetails?.plantingDate) return alerts;
    
    const plantingDate = new Date(farm.cropDetails.plantingDate);
    const currentDate = new Date();
    const daysSincePlanting = Math.floor((currentDate - plantingDate) / (1000 * 60 * 60 * 24));
    
    // Irrigation alerts
    if (daysSincePlanting > 7 && daysSincePlanting <= 15 && !completedTasks.includes('first_irrigation')) {
      alerts.push({
        type: "warning",
        message: "জরুরি সেচ প্রয়োজন",
        icon: <FaTint className="text-red-500" />,
        action: "আজই সেচ দিন"
      });
    }
    
    // Fertilizer alerts
    if (daysSincePlanting > 15 && daysSincePlanting <= 25 && !completedTasks.includes('first_fertilizer')) {
      alerts.push({
        type: "warning",
        message: "সার প্রয়োগের সময়",
        icon: <FaLeaf className="text-orange-500" />,
        action: "সার প্রয়োগ করুন"
      });
    }
    
    // Pest alerts (simulated based on conditions)
    if (daysSincePlanting > 45 && Math.random() > 0.6) {
      alerts.push({
        type: "danger",
        message: "পোকামাকড়ের আক্রমণ",
        icon: <FaBug className="text-red-600" />,
        action: "জৈব কীটনাশক স্প্রে করুন"
      });
    }
    
    return alerts;
  };

  // Get progress based on planting date and crop duration
  const getCropProgress = (farm, cropGuidance) => {
    if (!farm.cropDetails?.plantingDate || !cropGuidance?.duration) return 0;
    
    const plantingDate = new Date(farm.cropDetails.plantingDate);
    const currentDate = new Date();
    const totalDuration = parseInt(cropGuidance.duration) * 30; // Convert months to days
    
    const daysPassed = Math.floor((currentDate - plantingDate) / (1000 * 60 * 60 * 24));
    const progress = Math.min(Math.max((daysPassed / totalDuration) * 100, 0), 100);
    
    return Math.round(progress);
  };

  // Load AI suggestions when component mounts or farm data changes
  useEffect(() => {
    if (farm.cropDetails?.type && farm.cropDetails?.plantingDate) {
      fetchAiSuggestions();
    }
  }, [farm.cropDetails?.type, farm.cropDetails?.plantingDate]);

  const currentTasks = getCurrentTasks(farm, cropGuidance);
  const urgentAlerts = getUrgentAlerts(farm, cropGuidance);
  const cropProgress = getCropProgress(farm, cropGuidance);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 hover:shadow-lg transition-shadow">
      {/* Farm Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            {farm.cropDetails?.type ? (
              <span className="text-2xl">{getCropIcon(farm.cropDetails.type)}</span>
            ) : (
              <FaSeedling className="text-green-600 text-xl" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-800 font-bangla">{farm.name}</h3>
            <p className="text-sm text-gray-600 font-bangla flex items-center gap-1">
              <FaMapMarkerAlt className="text-green-600 text-xs" />
              {farm.location}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          farm.status === 'পরিকল্পনাধীন' ? 'bg-blue-100 text-blue-800' :
          farm.status === 'চলমান' ? 'bg-green-100 text-green-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {farm.status}
        </span>
      </div>

      {/* Crop Progress */}
      {cropProgress > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700 font-bangla">ফসলের অগ্রগতি</span>
            <span className="text-sm text-green-600 font-bold">{cropProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${cropProgress}%` }}
            ></div>
          </div>
          {farm.cropDetails?.plantingDate && (
            <p className="text-xs text-gray-500 text-right mt-1 font-bangla">
              বপন থেকে {Math.floor((new Date() - new Date(farm.cropDetails.plantingDate)) / (1000 * 60 * 60 * 24))} দিন পার
            </p>
          )}
        </div>
      )}

      {/* AI Smart Suggestions */}
      {farm.cropDetails?.type && farm.cropDetails?.plantingDate && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FaRobot className="text-purple-600" />
            <h4 className="font-bold text-purple-800 font-bangla">AI স্মার্ট পরামর্শ</h4>
            <button 
              onClick={fetchAiSuggestions}
              disabled={loadingAi}
              className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 font-bangla flex items-center gap-1"
            >
              {loadingAi ? <FaSpinner className="animate-spin" /> : '🔄'}
              {loadingAi ? 'লোডিং...' : 'রিফ্রেশ'}
            </button>
          </div>
          <div className="bg-white rounded-lg p-3 border border-purple-200 shadow-sm">
            {loadingAi ? (
              <div className="flex items-center gap-2 text-purple-700 justify-center py-2">
                <FaSpinner className="animate-spin" />
                <span className="font-bangla text-sm">AI পরামর্শ লোড হচ্ছে...</span>
              </div>
            ) : aiSuggestions ? (
              <div>
                <p className="text-sm text-gray-800 font-bangla leading-relaxed whitespace-pre-line">
                  {aiSuggestions}
                </p>
                <div className="mt-2 text-xs text-purple-600 font-bangla border-t pt-2">
                  💡 বপনের তারিখ: {new Date(farm.cropDetails.plantingDate).toLocaleDateString('bn-BD')} অনুসারে পরামর্শ
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600 font-bangla text-center py-2">
                AI পরামর্শ লোড করতে রিফ্রেশ বাটন ক্লিক করুন
              </p>
            )}
          </div>
        </div>
      )}

      {/* Rest of the component remains the same */}
      {/* Urgent Alerts */}
      {urgentAlerts.length > 0 && (
        <div className="mb-4 space-y-2">
          {urgentAlerts.map((alert, index) => (
            <div key={index} className={`p-3 rounded-lg border-l-4 ${
              alert.type === 'danger' 
                ? 'bg-red-50 border-red-500' 
                : 'bg-yellow-50 border-yellow-500'
            }`}>
              <div className="flex items-center gap-2">
                {alert.icon}
                <div className="flex-1">
                  <p className="font-semibold text-sm font-bangla text-red-700">{alert.message}</p>
                  <p className="text-xs text-gray-600 font-bangla">{alert.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current Tasks */}
      {currentTasks.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <FaTasks className="text-green-600" />
            <h4 className="font-bold text-green-800 font-bangla">বর্তমান কাজ</h4>
            <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-bangla">
              {currentTasks.length} টি কাজ
            </span>
          </div>
          <div className="space-y-2">
            {currentTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-green-100 group hover:shadow-sm transition-shadow">
                <div className={`p-2 rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-600' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {task.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm font-bangla text-gray-800">{task.task}</p>
                  <p className="text-xs text-gray-600 font-bangla">{task.description}</p>
                </div>
                <button 
                  onClick={() => markTaskCompleted(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-green-600 hover:bg-green-100 rounded-lg transition-all"
                  title="কাজ শেষ করুন"
                >
                  <FaCheckCircle />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button 
          onClick={fetchAiSuggestions}
          disabled={loadingAi}
          className="flex items-center justify-center gap-1 p-2 bg-green-100 text-green-700 rounded-lg text-sm font-bangla hover:bg-green-200 transition-colors disabled:opacity-50"
        >
          {loadingAi ? <FaSpinner className="animate-spin" /> : <FaRobot />}
          AI পরামর্শ
        </button>
        <button className="flex items-center justify-center gap-1 p-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-bangla hover:bg-blue-200 transition-colors">
          <FaPhoneAlt />
          বিশেষজ্ঞ
        </button>
      </div>

      {/* Basic Farm Info */}
      <div className="space-y-2 text-sm text-gray-700 border-t pt-3">
        <div className="flex justify-between">
          <span className="font-bangla">ফসল:</span>
          <span className="font-semibold font-bangla">
            {farm.cropDetails?.type ? `${farm.cropDetails.type} (${farm.cropDetails.variety})` : 'কোন ফসল নেই'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-bangla">জমির আয়তন:</span>
          <span className="font-semibold">{farm.sizeAcre} একর</span>
        </div>
        
        {farm.cropDetails?.plantingDate && (
          <div className="flex justify-between">
            <span className="font-bangla">বপনের তারিখ:</span>
            <span className="font-semibold">
              {new Date(farm.cropDetails.plantingDate).toLocaleDateString('bn-BD')}
            </span>
          </div>
        )}
      </div>

      {/* Organic Badge */}
      {farm.organicPractices && (
        <div className="mt-3 bg-green-100 border border-green-300 rounded-lg p-2 text-center">
          <span className="text-green-800 font-bangla text-sm flex items-center justify-center gap-1">
            <FaLeaf className="text-green-600" />
            জৈব চাষ পদ্ধতি
          </span>
        </div>
      )}
    </div>
  );
};

export default FarmCard;