// components/admin/notifications/QuickTemplates.jsx
export default function QuickTemplates({ onTemplateSelect }) {
  const templates = [
    {
      title: 'সিস্টেম আপডেট',
      message: 'AgriSmart সিস্টেমের নতুন আপডেট উপলব্ধ। নতুন ফিচারগুলো দেখতে এখনই চেক করুন।',
      type: 'update'
    },
    {
      title: 'কৃষি পরামর্শ',
      message: 'বর্ষা মৌসুমের জন্য নতুন কৃষি পরামর্শ উপলব্ধ। এখনই পড়ুন এবং প্রয়োগ করুন।',
      type: 'info'
    },
    {
      title: 'জরুরি সতর্কতা',
      message: 'আগামী ২৪ ঘন্টায় ভারী বৃষ্টিপাতের সম্ভাবনা। ফসল সুরক্ষার ব্যবস্থা নিন।',
      type: 'warning'
    }
  ];

  const handleTemplateSelect = (template) => {
    onTemplateSelect({
      title: template.title,
      message: template.message,
      type: template.type
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold text-purple-900">দ্রুত টেমপ্লেট</h3>
      </div>
      <div className="p-4 space-y-3">
        {templates.map((template, index) => (
          <button
            key={index}
            onClick={() => handleTemplateSelect(template)}
            className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="font-medium text-gray-900 text-sm">{template.title}</div>
            <div className="text-gray-600 text-xs mt-1 line-clamp-2">{template.message}</div>
          </button>
        ))}
      </div>
    </div>
  );
}