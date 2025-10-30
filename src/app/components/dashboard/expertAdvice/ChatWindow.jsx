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
  const currentUserId = String(session?.user?.id);
  const accessToken = session?.accessToken;

  const expectedConvId = useMemo(() => {
    if (!currentUserId || !expert?._id) return null;
    return [currentUserId, expert._id].sort().join("_");
  }, [currentUserId, expert?._id]);

  // ═══════════════════════════════════════════════════════
  // Fetch message history from REST API
  // ═══════════════════════════════════════════════════════
  const fetchMessageHistory = async () => {
    if (!expectedConvId || !accessToken) {
      console.log("❌ Cannot fetch history: missing conversationId or token");
      return;
    }

    try {
      const response = await axiosInstance.get("/messages", {
        params: { conversationId: expectedConvId },
      });

      if (response.data.status && response.data.data) {
        // Transform DB messages to match socket message format
        const formattedMessages = response.data.data.map((msg) => ({
          id: msg._id,
          conversationId: msg.conversationId,
          senderId: String(msg.senderId),
          recipientId: String(msg.recipientId),
          message: msg.message,
          timestamp: msg.createdAt || msg.timestamp,
          read: msg.isRead,
          senderName:
            String(msg.senderId) === String(currentUserId)
              ? "You"
              : expert.name,
          dbSaved: true, // Mark as from database
        }));

        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("❌ Error fetching message history:", error);
    }
  };

  // ═══════════════════════════════════════════════════════
  // Initialize conversation
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    if (!expectedConvId) {
      console.log("❌ Missing required data for conversation init");
      return;
    }

    // Generate conversation ID
    setConversationId(expectedConvId);

    // 🔥 FETCH MESSAGE HISTORY FROM DATABASE
    fetchMessageHistory();

    // Join conversation room (only if socket is connected)
    if (socket) {
      socket.emit("join-conversation", { otherUserId: expert._id });

      // Listen for new messages
      socket.on("receive-message", handleReceiveMessage);
      socket.on("message-sent", handleMessageSent);
      socket.on("user-typing", handleTypingIndicator);
      socket.on("new-message", handleNewMessage);
    }

    return () => {
      if (socket) {
        socket.off("receive-message", handleReceiveMessage);
        socket.off("message-sent", handleMessageSent);
        socket.off("user-typing", handleTypingIndicator);
        socket.off("new-message", handleNewMessage);
      }
    };
  }, [socket, expectedConvId, expert._id, accessToken]);

  // ═══════════════════════════════════════════════════════
  // Handle receiving message (avoid duplicates)
  // ═══════════════════════════════════════════════════════
  const handleReceiveMessage = (messageData) => {
    console.log("📥 receive-message:", messageData);

    setMessages((prev) => {
      // Check if message already exists (by id or timestamp)
      // const exists = prev.some(
      //   (msg) => msg.id === messageData.id ||
      //            (msg.timestamp === messageData.timestamp && msg.senderId === messageData.senderId)
      // );

      // if (exists) {
      //   console.log("⚠️ Duplicate message detected, skipping");
      //   return prev;
      // }

      return [...prev, messageData];
    });

    if (socket && messageData.conversationId) {
      socket.emit("mark-read", {
        conversationId: messageData.conversationId,
        messageIds: [messageData.id],
      });
    }
  };

  // ═══════════════════════════════════════════════════════
  // Handle message sent confirmation (avoid duplicates)
  // ═══════════════════════════════════════════════════════
  const handleMessageSent = (messageData) => {
    setMessages((prev) => {
      // Replace the local optimistic message with the server-confirmed one
      const filtered = prev.filter(
        (msg) =>
          !msg.id.startsWith("local_") || msg.message !== messageData.message
      );

      // Check if server message already exists
      const exists = filtered.some((msg) => msg.id === messageData.id);

      if (exists) {
        return filtered;
      }

      return [...filtered, messageData];
    });
  };

  // ═══════════════════════════════════════════════════════
  // Handle new message in conversation room (avoid duplicates)
  // ═══════════════════════════════════════════════════════
  const handleNewMessage = (msg) => {
    if (msg?.conversationId !== expectedConvId) {
      return; // Not for this conversation
    }

    setMessages((prev) => {
      const exists = prev.some((m) => m.id === msg.id);
      if (exists) {
        console.log("⚠️ Message already exists, skipping");
        return prev;
      }
      return [...prev, msg];
    });
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
        expertId: expert?._id,
      });
      return;
    }

    console.log("📤 Sending message:", {
      messageText,
      recipientId: expert._id,
      conversationId: convId,
    });

    // Create unique temporary ID
    const tempId = `local_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Optimistically add to local UI
    const localMessage = {
      id: tempId,
      conversationId: convId,
      senderId: currentUserId,
      recipientId: expert._id,
      message: messageText,
      timestamp: new Date().toISOString(),
      read: false,
      pending: true, // Mark as pending
    };

    setMessages((prev) => [...prev, localMessage]);

    // Send via Socket.IO for real-time delivery + DB save
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
