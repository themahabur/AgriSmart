"use client";

import React, { useState, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";

const MessageInput = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState("");
  const typingTimeoutRef = useRef(null);

  // ═══════════════════════════════════════════════════════
  // Handle input change
  // ═══════════════════════════════════════════════════════
  const handleChange = (e) => {
    setMessage(e.target.value);

    // Emit typing indicator
    if (onTyping) {
      onTyping(true);

      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Stop typing after 1 second of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false);
      }, 1000);
    }
  };

  // ═══════════════════════════════════════════════════════
  // Handle send message
  // ═══════════════════════════════════════════════════════
  const handleSend = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSendMessage(message.trim());
    setMessage("");

    // Stop typing indicator
    if (onTyping) {
      onTyping(false);
    }

    // Clear timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  // ═══════════════════════════════════════════════════════
  // Handle Enter key
  // ═══════════════════════════════════════════════════════
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="p-4 bg-white border-t border-gray-200 rounded-b-2xl"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="আপনার বার্তা লিখুন..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-hind"
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={!message.trim()}
          className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
        >
          <FaPaperPlane className="text-xl" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
