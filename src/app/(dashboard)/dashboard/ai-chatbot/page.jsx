"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { IoSend } from "react-icons/io5";

const AiChat = () => {
  // State for managing the list of messages in the chat
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "আসসালামু আলাইকুম! আমি এগ্রিস্মার্টের কৃত্রিম বুদ্ধিমত্তা সহায়ক। আপনার ফসল, মাটি, বা কৃষি সংক্রান্ত যেকোনো প্রশ্ন করুন।",
    },
  ]);

  // State for the user's current input
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Ref for the chat container to enable auto-scrolling
  const chatEndRef = useRef();

  // Effect to scroll to the latest message whenever the messages array is updated
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handles the form submission when a user sends a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        sender: "ai",
        text: "আপনার বার্তা পেয়েছি। তথ্য বিশ্লেষণ করা হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন। (এটি একটি ডেমো প্রতিক্রিয়া)",
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="font-hind flex flex-col h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 ">
      {/* Header Section */}
      <header className="px-4 md:px-8 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10 ">
        <h1 className="text-2xl md:text-3xl font-bold text-[#127917]">
          এগ্রিবট চ্যাট (AgriBot Chat)
        </h1>
        <p className="text-gray-600 text-sm">আপনার স্মার্ট কৃষি সহায়ক</p>
      </header>

      {/* Chat Messages Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 overflow-hidden scrollbar-hide">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-start gap-3 max-w-xl">
              {msg.sender === "ai" && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  A
                </div>
              )}
              <div
                className={`px-5 py-3 rounded-2xl shadow-subtle leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
        {/* Loading indicator for AI response */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                A
              </div>
              <div className="px-5 py-3 rounded-2xl shadow-subtle bg-white text-gray-500 border border-gray-200 rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Message Input Form */}
      <footer className="px-4 md:px-8 py-4 bg-white/90 backdrop-blur-md border-t border-gray-200 sticky bottom-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="এখানে আপনার প্রশ্ন লিখুন..."
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="group flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold p-4 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            <IoSend className="w-5 h-5 transition-transform" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default AiChat;
