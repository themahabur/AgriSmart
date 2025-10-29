"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { FaTimes, FaCircle, FaPaperPlane } from "react-icons/fa";

import { useSession } from "next-auth/react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChat } from "./chatProvider/ChatProvider";
import axiosInstance from "@/lib/axios";

const ChatWindow = ({ expert, onClose }) => {
  const { socket, connected, isUserOnline } = useChat();
  const { data: session } = useSession();

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  // Extract user ID from session (handles NextAuth token structure)
  const currentUserId = session?.user?.id || session?.user?._id || session?.user?.sub || session?.user?.userId;
  const accessToken = session?.accessToken || session?.user?.token || session?.user?.accessToken;

  console.log("🔍 Full session object:", session);
  console.log("🔍 Session user object:", session?.user);
  console.log("🔍 Session debug:", {
    session: !!session,
    userId: currentUserId,
    accessToken: !!accessToken,
    expertId: expert?._id,
    expertName: expert?.name,
    allUserKeys: session?.user ? Object.keys(session.user) : []
  });

  const expectedConvId = useMemo(() => {
    if (!currentUserId || !expert?._id) return null;
    return [currentUserId, expert._id].sort().join("_");
  }, [currentUserId, expert?._id]);

  // ═══════════════════════════════════════════════════════
  // Initialize conversation
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    console.log("🔄 Initializing conversation:", {
      socket: !!socket,
      currentUserId,
      expertId: expert?._id
    });

    if (!socket || !expectedConvId) {
      console.log("❌ Missing required data for conversation init");
      return;
    }

    // Generate conversation ID
    console.log("💬 Generated conversation ID:", expectedConvId);
    setConversationId(expectedConvId);

    // Join conversation room
    socket.emit("join-conversation", { otherUserId: expert._id });
    console.log("🚪 Joined conversation room");

    // No persistence: skip history load

    // Listen for new messages
    socket.on("receive-message", handleReceiveMessage);
    socket.on("message-sent", handleMessageSent);
    socket.on("user-typing", handleTypingIndicator);
    socket.on("new-message", (msg) => {
      if (msg?.conversationId === expectedConvId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receive-message", handleReceiveMessage);
      socket.off("message-sent", handleMessageSent);
      socket.off("user-typing", handleTypingIndicator);
      socket.off("new-message");
    };
  }, [socket, expectedConvId, expert._id]);

  // No history loading in socket-only mode

  // ═══════════════════════════════════════════════════════
  // Handle receiving message
  // ═══════════════════════════════════════════════════════
  const handleReceiveMessage = (messageData) => {
    console.log("📥 receive-message:", messageData, "expectedConvId:", expectedConvId, "currentUserId:", currentUserId, "expertId:", expert?._id);
    setMessages((prev) => [...prev, messageData]);

    if (socket && messageData.conversationId) {
      socket.emit("mark-read", {
        conversationId: messageData.conversationId,
        messageIds: [messageData.id],
      });
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
    // Generate conversationId if it's null (fallback)
    let convId = conversationId;
    if (!convId && currentUserId && expert?._id) {
      convId = [currentUserId, expert._id].sort().join("_");
      console.log("🔄 Generated fallback conversation ID:", convId);
    }

    if (!socket || !messageText.trim() || !convId) {
      console.log("❌ Cannot send message:", {
        socket: !!socket,
        messageText,
        conversationId: convId,
        currentUserId,
        expertId: expert?._id
      });
      return;
    }

    console.log("📤 Sending message:", { messageText, recipientId: expert._id, conversationId: convId });

    // Optimistically add to local UI
    const localMessage = {
      id: `local_${Date.now()}`,
      conversationId: convId,
      senderId: currentUserId,
      recipientId: expert._id,
      message: messageText,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages((prev) => [...prev, localMessage]);

    // Send via Socket.IO for real-time delivery
    socket.emit("send-message", {
      recipientId: expert._id,
      recipientEmail: expert.email,
      message: messageText,
      conversationId: convId,
    });

    console.log("📡 Message sent via socket");
  };

  // ═══════════════════════════════════════════════════════
  // Handle typing
  // ═══════════════════════════════════════════════════════
  const handleTyping = (isTypingNow) => {
    if (socket) {
      socket.emit("typing", {
        recipientId: expert._id,
        recipientEmail: expert.email,
        conversationId,
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
            {isUserOnline(expert._id, expert.email) && (
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
                {isUserOnline(expert._id, expert.email) ? "অনলাইন" : "অফলাইন"}
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
        otherUserId={expert._id}
      />

      {/* ─────────────────────────────────────── */}
      {/* Message Input */}
      {/* ─────────────────────────────────────── */}
      <MessageInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
    </div>
  );
};

export default ChatWindow;
