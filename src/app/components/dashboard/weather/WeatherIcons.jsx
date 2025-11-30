import {
  FaSun,
  FaCloudSun,
  FaCloud,
  FaCloudShowersHeavy,
  FaBolt,
  FaSnowflake,
} from "react-icons/fa";

export const getWeatherIcon = (conditionType, size = "100%") => {
  const iconProps = { size, className: "text-yellow-400" };
  switch (conditionType) {
    case "CLEAR":
      return <FaSun {...iconProps} />;
    case "PARTLY_CLOUDY":
      return <FaCloudSun {...iconProps} className="text-gray-500" />;
    case "CLOUDY":
      return <FaCloud {...iconProps} className="text-gray-400" />;
    case "RAIN":
    case "SCATTERED_SHOWERS":
      return <FaCloudShowersHeavy {...iconProps} className="text-blue-400" />;
    // Add more cases for different weather conditions
    default:
      return <FaCloudSun {...iconProps} className="text-gray-500" />;
  }
};
