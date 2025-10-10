import { FaFlask, FaMapMarkerAlt, FaSeedling, FaTint, FaChartLine, FaDownload, FaSyncAlt, FaSun, FaMoon, FaLeaf } from 'react-icons/fa';
import { IoIosWarning, IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';

const soilData = {
    location: "Rajshahi, Bangladesh",
    sqiScore: 82,
    sqiStatus: "Healthy",
    pH: 6.4,
    moisture: 65,
    temperature: 29,
    npk: { N: "Medium", P: "Low", K: "High" },
    cropSuitability: [
        { name: "ধান", suitable: true },
        { name: "গম", suitable: true },
        { name: "পাট", suitable: false },
    ],
    recommendations: [
        "ফসফরাস সার প্রয়োগ করুন",
        "ড্রিপ সেচ ব্যবহার করুন",
        "জৈব সার যোগ করুন",
    ],
    tips: [
        "Test your soil every 6 months",
        "Maintain organic matter content",
        "Avoid overwatering",
    ],
    type: "Loamy",
    drainage: "Moderate Drainage",
};

const OverviewCard = ({ icon: Icon, title, value, unit = '', color = 'text-gray-700' }) => (
    <div className="flex items-center p-4 bg-white rounded-xl  hover: transition duration-300 border border-gray-100">
        <Icon className={`text-2xl mr-3 ${color}`} />
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-xl font-bold text-gray-800">{value}{unit}</p>
        </div>
    </div>
);

const NPKIndicator = ({ nutrient, level, color }) => {
    const colorClasses = {
        High: "bg-green-500",
        Medium: "bg-yellow-500",
        Low: "bg-red-500",
    };
    const barWidth = {
        High: "w-[85%]",
        Medium: "w-[50%]",
        Low: "w-[25%]",
    };

    return (
        <div className="mb-2">
            <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                <span>{nutrient} ({level})</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className={`${colorClasses[level]} ${barWidth[level]} h-2.5 rounded-full`} />
            </div>
        </div>
    );
};

const CropSuitabilityItem = ({ name, suitable }) => (
    <div className={`flex items-center p-2 rounded-lg ${suitable ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} transition duration-150`}>
        {suitable ? <IoIosCheckmarkCircle className="text-lg mr-2" /> : <IoIosCloseCircle className="text-lg mr-2" />}
        <span className="font-semibold">{name}</span>
    </div>
);

const SoilHealthDashboard = () => {
    const primaryColor = "text-green-600"; 
    const sqiColor = soilData.sqiScore >= 75 ? "text-green-600" : soilData.sqiScore >= 50 ? "text-yellow-600" : "text-red-600";
    const sqiBarColor = soilData.sqiScore >= 75 ? "bg-green-600" : soilData.sqiScore >= 50 ? "bg-yellow-600" : "bg-red-600";


    const ChartPlaceholder = () => (
        <div className="h-48 flex items-center justify-center bg-gray-50 border border-dashed rounded-xl text-gray-400">
            📊 Data History Graph Placeholder (pH / Moisture Change)
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-200 mb-6">
                <div className="flex items-center mb-3 sm:mb-0">
                    <FaFlask className={`text-3xl ${primaryColor} mr-3`} />
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800">Soil Health Report</h1>
                        <p className="flex items-center text-sm text-gray-500 mt-1">
                            <FaMapMarkerAlt className="mr-1" /> {soilData.location}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <div className="flex space-x-2 p-1 bg-white rounded-full  border">
                        <select className="bg-transparent text-gray-700 text-sm focus:ring-0 outline-none">
                            <option>Select Farm / Location</option>
                            <option>Farm A</option>
                            <option>Farm B</option>
                        </select>
                        <button className={`px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-full text-sm font-semibold transition`}>
                            Load Soil Data
                        </button>
                    </div>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">

                    <section className="p-6 bg-white rounded-2xl  border border-gray-100">
                        <h2 className={`text-xl font-bold mb-4 ${primaryColor}`}>Soil Quality Index (SQI)</h2>
                        <div className="flex items-center space-x-8">
                            {/* SQI Score */}
                            <div className="relative w-28 h-28">
                                <div className={`w-full h-full rounded-full border-[10px] border-gray-200 flex items-center justify-center`}>
                                    <div className={`absolute top-0 left-0 w-full h-full rounded-full border-[10px] ${sqiBarColor} transition-all`}
                                        style={{ clipPath: `inset(0 0 0 ${100 - soilData.sqiScore}%)` }} // Simple visualization
                                    ></div>
                                    <span className={`text-3xl font-extrabold ${sqiColor} relative`}>{soilData.sqiScore}%</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Overall Health Status</p>
                                <p className="text-3xl font-extrabold text-gray-800">{soilData.sqiStatus}</p>
                                <p className="text-base text-gray-600 mt-2">Score based on NPK, pH, and Moisture levels.</p>
                            </div>
                        </div>
                    </section>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <OverviewCard icon={FaFlask} title="pH Level" value={soilData.pH} color="text-yellow-600" />
                        <OverviewCard icon={FaTint} title="Moisture" value={soilData.moisture} unit="%" color="text-blue-600" />
                        <OverviewCard icon={FaSun} title="Temperature" value={soilData.temperature} unit="°C" color="text-red-600" />
                        <OverviewCard icon={FaLeaf} title="Soil Type" value={soilData.type} color={primaryColor} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <section className="p-6 bg-white rounded-2xl ">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <FaSeedling className={`${primaryColor} mr-2`} /> Important Nutrients (NPK)
                            </h2>
                            <NPKIndicator nutrient="Nitrogen (N)" level={soilData.npk.N} />
                            <NPKIndicator nutrient="Phosphorus (P)" level={soilData.npk.P} />
                            <NPKIndicator nutrient="Potassium (K)" level={soilData.npk.K} />
                        </section>

                        <section className="p-6 bg-white rounded-2xl ">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <IoIosCheckmarkCircle className={`${primaryColor} mr-2`} /> ফসল উপযোগিতা (Crop Suitability)
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {soilData.cropSuitability.map((crop) => (
                                    <CropSuitabilityItem key={crop.name} name={crop.name} suitable={crop.suitable} />
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-gray-500">Based on current NPK and pH levels.</p>
                        </section>
                    </div>

                    <section className="p-6 bg-white rounded-2xl ">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <FaChartLine className={`${primaryColor} mr-2`} /> Data History
                        </h2>
                        <ChartPlaceholder />
                    </section>
                </div>

                <div className="lg:col-span-1 space-y-6">

                    <section className="p-6 bg-green-50 rounded-2xl  border border-green-200">
                        <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                            <FaSeedling className="mr-2" /> 🌱 পরামর্শ (Recommendations)
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            {soilData.recommendations.map((rec, index) => (
                                <li key={index} className="text-base">{rec}</li>
                            ))}
                        </ul>
                    </section>
                    
                    <section className="p-6 bg-white rounded-2xl ">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <IoIosWarning className="text-yellow-600 mr-2" /> 💡 Soil Tips / Insights
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            {soilData.tips.map((tip, index) => (
                                <li key={index} className="text-base">{tip}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="p-6 bg-white rounded-2xl ">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">System Details</h2>
                        <div className="space-y-2 text-gray-700">
                            <p className="flex justify-between">
                                <span className="font-medium">Drainage Rate:</span>
                                <span>{soilData.drainage}</span>
                            </p>
                        </div>
                        <div className="mt-6 flex flex-col space-y-3">
                            <button className={`w-full py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition flex items-center justify-center`}>
                                <FaDownload className="mr-2" /> Download Report (PDF)
                            </button>
                            <button className={`w-full py-3 text-green-600 border border-green-600 hover:bg-green-50 rounded-lg font-semibold transition flex items-center justify-center`}>
                                <FaSyncAlt className="mr-2" /> Refresh / Sync Data
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default SoilHealthDashboard;