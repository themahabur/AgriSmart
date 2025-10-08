// components/admin/notifications/CreateNotificationForm.jsx
import PrioritySelector from './PrioritySelector';

export default function CreateNotificationForm({
  formData,
  isSubmitting,
  onSubmit,
  onFormDataChange
}) {
  const handleInputChange = (field, value) => {
    onFormDataChange({ [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-green-700">ব্যবহারকারীদের জন্য নতুন নোটিফিকেশন তৈরি করুন</h2>
        <p className="text-green-700 text-sm mt-1">সমস্ত প্রয়োজনীয় তথ্য পূরণ করুন</p>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-6">
        {/* Title Field */}
        <FormField
          label="নোটিফিকেশন শিরোনাম *"
          type="text"
          value={formData.title}
          onChange={(value) => handleInputChange('title', value)}
          placeholder="উদাহরণ: নতুন কৃষি প্রযুক্তি আপডেট"
          required
          helperText="একটি সংক্ষিপ্ত এবং স্পষ্ট শিরোনাম লিখুন"
        />

        {/* Message Field */}
        <FormField
          label="নোটিফিকেশন বার্তা *"
          type="textarea"
          value={formData.message}
          onChange={(value) => handleInputChange('message', value)}
          placeholder="উদাহরণ: নতুন ফসল সংরক্ষণ পদ্ধতি সম্পর্কে জানতে এখনই আমাদের ব্লগ পড়ুন..."
          rows="4"
          required
          helperText="বিস্তারিত বার্তা লিখুন যা ব্যবহারকারীরা দেখবে"
        />

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Type Select */}
          <FormField
            label="নোটিফিকেশন ধরন"
            type="select"
            value={formData.type}
            onChange={(value) => handleInputChange('type', value)}
            options={[
              { value: 'info', label: 'তথ্য (Information)' },
              { value: 'success', label: 'সফলতা (Success)' },
              { value: 'warning', label: 'সতর্কতা (Warning)' },
              { value: 'error', label: 'জরুরি (Urgent)' },
              { value: 'update', label: 'আপডেট (Update)' }
            ]}
          />

          {/* Recipient Select */}
          <FormField
            label="প্রাপক গ্রুপ"
            type="select"
            value={formData.recipient}
            onChange={(value) => handleInputChange('recipient', value)}
            options={[
              { value: 'all', label: 'সকল ব্যবহারকারী' },
              { value: 'farmers', label: 'শুধু কৃষকরা' },
              { value: 'experts', label: 'কৃষি বিশেষজ্ঞ' },
              { value: 'vendors', label: 'সরবরাহকারী' },
              { value: 'premium', label: 'প্রিমিয়াম সদস্য' }
            ]}
          />
        </div>

        {/* Priority Selector */}
        <PrioritySelector
          value={formData.priority}
          onChange={(value) => handleInputChange('priority', value)}
        />

        {/* Submit Buttons */}
        <FormActions isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}

// Reusable Form Field Component
function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  helperText,
  options = [],
  rows = 3
}) {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent transition-all duration-200 resize-none"
            placeholder={placeholder}
            required={required}
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-300 focus:border-transparent transition-all duration-200"
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent transition-all duration-200"
            placeholder={placeholder}
            required={required}
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {renderInput()}
      {helperText && (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
}

// Form Actions Component
function FormActions({ isSubmitting }) {
  return (
    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 font-medium"
      >
        বাতিল করুন
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>তৈরি হচ্ছে...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>নোটিফিকেশন তৈরি করুন</span>
          </>
        )}
      </button>
    </div>
  );
}