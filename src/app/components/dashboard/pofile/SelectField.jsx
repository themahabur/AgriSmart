import React from 'react';



const SelectField = ({ 

  label, 

  value, 

  onChange, 

  options, 

  name, 

  required = false,

  disabled = false 

}) => {

  return (

    <div className="space-y-2">

      <label htmlFor={name} className="block text-sm font-semibold text-gray-700">

        {label} {required && <span className="text-red-500">*</span>}

      </label>

      <select

        id={name}

        name={name}

        value={value || ''}

        onChange={onChange}

        disabled={disabled}

        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${

          disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-800'

        }`}

      >

        <option value="">Select {label}</option>

        {options.map((option) => (

          <option key={option.value || option} value={option.value || option}>

            {option.label || option}

          </option>

        ))}

      </select>

    </div>

  );

};



export default SelectField;

