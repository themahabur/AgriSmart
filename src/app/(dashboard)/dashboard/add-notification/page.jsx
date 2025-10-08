"use client";
import { useState } from "react";

import NotificationPreview from "@/app/components/dashboard/notification/NotificationPreview";
import GuidanceCard from "@/app/components/dashboard/notification/GuidanceCard";
import QuickTemplates from "@/app/components/dashboard/notification/QuickTemplates";
import CreateNotificationForm from "@/app/components/dashboard/notification/CreateNotificationForm";
import { useNotification } from "@/app/hooks/useNotification";
import toast from "react-hot-toast";

export default function CreateNotificationPage() {
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info",
    recipient: "all",
    priority: "medium",
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
        priority: formData.priority,
      });

      // Reset form
      setFormData({
        title: "",
        message: "",
        type: "info",
        recipient: "all",
        priority: "medium",
      });

      //   console.log(formData);
      toast.success("নোটিফিকেশন সফলভাবে তৈরি করা হয়েছে!");
    } catch (error) {
      console.error("Error creating notification:", error);
      toast.error("নোটিফিকেশন তৈরি করতে সমস্যা হয়েছে!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="h-screen bg-gray-50 py-6">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
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
          <aside className="flex-shrink-0 relative">
            <div className="h-5/6 overflow-y-auto fixed top-24 mr-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="space-y-6">
                <NotificationPreview formData={formData} />
                <GuidanceCard />
                <QuickTemplates onTemplateSelect={updateFormData} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
