"use client";

import React, { useEffect, useRef } from "react";

const MessageList = ({
  messages,
  currentUserId,
  isTyping,
  expertName,
  otherUserId,
}) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // 🔥 Helper function to normalize IDs for comparison
  const normalizeId = (id) => {
    if (!id) return "";
    // Convert to string and trim
    return String(id).trim();
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-green-50/30 to-amber-50/30 scrollbar-thin">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-gray-500 font-hind">কোন বার্তা নেই</p>
            <p className="text-sm text-gray-400 font-hind mt-2">
              কথোপকথন শুরু করতে একটি বার্তা পাঠান
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, index) => {
            // 🔥 Normalize IDs before comparison
            const normalizedSenderId = normalizeId(msg?.senderId);
            const normalizedCurrentUserId = normalizeId(currentUserId);
            const isSentByMe = normalizedSenderId === normalizedCurrentUserId;

            return (
              <div
                key={msg.id || index}
                className={`flex ${
                  !isSentByMe ? "justify-start" : "justify-end"
                } animate-slideIn`}
              >
                <div
                  className={`max-w-[75%] ${
                    isSentByMe ? "order-2" : "order-1"
                  }`}
                >
                  {/* Message Bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      isSentByMe
                        ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-br-none"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p className="break-words font-hind text-sm leading-relaxed">
                      {msg.message}
                    </p>
                  </div>

                  {/* Timestamp */}
                  <p
                    className={`text-xs text-gray-400 mt-1 px-2 font-hind ${
                      isSentByMe ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.timestamp
                      ? new Date(msg.timestamp).toLocaleTimeString("bn-BD", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : new Date(msg.createdAt).toLocaleTimeString("bn-BD", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    {/* 🔍 Debug badge (remove in production) */}
                    {msg.pending && (
                      <span className="ml-2 text-yellow-500">⏳</span>
                    )}
                    {msg.dbSaved && (
                      <span className="ml-2 text-green-500">✓</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-slideIn">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-5 py-3 shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default MessageList;
