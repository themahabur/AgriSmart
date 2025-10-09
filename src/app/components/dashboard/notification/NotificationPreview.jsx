// components/admin/notifications/NotificationPreview.jsx
export default function NotificationPreview({ formData }) {
  const getTypeConfig = (type) => {
    const configs = {
      success: { icon: '✓', bg: 'bg-green-100', text: 'text-green-600' },
      warning: { icon: '⚠', bg: 'bg-yellow-100', text: 'text-yellow-600' },
      error: { icon: '!', bg: 'bg-red-100', text: 'text-red-600' },
      info: { icon: 'ℹ', bg: 'bg-blue-100', text: 'text-blue-600' },
      update: { icon: '🔄', bg: 'bg-purple-100', text: 'text-purple-600' }
    };
    return configs[type] || configs.info;
  };

  const getRecipientText = (recipient) => {
    const texts = {
      all: 'সকলের জন্য',
      farmers: 'কৃষকদের জন্য',
      experts: 'বিশেষজ্ঞদের জন্য',
      vendors: 'সরবরাহকারীদের জন্য',
      premium: 'প্রিমিয়াম সদস্যদের জন্য'
    };
    return texts[recipient] || texts.all;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      high: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'উচ্চ' },
      medium: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'মধ্যম' },
      low: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'নিম্ন' }
    };
    return configs[priority] || configs.medium;
  };

  const typeConfig = getTypeConfig(formData.type);
  const priorityConfig = getPriorityConfig(formData.priority);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold text-blue-900">লাইভ প্রিভিউ</h3>
      </div>
      <div className="p-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${typeConfig.bg} ${typeConfig.text} flex-shrink-0`}>
              {typeConfig.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 text-sm">
                {formData.title || 'নোটিফিকেশন শিরোনাম'}
              </h4>
              <p className="text-gray-600 text-sm mt-1">
                {formData.message || 'এখানে নোটিফিকেশন বার্তা দেখানো হবে...'}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  {getRecipientText(formData.recipient)}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${priorityConfig.bg} ${priorityConfig.text}`}>
                  {priorityConfig.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}