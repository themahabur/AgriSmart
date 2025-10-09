// components/admin/notifications/GuidanceCard.jsx
export default function GuidanceCard() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
      <div className="flex items-start space-x-3">
        <div className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-yellow-800 text-sm mb-2">গাইডেন্স</h4>
          <ul className="text-yellow-700 text-xs space-y-1">
            <li>• শিরোনাম সংক্ষিপ্ত এবং বোঝার মতো রাখুন</li>
            <li>• বার্তাটি স্পষ্ট এবং কার্যকরী করুন</li>
            <li>• সঠিক প্রাপক গ্রুপ নির্বাচন করুন</li>
            <li>• জরুরি নোটিফিকেশনের জন্য উচ্চ অগ্রাধিকার ব্যবহার করুন</li>
          </ul>
        </div>
      </div>
    </div>
  );
}