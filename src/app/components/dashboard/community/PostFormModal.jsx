"use client";

import { useForm, Controller } from "react-hook-form";
import { useState, Fragment } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import RichTextEditor from "../blog/userBlog/RichTextEditor";
import { Transition, Dialog } from "@headlessui/react";
import {
  FaHeading,
  FaTags,
  FaImage,
  FaTimes,
  FaPaperPlane,
  FaSpinner,
} from "react-icons/fa";
import { useSession } from "next-auth/react";

export const PostFormModal = ({ isOpen, onClose, onPostCreated }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { title: "", content: "", tags: "" },
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [content, setContent] = useState("");
  const { data: session } = useSession();
  // console.log(session);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleClose = () => {
    // Reset form state on close
    reset();
    removeImage();
    setContent("");
    onClose();
  };

  const onSubmit = async (data) => {
    let imageUrl = "";
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.url) {
          throw new Error("Image upload failed");
        }
        console.log(uploadData);
        imageUrl = uploadData.url;
      } catch (error) {
        toast.error("ছবি আপলোড করা যায়নি।");
        return;
      }
    }

    const postPayload = {
      title: data.title,
      content: content,
      image: imageUrl,
      author: {
        id: session.user?.id,
        // name: session.user?.name,
        // email: session.user?.email,
        // avatar: session.user?.image,
      },
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      const res = await axiosInstance.post("/community", postPayload);
      if (res.data.success) {
        toast.success("পোস্ট সফলভাবে তৈরি হয়েছে!");
        onPostCreated(res.data.data);
        handleClose(); // Use the new close handler to reset everything
      }
    } catch (err) {
      toast.error("পোস্ট তৈরি করা যায়নি।");
    }
  };

  return (
    // Using Headless UI for accessible and animated modals
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 font-hind"
        onClose={handleClose}
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
        </Transition.Child>

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 sm:p-8 text-left align-middle shadow-xl transition-all">
                {/* Improved Header */}
                <Dialog.Title
                  as="div"
                  className="flex justify-between items-center mb-6"
                >
                  <h3 className="text-2xl font-bold leading-6 text-gray-900">
                    আপনার প্রশ্ন শেয়ার করুন
                  </h3>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Title Input with Icon */}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      শিরোনাম
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaHeading className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="title"
                        {...register("title", { required: "শিরোনাম প্রয়োজন" })}
                        className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="আপনার পোস্টের জন্য একটি আকর্ষণীয় শিরোনাম দিন"
                      />
                    </div>
                    {errors.title && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Rich Text Editor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      বিবরণ
                    </label>
                    <Controller
                      name="content"
                      control={control}
                      render={({ field }) => (
                        <RichTextEditor
                          field={field}
                          content={content}
                          onUpdate={setContent}
                        />
                      )}
                    />
                  </div>

                  {/* Custom File Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ছবি যোগ করুন (ঐচ্ছিক)
                    </label>
                    {!imagePreview ? (
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 flex flex-col justify-center items-center text-center hover:border-green-500 transition"
                      >
                        <FaImage className="mx-auto h-10 w-10 text-gray-300" />
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          ছবি আপলোড করুন
                        </span>
                        <span className="block text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                    ) : (
                      <div className="relative mt-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-auto max-h-60 object-contain rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/75 transition"
                        >
                          <FaTimes className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Tags Input with Icon */}
                  <div>
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ট্যাগ (কমা দিয়ে আলাদা করুন)
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaTags className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="tags"
                        {...register("tags")}
                        className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="যেমন: ধান, রোগ, সার"
                      />
                    </div>
                  </div>

                  {/* Improved Action Buttons */}
                  <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 mt-6">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed transition"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                          পোস্ট হচ্ছে...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="-ml-1 mr-2 h-5 w-5" />
                          পোস্ট করুন
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
