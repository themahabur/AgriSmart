'use client';
import React from 'react';

const KnowledgeFilterButtons = ({ setActiveCategory, category, activeCategory }) => {
  const isActive = activeCategory === category;
  
  return (
    <button
      onClick={() => setActiveCategory(category)}
      className={`
        px-6 py-2 rounded-full font-medium text-sm transition-all duration-300
        border-1 min-w-[100px] hover:scale-105
        ${isActive
          ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white border-primary'
          : 'text-gray-700 border-gray-300 hover:border-primary'
        }
      `}
    >
      {category}
    </button>
  );
};

export default KnowledgeFilterButtons;