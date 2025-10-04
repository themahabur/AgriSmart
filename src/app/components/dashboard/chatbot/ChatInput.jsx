"use client";

import { useRef } from "react";
import { IoSend, IoImageOutline, IoClose } from "react-icons/io5";

/**
 * A controlled component for the chat input form.
 * @param {object} props
 * @param {string} props.input - The current value of the text input.
 * @param {Function} props.setInput - Function to set the text input value.
 * @param {Function} props.handleSendMessage - The form submission handler.
 * @param {boolean} props.isLoading - Whether the AI is currently "thinking".
 * @param {File | null} props.imageFile - The selected image file.
 * @param {Function} props.setImageFile - Function to set the image file.
 */
const ChatInput = ({
  input,
  setInput,
  handleSendMessage,
  isLoading,
  imageFile,
  setImageFile,
}) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <footer className="px-4 md:px-8 py-4 bg-white/90 backdrop-blur-md border-t border-gray-200 sticky bottom-0 z-10">
      {imageFile && (
        <div className="relative w-fit mb-3 p-2 border border-gray-200 rounded-lg bg-gray-50">
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="h-20 w-20 object-cover rounded-md"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
            aria-label="Remove image"
          >
            <IoClose size={14} />
          </button>
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 md:gap-4"
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          disabled={isLoading}
          className="p-3 text-gray-500 hover:text-green-600 rounded-full hover:bg-green-100 transition-colors disabled:opacity-50"
          aria-label="Add photo"
        >
          <IoImageOutline size={24} />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="এখানে আপনার প্রশ্ন লিখুন..."
          className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-lg disabled:bg-gray-100"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={(!input.trim() && !imageFile) || isLoading}
          className="group flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold p-4 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          aria-label="Send message"
        >
          <IoSend className="w-5 h-5 transition-transform" />
        </button>
      </form>
    </footer>
  );
};

export default ChatInput;
