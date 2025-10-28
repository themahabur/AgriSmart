"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaCircle, FaPaperPlane } from "react-icons/fa";
import { useChat } from "./ChatProvider";
import { useSession } from "next-auth/react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatWindow = ({ expert, onClose }) => {
  const { socket, connected } = useChat();
  const { data: session } = useSession();

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  const currentUserId = session?.user?.id || session?.user?._id;

  // ═══════════════════════════════════════════════════════
  // Initialize conversation
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    if (!socket || !currentUserId || !expert._id) return;

    // Generate conversation ID
    const convId = [currentUserId, expert._id].sort().join("_");
    setConversationId(convId);

    // Join conversation room
    socket.emit("join-conversation", { otherUserId: expert._id });

    // Load chat history from REST API
    loadChatHistory(convId);

    // Listen for new messages
    socket.on("receive-message", handleReceiveMessage);
    socket.on("message-sent", handleMessageSent);
    socket.on("user-typing", handleTypingIndicator);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
      socket.off("message-sent", handleMessageSent);
      socket.off("user-typing", handleTypingIndicator);
    };
  }, [socket, currentUserId, expert._id]);

  // ═══════════════════════════════════════════════════════
  // Load chat history from REST API
  // ═══════════════════════════════════════════════════════
  const loadChatHistory = async (convId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages?conversationId=${convId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          setMessages(data.data.messages || []);
        }
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  // ═══════════════════════════════════════════════════════
  // Handle receiving message
  // ═══════════════════════════════════════════════════════
  const handleReceiveMessage = (messageData) => {
    // Only add if it's from the current conversation
    if (messageData.senderId === expert._id) {
      setMessages((prev) => [...prev, messageData]);

      // Mark as read
      if (socket) {
        socket.emit("mark-read", {
          conversationId: messageData.conversationId,
          messageIds: [messageData.id],
        });
      }
    }
  };

  // ═══════════════════════════════════════════════════════
  // Handle message sent confirmation
  // ═══════════════════════════════════════════════════════
  const handleMessageSent = (messageData) => {
    setMessages((prev) => [...prev, messageData]);
  };

  // ═══════════════════════════════════════════════════════
  // Handle typing indicator
  // ═══════════════════════════════════════════════════════
  const handleTypingIndicator = ({ userId, isTyping: typing }) => {
    if (userId === expert._id) {
      setIsTyping(typing);

      // Auto-hide typing indicator after 3 seconds
      if (typing) {
        setTimeout(() => setIsTyping(false), 3000);
      }
    }
  };

  // ═══════════════════════════════════════════════════════
  // Send message
  // ═══════════════════════════════════════════════════════
  const handleSendMessage = async (messageText) => {
    if (!socket || !messageText.trim() || !conversationId) return;

    // 1. Save to database via REST API
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify({
            recipientId: expert._id,
            message: messageText,
            conversationId: conversationId,
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to save message to database");
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }

    // 2. Send via Socket.IO for real-time delivery
    socket.emit("send-message", {
      recipientId: expert._id,
      message: messageText,
      conversationId: conversationId,
    });
  };

  // ═══════════════════════════════════════════════════════
  // Handle typing
  // ═══════════════════════════════════════════════════════
  const handleTyping = (isTypingNow) => {
    if (socket) {
      socket.emit("typing", {
        recipientId: expert._id,
        isTyping: isTypingNow,
      });
    }
  };

  // ═══════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════
  return (
    <div className="fixed bottom-4 right-4 w-full max-w-md h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-slideIn">
      {/* ─────────────────────────────────────── */}
      {/* Chat Header */}
      {/* ─────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-600 font-bold border-2 border-white">
              {expert.name?.charAt(0) || "ব"}
            </div>
            {connected && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-green-600"></div>
            )}
          </div>

          {/* Expert Info */}
          <div>
            <h3 className="text-white font-bold font-hind">{expert.name}</h3>
            <div className="flex items-center gap-1.5">
              <FaCircle
                className={`text-xs ${
                  connected ? "text-green-300" : "text-gray-300"
                }`}
              />
              <span className="text-xs text-green-50 font-hind">
                {connected ? "অনলাইন" : "অফলাইন"}
              </span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <FaTimes className="text-xl" />
        </button>
      </div>

      {/* ─────────────────────────────────────── */}
      {/* Messages List */}
      {/* ─────────────────────────────────────── */}
      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        isTyping={isTyping}
        expertName={expert.name}
      />

      {/* ─────────────────────────────────────── */}
      {/* Message Input */}
      {/* ─────────────────────────────────────── */}
      <MessageInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
    </div>
  );
};

export default ChatWindow;
