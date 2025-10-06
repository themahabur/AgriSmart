"use client";

import ChatInput from "@/app/components/dashboard/chatbot/ChatInput";
import ChatMessage from "@/app/components/dashboard/chatbot/ChatMessage";
import { useState, useRef, useEffect } from "react";

const AiChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "আসসালামু আলাইকুম! আমি এগ্রিস্মার্ট সহায়ক। আপনার ফসল বা মাটি সম্পর্কিত কোনো প্রশ্ন বা ছবি থাকলে আমাকে পাঠান।",
    },
  ]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async(e) => {
    e.preventDefault();
    if ((!input.trim() && !imageFile) || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setImageFile(null);
    setIsLoading(true);

    // Real AI response
try {
  const res = await fetch("/api/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: input }),
  });
  const data = await res.json();

  const aiResponse = {
    id: Date.now() + 1,
    sender: "ai",
    text: data.answer || "দুঃখিত, আমি এখন উত্তর দিতে পারছি না। পরে আবার চেষ্টা করুন।",
  };
  setMessages((prev) => [...prev, aiResponse]);
} catch (error) {
  console.error("AI error:", error);
  const aiResponse = {
    id: Date.now() + 1,
    sender: "ai",
    text: "AI response failed. Please try again later.",
  };
  setMessages((prev) => [...prev, aiResponse]);
} finally {
  setIsLoading(false);
}

  };

  return (
    <div className="font-hind flex flex-col h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      <header className="px-4 md:px-8 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-dark">
          এগ্রিবট চ্যাট (AgriBot Chat)
        </h1>
        <p className="text-gray-600 text-sm">আপনার স্মার্ট কৃষি সহায়ক</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex-shrink-0"></div>
              <div className="px-5 py-3 rounded-2xl shadow-sm bg-white border border-gray-200">
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

      <ChatInput
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
        imageFile={imageFile}
        setImageFile={setImageFile}
      />
    </div>
  );
};

export default AiChat;
