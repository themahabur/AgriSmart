// components/admin/notifications/PrioritySelector.jsx
export default function PrioritySelector({ value, onChange }) {
  const priorityOptions = [
    { 
      value: 'low', 
      label: 'নিম্ন', 
      color: 'bg-gray-100 text-gray-700', 
      border: 'border-gray-300',
      description: 'সাধারণ তথ্য'
    },
    { 
      value: 'medium', 
      label: 'মধ্যম', 
      color: 'bg-blue-100 text-blue-700', 
      border: 'border-blue-300',
      description: 'গুরুত্বপূর্ণ আপডেট'
    },
    { 
      value: 'high', 
      label: 'উচ্চ', 
      color: 'bg-orange-100 text-orange-700', 
      border: 'border-orange-300',
      description: 'জরুরি তথ্য'
    }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        অগ্রাধিকার স্তর
      </label>
      <div className="grid grid-cols-3 gap-3">
        {priorityOptions.map((priority) => (
          <label
            key={priority.value}
            className={`flex flex-col p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              value === priority.value 
                ? `${priority.color} ${priority.border} border-2`
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="priority"
              value={priority.value}
              checked={value === priority.value}
              onChange={(e) => onChange(e.target.value)}
              className="hidden"
            />
            <div className="text-center">
              <div className="font-medium text-sm">{priority.label}</div>
              <div className="text-xs opacity-75 mt-1">{priority.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}