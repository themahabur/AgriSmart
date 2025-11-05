"use client";
import { FaExclamationTriangle, FaBolt, FaSun } from "react-icons/fa";

const alertStyles = {
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    iconColor: "text-yellow-500",
    titleColor: "text-yellow-700",
    messageColor: "text-yellow-600",
    icon: <FaExclamationTriangle size={32} />,
  },
  danger: {
    bg: "bg-red-50",
    border: "border-red-200",
    iconColor: "text-red-500",
    titleColor: "text-red-700",
    messageColor: "text-red-600",
    icon: <FaBolt size={32} />,
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-500",
    titleColor: "text-blue-700",
    messageColor: "text-blue-600",
    icon: <FaSun size={32} />,
  },
};

const WeatherAlert = ({ alert }) => {
  // If the alert object is null, render nothing. This is the conditional logic.
  if (!alert) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
        <div className="text-green-500">
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="font-bold text-green-700 mt-3">কোনো সতর্কতা নেই</h3>
        <p className="text-sm text-green-600 mt-1">
          আজকের আবহাওয়া কৃষিকাজের জন্য অনুকূল।
        </p>
      </div>
    );
  }

  // Get the correct styles based on the alert type
  const styles = alertStyles[alert.type] || alertStyles.info;

  return (
    <div
      className={`${styles.bg} border ${styles.border} rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm`}
    >
      <div className={styles.iconColor}>{styles.icon}</div>
      <h3 className={`font-bold mt-3 ${styles.titleColor}`}>{alert.title}</h3>
      <p className={`text-sm mt-1 ${styles.messageColor}`}>{alert.message}</p>
    </div>
  );
};

export default WeatherAlert;
