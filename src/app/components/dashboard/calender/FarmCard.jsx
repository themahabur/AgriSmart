


// import { useState, useEffect } from "react";
// import { 
//   FaSeedling, 
//   FaTractor, 
//   FaExclamationTriangle,
//   FaTint,
//   FaPhoneAlt,
//   FaLeaf,
//   FaInfoCircle,
//   FaBug,
//   FaRobot,
//   FaSpinner,
//   FaCheckCircle,
//   FaMapMarkerAlt,
//   FaClock
// } from "react-icons/fa";

// const FarmCard = ({ farm, cropData, getCropIcon, weatherData }) => {
//   const [aiSuggestions, setAiSuggestions] = useState(null);
//   const [loadingAi, setLoadingAi] = useState(false);
//   const [completedTasks, setCompletedTasks] = useState([]);

//   const cropGuidance = farm.cropDetails?.type ? getCropGuidance(farm, cropData) : null;

//   function getCropGuidance(farm, cropData) {
//     if (!farm.cropDetails?.type) return null;
    
//     const cropType = farm.cropDetails.type;
//     const variety = farm.cropDetails.variety;
    
//     if (cropData[cropType]) {
//       if (cropType === 'ধান' && cropData[cropType][variety]) {
//         return cropData[cropType][variety];
//       }
//       return cropData[cropType];
//     }
//     return null;
//   }

//   // Improved AI suggestions for farmers
//   const fetchAiSuggestions = async () => {
//     if (!farm.cropDetails?.type) return;
    
//     setLoadingAi(true);
//     try {
//       const today = new Date();
//       const plantingDate = new Date(farm.cropDetails.plantingDate);
//       const daysSincePlanting = Math.floor((today - plantingDate) / (1000 * 60 * 60 * 24));
      
//       // Simple crop stage calculation
//       let cropStage = "";
//       if (daysSincePlanting <= 15) cropStage = "শুরুর阶段";
//       else if (daysSincePlanting <= 45) cropStage = "বৃদ্ধি阶段";
//       else if (daysSincePlanting <= 75) cropStage = "ফলন阶段";
//       else cropStage = "পরিপক্ব阶段";

//       const question = `
//         আমি একজন বাংলাদেশী কৃষক। আমার ফসলের তথ্য:

//         ফসল: ${farm.cropDetails.type}
//         জাত: ${farm.cropDetails.variety || 'স্থানীয়'}
//         বপন: ${plantingDate.toLocaleDateString('bn-BD')} (${daysSincePlanting} দিন আগে)
//         বর্তমান অবস্থা: ${cropStage}
//         জমি: ${farm.sizeAcre} একর
//         অবস্থান: ${farm.location}
//         জৈব চাষ: ${farm.organicPractices ? 'হ্যাঁ' : 'না'}

//         আজকের তারিখ: ${today.toLocaleDateString('bn-BD')}

//         আমাকে বাংলায় সহজ পরামর্শ দিন:

//         ১. আজকের জরুরি কাজ কি?
//         ২. এখন কি সার দেবো?
//         ৩. সেচ কখন দেবো?
//         ৪. কোন রোগ-পোকার সতর্কতা?
//         ৫. আবহাওয়ার জন্য বিশেষ নির্দেশনা?

//         খুব সহজ এবং ব্যবহারযোগ্য পরামর্শ দিন। প্রতিদিনের কাজের জন্য।
//       `;

//       const response = await fetch('/api/ask-ai', {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAiSuggestions(data.answer);
//       } else {
//         setAiSuggestions("পরামর্শ লোড করা যাচ্ছে না। ইন্টারনেট চেক করুন।");
//       }
//     } catch (error) {
//       setAiSuggestions("নেটওয়ার্ক সমস্যা। পরে চেষ্টা করুন।");
//     } finally {
//       setLoadingAi(false);
//     }
//   };

//   // Simple tasks for farmers
//   const getCurrentTasks = (farm) => {
//     if (!farm.cropDetails?.plantingDate) return [];
    
//     const plantingDate = new Date(farm.cropDetails.plantingDate);
//     const currentDate = new Date();
//     const daysSincePlanting = Math.floor((currentDate - plantingDate) / (1000 * 60 * 60 * 24));
    
//     const tasks = [];
    
//     if (farm.cropDetails.type === 'ধান') {
//       if (daysSincePlanting <= 7) {
//         tasks.push({
//           id: 'check_seeds',
//           task: "বীজ গজানো চেক করুন",
//           icon: <FaSeedling className="text-green-500" />,
//         });
//       }
      
//       if (daysSincePlanting > 7 && daysSincePlanting <= 15) {
//         tasks.push({
//           id: 'first_water',
//           task: "প্রথম সেচ দিন",
//           icon: <FaTint className="text-blue-500" />,
//         });
//       }
      
//       if (daysSincePlanting > 15 && daysSincePlanting <= 25) {
//         tasks.push({
//           id: 'first_fertilizer',
//           task: "ইউরিয়া সার দিন",
//           icon: <FaLeaf className="text-green-600" />,
//         });
//       }
      
//       if (daysSincePlanting > 30 && daysSincePlanting <= 45) {
//         tasks.push({
//           id: 'weed_clean',
//           task: "আগাছা পরিষ্কার",
//           icon: <FaTractor className="text-yellow-600" />,
//         });
//       }
//     }
    
//     // Always add monitoring task
//     tasks.push({
//       id: 'check_crop',
//       task: "ফসল পরীক্ষা করুন",
//       icon: <FaInfoCircle className="text-purple-500" />,
//     });
    
//     return tasks
//       .filter(task => !completedTasks.includes(task.id))
//       .slice(0, 3);
//   };

//   const markTaskCompleted = (taskId) => {
//     setCompletedTasks(prev => [...prev, taskId]);
//   };

//   // Simple alerts
//   const getUrgentAlerts = (farm) => {
//     const alerts = [];
    
//     if (!farm.cropDetails?.plantingDate) return alerts;
    
//     const plantingDate = new Date(farm.cropDetails.plantingDate);
//     const daysSincePlanting = Math.floor((new Date() - plantingDate) / (1000 * 60 * 60 * 24));
    
//     if (daysSincePlanting > 7 && daysSincePlanting <= 15) {
//       alerts.push({
//         message: "প্রথম সেচ প্রয়োজন",
//         icon: <FaTint className="text-red-500" />,
//       });
//     }
    
//     if (daysSincePlanting > 15 && daysSincePlanting <= 25) {
//       alerts.push({
//         message: "সার প্রয়োগের সময়",
//         icon: <FaLeaf className="text-orange-500" />,
//       });
//     }
    
//     return alerts;
//   };

//   useEffect(() => {
//     if (farm.cropDetails?.type && farm.cropDetails?.plantingDate) {
//       fetchAiSuggestions();
//     }
//   }, [farm.cropDetails?.type, farm.cropDetails?.plantingDate]);

//   const currentTasks = getCurrentTasks(farm);
//   const urgentAlerts = getUrgentAlerts(farm);

//   return (
//     <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
//       {/* Farm Header */}
//       <div className="flex items-center gap-3 mb-4">
//         <div className="p-2 bg-green-100 rounded-lg">
//           {farm.cropDetails?.type ? (
//             <span className="text-2xl">{getCropIcon(farm.cropDetails.type)}</span>
//           ) : (
//             <FaSeedling className="text-green-600 text-xl" />
//           )}
//         </div>
//         <div>
//           <h3 className="text-lg font-bold text-gray-800 font-bangla">{farm.name}</h3>
//           <p className="text-sm text-gray-600 font-bangla flex items-center gap-1">
//             <FaMapMarkerAlt className="text-green-600 text-xs" />
//             {farm.location} • {farm.sizeAcre} একর
//           </p>
//         </div>
//       </div>

//       {/* AI Suggestions - Improved Section */}
//       {farm.cropDetails?.type && (
//         <div className="mb-4">
//           <div className="flex items-center gap-2 mb-2">
//             <FaRobot className="text-purple-600" />
//             <h4 className="font-bold text-gray-800 font-bangla">আজকের পরামর্শ</h4>
//             <button 
//               onClick={fetchAiSuggestions}
//               disabled={loadingAi}
//               className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors disabled:opacity-50 font-bangla flex items-center gap-1"
//             >
//               {loadingAi ? <FaSpinner className="animate-spin" /> : '🔄'}
//             </button>
//           </div>
          
//           <div className="bg-green-50 rounded-lg p-3 border border-green-200">
//             {loadingAi ? (
//               <div className="flex items-center gap-2 text-green-700 justify-center py-2">
//                 <FaSpinner className="animate-spin" />
//                 <span className="font-bangla text-sm">পরামর্শ লোড হচ্ছে...</span>
//               </div>
//             ) : aiSuggestions ? (
//               <div>
//                 <p className="text-sm text-gray-800 font-bangla leading-relaxed whitespace-pre-line">
//                   {aiSuggestions}
//                 </p>
//                 <div className="mt-2 text-xs text-green-600 font-bangla border-t pt-2">
//                   💡 {new Date().toLocaleDateString('bn-BD')} এর পরামর্শ
//                 </div>
//               </div>
//             ) : (
//               <p className="text-sm text-gray-600 font-bangla text-center py-2">
//                 AI পরামর্শ লোড করতে রিফ্রেশ বাটন ক্লিক করুন
//               </p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Urgent Alerts */}
//       {urgentAlerts.length > 0 && (
//         <div className="mb-4">
//           <div className="flex items-center gap-2 mb-2">
//             <FaExclamationTriangle className="text-red-500" />
//             <h4 className="font-bold text-red-800 font-bangla">জরুরি সতর্কতা</h4>
//           </div>
//           <div className="space-y-2">
//             {urgentAlerts.map((alert, index) => (
//               <div key={index} className="p-2 bg-red-50 rounded border border-red-200">
//                 <div className="flex items-center gap-2">
//                   {alert.icon}
//                   <p className="font-semibold text-sm font-bangla text-red-700">{alert.message}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Today's Tasks */}
//       {currentTasks.length > 0 && (
//         <div className="mb-4">
//           <div className="flex items-center gap-2 mb-2">
//             <FaCheckCircle className="text-green-600" />
//             <h4 className="font-bold text-green-800 font-bangla">আজকের কাজ</h4>
//           </div>
//           <div className="space-y-2">
//             {currentTasks.map((task) => (
//               <div key={task.id} className="flex items-center gap-3 p-2 bg-white rounded border border-green-100">
//                 <div className="p-2 bg-green-100 rounded">
//                   {task.icon}
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-semibold text-sm font-bangla text-gray-800">{task.task}</p>
//                 </div>
//                 <button 
//                   onClick={() => markTaskCompleted(task.id)}
//                   className="p-2 text-green-600 hover:bg-green-100 rounded transition-all"
//                   title="কাজ শেষ করুন"
//                 >
//                   <FaCheckCircle />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Quick Actions */}
//       <div className="grid   mb-3">
//         <button 
//           onClick={fetchAiSuggestions}
//           disabled={loadingAi}
//           className="flex items-center justify-center gap-1 p-2 bg-green-100 text-green-700 rounded text-sm font-bangla hover:bg-green-200 transition-colors disabled:opacity-50"
//         >
//           {loadingAi ? <FaSpinner className="animate-spin" /> : <FaRobot />}
//           AI পরামর্শ
//         </button>
        
//       </div>

//       {/* Farm Info */}
//       <div className="text-sm text-gray-700 border-t pt-3">
//         <div className="flex justify-between mb-1">
//           <span className="font-bangla">ফসল:</span>
//           <span className="font-semibold font-bangla">
//             {farm.cropDetails?.type ? `${farm.cropDetails.type}` : 'নির্ধারিত হয়নি'}
//           </span>
//         </div>
        
//         {farm.cropDetails?.plantingDate && (
//           <div className="flex justify-between">
//             <span className="font-bangla">বপন তারিখ:</span>
//             <span className="font-semibold">
//               {new Date(farm.cropDetails.plantingDate).toLocaleDateString('bn-BD')}
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Organic Badge */}
//       {/* {farm.organicPractices && (
//         <div className="mt-3 bg-green-100 border border-green-300 rounded p-2 text-center">
//           <span className="text-green-800 font-bangla text-sm flex items-center justify-center gap-1">
//             <FaLeaf className="text-green-600" />
//             জৈব চাষ
//           </span>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default FarmCard;



import { useState, useEffect } from "react";
import { 
  FaSeedling, 
  FaTractor, 
  FaExclamationTriangle,
  FaTint,
  FaPhoneAlt,
  FaLeaf,
  FaInfoCircle,
  FaBug,
  FaRobot,
  FaSpinner,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaClock,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

const FarmCard = ({ farm, cropData, getCropIcon, weatherData }) => {
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showAiAdvice, setShowAiAdvice] = useState(false); // New state to control visibility

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

  // Improved AI suggestions for farmers
  const fetchAiSuggestions = async () => {
    if (!farm.cropDetails?.type) return;
    
    setLoadingAi(true);
    setShowAiAdvice(true); // Automatically show when fetching
    
    try {
      const today = new Date();
      const plantingDate = new Date(farm.cropDetails.plantingDate);
      const daysSincePlanting = Math.floor((today - plantingDate) / (1000 * 60 * 60 * 24));
      
      // Simple crop stage calculation
      let cropStage = "";
      if (daysSincePlanting <= 15) cropStage = "শুরুর阶段";
      else if (daysSincePlanting <= 45) cropStage = "বৃদ্ধি阶段";
      else if (daysSincePlanting <= 75) cropStage = "ফলন阶段";
      else cropStage = "পরিপক্ব阶段";

      const question = `
        আমি একজন বাংলাদেশী কৃষক। আমার ফসলের তথ্য:

        ফসল: ${farm.cropDetails.type}
        জাত: ${farm.cropDetails.variety || 'স্থানীয়'}
        বপন: ${plantingDate.toLocaleDateString('bn-BD')} (${daysSincePlanting} দিন আগে)
        বর্তমান অবস্থা: ${cropStage}
        জমি: ${farm.sizeAcre} একর
        অবস্থান: ${farm.location}
        জৈব চাষ: ${farm.organicPractices ? 'হ্যাঁ' : 'না'}

        আজকের তারিখ: ${today.toLocaleDateString('bn-BD')}

        আমাকে বাংলায় সহজ পরামর্শ দিন:

        ১. আজকের জরুরি কাজ কি?
        ২. এখন কি সার দেবো?
        ৩. সেচ কখন দেবো?
        ৪. কোন রোগ-পোকার সতর্কতা?
        ৫. আবহাওয়ার জন্য বিশেষ নির্দেশনা?

        খুব সহজ এবং ব্যবহারযোগ্য পরামর্শ দিন। প্রতিদিনের কাজের জন্য।
      `;

      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiSuggestions(data.answer);
      } else {
        setAiSuggestions("পরামর্শ লোড করা যাচ্ছে না। ইন্টারনেট চেক করুন।");
      }
    } catch (error) {
      setAiSuggestions("নেটওয়ার্ক সমস্যা। পরে চেষ্টা করুন।");
    } finally {
      setLoadingAi(false);
    }
  };

  // Toggle AI advice visibility
  const toggleAiAdvice = () => {
    if (!aiSuggestions && !loadingAi) {
      fetchAiSuggestions(); // Fetch if not already loaded
    } else {
      setShowAiAdvice(!showAiAdvice); // Toggle visibility
    }
  };

  // Simple tasks for farmers
  const getCurrentTasks = (farm) => {
    if (!farm.cropDetails?.plantingDate) return [];
    
    const plantingDate = new Date(farm.cropDetails.plantingDate);
    const currentDate = new Date();
    const daysSincePlanting = Math.floor((currentDate - plantingDate) / (1000 * 60 * 60 * 24));
    
    const tasks = [];
    
    if (farm.cropDetails.type === 'ধান') {
      if (daysSincePlanting <= 7) {
        tasks.push({
          id: 'check_seeds',
          task: "বীজ গজানো চেক করুন",
          icon: <FaSeedling className="text-green-500" />,
        });
      }
      
      if (daysSincePlanting > 7 && daysSincePlanting <= 15) {
        tasks.push({
          id: 'first_water',
          task: "প্রথম সেচ দিন",
          icon: <FaTint className="text-blue-500" />,
        });
      }
      
      if (daysSincePlanting > 15 && daysSincePlanting <= 25) {
        tasks.push({
          id: 'first_fertilizer',
          task: "ইউরিয়া সার দিন",
          icon: <FaLeaf className="text-green-600" />,
        });
      }
      
      if (daysSincePlanting > 30 && daysSincePlanting <= 45) {
        tasks.push({
          id: 'weed_clean',
          task: "আগাছা পরিষ্কার",
          icon: <FaTractor className="text-yellow-600" />,
        });
      }
    }
    
    // Always add monitoring task
    tasks.push({
      id: 'check_crop',
      task: "ফসল পরীক্ষা করুন",
      icon: <FaInfoCircle className="text-purple-500" />,
    });
    
    return tasks
      .filter(task => !completedTasks.includes(task.id))
      .slice(0, 3);
  };

  const markTaskCompleted = (taskId) => {
    setCompletedTasks(prev => [...prev, taskId]);
  };

  // Simple alerts
  const getUrgentAlerts = (farm) => {
    const alerts = [];
    
    if (!farm.cropDetails?.plantingDate) return alerts;
    
    const plantingDate = new Date(farm.cropDetails.plantingDate);
    const daysSincePlanting = Math.floor((new Date() - plantingDate) / (1000 * 60 * 60 * 24));
    
    if (daysSincePlanting > 7 && daysSincePlanting <= 15) {
      alerts.push({
        message: "প্রথম সেচ প্রয়োজন",
        icon: <FaTint className="text-red-500" />,
      });
    }
    
    if (daysSincePlanting > 15 && daysSincePlanting <= 25) {
      alerts.push({
        message: "সার প্রয়োগের সময়",
        icon: <FaLeaf className="text-orange-500" />,
      });
    }
    
    return alerts;
  };

  useEffect(() => {
    // Auto-fetch AI suggestions when component mounts if crop details exist
    if (farm.cropDetails?.type && farm.cropDetails?.plantingDate) {
      // You can choose to auto-fetch or wait for user click
      // fetchAiSuggestions(); 
    }
  }, [farm.cropDetails?.type, farm.cropDetails?.plantingDate]);

  const currentTasks = getCurrentTasks(farm);
  const urgentAlerts = getUrgentAlerts(farm);

  return (
    <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
      {/* Farm Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          {farm.cropDetails?.type ? (
            <span className="text-2xl">{getCropIcon(farm.cropDetails.type)}</span>
          ) : (
            <FaSeedling className="text-green-600 text-xl" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 font-bangla">{farm.name}</h3>
          <p className="text-sm text-gray-600 font-bangla flex items-center gap-1">
            <FaMapMarkerAlt className="text-green-600 text-xs" />
            {farm.location} • {farm.sizeAcre} একর
          </p>
        </div>
      </div>

      {/* AI Suggestions - Improved Section with Toggle */}
      {farm.cropDetails?.type && (
        <div className="mb-4">
          <div 
            className="flex items-center gap-2 mb-2 cursor-pointer"
            onClick={toggleAiAdvice}
          >
            <FaRobot className="text-purple-600" />
            <h4 className="font-bold text-gray-800 font-bangla">আজকের পরামর্শ</h4>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                fetchAiSuggestions();
              }}
              disabled={loadingAi}
              className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors disabled:opacity-50 font-bangla flex items-center gap-1"
            >
              {loadingAi ? <FaSpinner className="animate-spin" /> : '🔄'}
            </button>
            <span className="text-gray-400">
              {showAiAdvice ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          
          {showAiAdvice && (
            <div className="bg-green-50 rounded-lg p-3 border border-green-200 animate-fadeIn">
              {loadingAi ? (
                <div className="flex items-center gap-2 text-green-700 justify-center py-2">
                  <FaSpinner className="animate-spin" />
                  <span className="font-bangla text-sm">পরামর্শ লোড হচ্ছে...</span>
                </div>
              ) : aiSuggestions ? (
                <div>
                  <p className="text-sm text-gray-800 font-bangla leading-relaxed whitespace-pre-line">
                    {aiSuggestions}
                  </p>
                  <div className="mt-2 text-xs text-green-600 font-bangla border-t pt-2">
                    💡 {new Date().toLocaleDateString('bn-BD')} এর পরামর্শ
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-600 font-bangla mb-2">
                    AI পরামর্শ পাওয়ার জন্য রিফ্রেশ বাটন ক্লিক করুন
                  </p>
                  <button 
                    onClick={fetchAiSuggestions}
                    className="bg-green-500 text-white px-4 py-2 rounded text-sm font-bangla hover:bg-green-600 transition-colors flex items-center gap-2 mx-auto"
                  >
                    <FaRobot />
                    পরামর্শ নিন
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Urgent Alerts */}
      {urgentAlerts.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FaExclamationTriangle className="text-red-500" />
            <h4 className="font-bold text-red-800 font-bangla">জরুরি সতর্কতা</h4>
          </div>
          <div className="space-y-2">
            {urgentAlerts.map((alert, index) => (
              <div key={index} className="p-2 bg-red-50 rounded border border-red-200">
                <div className="flex items-center gap-2">
                  {alert.icon}
                  <p className="font-semibold text-sm font-bangla text-red-700">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Tasks */}
      {currentTasks.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-green-600" />
            <h4 className="font-bold text-green-800 font-bangla">আজকের কাজ</h4>
          </div>
          <div className="space-y-2">
            {currentTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-2 bg-white rounded border border-green-100">
                <div className="p-2 bg-green-100 rounded">
                  {task.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm font-bangla text-gray-800">{task.task}</p>
                </div>
                <button 
                  onClick={() => markTaskCompleted(task.id)}
                  className="p-2 text-green-600 hover:bg-green-100 rounded transition-all"
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
      <div className="grid mb-3">
        <button 
          onClick={toggleAiAdvice}
          disabled={loadingAi}
          className="flex items-center justify-center gap-1 p-2 bg-green-100 text-green-700 rounded text-sm font-bangla hover:bg-green-200 transition-colors disabled:opacity-50"
        >
          {loadingAi ? <FaSpinner className="animate-spin" /> : <FaRobot />}
          {showAiAdvice ? 'পরামর্শ লুকান' : 'AI পরামর্শ দেখুন'}
        </button>
      </div>

      {/* Farm Info */}
      <div className="text-sm text-gray-700 border-t pt-3">
        <div className="flex justify-between mb-1">
          <span className="font-bangla">ফসল:</span>
          <span className="font-semibold font-bangla">
            {/* {farm.cropDetails?.type ? ${farm.cropDetails.type} : 'নির্ধারিত হয়নি'} */}
          </span>
        </div>
        
        {farm.cropDetails?.plantingDate && (
          <div className="flex justify-between">
            <span className="font-bangla">বপন তারিখ:</span>
            <span className="font-semibold">
              {new Date(farm.cropDetails.plantingDate).toLocaleDateString('bn-BD')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmCard;