"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { initSocket, disconnectSocket, getSocket } from "@/lib/socket";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { data: session } = useSession();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  // ═══════════════════════════════════════════════════════
  // Initialize Socket.IO when user is authenticated
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    if (session?.user?.token) {
      const socketInstance = initSocket(session.user.token);

      // Connect
      socketInstance.connect();

      // Listen for connection events
      socketInstance.on("connected", (data) => {
        console.log("✅ Chat connected:", data);
        setConnected(true);
      });

      socketInstance.on("disconnect", () => {
        setConnected(false);
      });

      // Listen for online/offline status
      socketInstance.on("user-online", ({ userId }) => {
        setOnlineUsers((prev) => new Set(prev).add(userId));
      });

      socketInstance.on("user-offline", ({ userId }) => {
        setOnlineUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      });

      setSocket(socketInstance);

      // Cleanup on unmount
      return () => {
        disconnectSocket();
        setConnected(false);
      };
    }
  }, [session]);

  // ═══════════════════════════════════════════════════════
  // Context value
  // ═══════════════════════════════════════════════════════
  const value = {
    socket,
    connected,
    onlineUsers,
    isUserOnline: (userId) => onlineUsers.has(userId),
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
};
