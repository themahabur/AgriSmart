import React from "react";

const KnowledgeFilterButtons = ({
  setActiveCategory,
  category,
  activeCategory,
}) => {
  return (
    <button
      onClick={() => setActiveCategory(category)}
      className={`btn font-hind text-sm ${
        activeCategory === category
          ? "btn-primary"
          : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300 shadow-md"
      }`}
    >
      {category}
    </button>
  );
};

export default KnowledgeFilterButtons;
