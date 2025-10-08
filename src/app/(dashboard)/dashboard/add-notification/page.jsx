// pages/admin/notifications/create.jsx
import { useState } from 'react';
import { useNotification } from '../../../contexts/NotificationContext';
import AdminLayout from '../../../components/admin/AdminLayout';
import CreateNotificationForm from '../../../components/admin/notifications/CreateNotificationForm';
import NotificationPreview from '../../../components/admin/notifications/NotificationPreview';
import QuickTemplates from '../../../components/admin/notifications/QuickTemplates';
import GuidanceCard from '../../../components/admin/notifications/GuidanceCard';

export default function CreateNotificationPage() {
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    recipient: 'all',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addNotification({
        title: formData.title,
        message: formData.message,
        type: formData.type,
        recipient: formData.recipient,
        priority: formData.priority
      });

      // Reset form
      setFormData({
        title: '',
        message: '',
        type: 'info',
        recipient: 'all',
        priority: 'medium'
      });

      alert('নোটিফিকেশন সফলভাবে তৈরি করা হয়েছে!');
    } catch (error) {
      console.error('Error creating notification:', error);
      alert('নোটিফিকেশন তৈরি করতে সমস্যা হয়েছে!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <PageHeader />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <CreateNotificationForm
                formData={formData}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onFormDataChange={updateFormData}
              />
            </div>

            {/* Sidebar Section */}
            <div className="space-y-6">
              <NotificationPreview formData={formData} />
              <GuidanceCard />
              <QuickTemplates onTemplateSelect={updateFormData} />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// Page Header Component
function PageHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800">নতুন নোটিফিকেশন</h1>
          <p className="text-gray-600 mt-2">ব্যবহারকারীদের জন্য নতুন নোটিফিকেশন তৈরি করুন</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm text-green-800 font-medium">লাইভ প্রিভিউ</span>
          </div>
        </div>
      </div>
    </div>
  );
}