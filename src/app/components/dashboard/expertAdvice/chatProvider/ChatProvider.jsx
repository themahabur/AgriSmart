"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { initSocket, disconnectSocket, getSocket } from "@/lib/socket";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { data: session } = useSession();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [onlineUsersById, setOnlineUsersById] = useState(new Set());
  const [onlineUsersByEmail, setOnlineUsersByEmail] = useState(new Set());

  // ═══════════════════════════════════════════════════════
  // Initialize Socket.IO when user is authenticated
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    if (session?.accessToken) {
      const socketInstance = initSocket(session.accessToken);

      // Connect
      socketInstance.connect();

      // Listen for connection events
      socketInstance.on("connected", (data) => {
        setConnected(true);
      });

      socketInstance.on("disconnect", () => {
        setConnected(false);
        setOnlineUsersById(new Set());
        setOnlineUsersByEmail(new Set());
      });

      // Listen for online/offline status
      socketInstance.on("online-status", (payload) => {
        const byIdSet = new Set();
        const byEmailSet = new Set();

        if (payload?.byId) {
          Object.entries(payload.byId).forEach(([userId, isOnline]) => {
            if (isOnline) byIdSet.add(userId);
          });
        } else if (payload && typeof payload === "object") {
          // legacy shape: { userId: true }
          Object.entries(payload).forEach(([userId, isOnline]) => {
            if (isOnline) byIdSet.add(userId);
          });
        }

        if (payload?.byEmail) {
          Object.entries(payload.byEmail).forEach(([email, isOnline]) => {
            if (isOnline) byEmailSet.add(email);
          });
        }

        setOnlineUsersById(byIdSet);
        setOnlineUsersByEmail(byEmailSet);
      });

      // Incremental updates when a user goes online
      socketInstance.on("user-online", ({ userId, userEmail }) => {
        console.log("🟢 User came online:", userId, userEmail);
        setOnlineUsersById((prev) => {
          const next = new Set(prev);
          next.add(userId);
          return next;
        });
        if (userEmail) {
          setOnlineUsersByEmail((prev) => {
            const next = new Set(prev);
            next.add(userEmail);
            return next;
          });
        }
      });

      socketInstance.on("user-offline", ({ userId, userEmail }) => {
        console.log("🔴 User went offline:", userId, userEmail);
        setOnlineUsersById((prev) => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
        if (userEmail) {
          setOnlineUsersByEmail((prev) => {
            const newSet = new Set(prev);
            newSet.delete(userEmail);
            return newSet;
          });
        }
      });

      setSocket(socketInstance);

      // Cleanup on unmount
      return () => {
        disconnectSocket();
        setConnected(false);
        setOnlineUsersById(new Set());
        setOnlineUsersByEmail(new Set());
      };
    }
  }, [session]);

  // ═══════════════════════════════════════════════════════
  // Context value
  // ═══════════════════════════════════════════════════════
  const value = {
    socket,
    connected,
    onlineUsersById,
    onlineUsersByEmail,
    isUserOnline: (userId, email) =>
      (userId ? onlineUsersById.has(userId) : false) ||
      (email ? onlineUsersByEmail.has(email) : false),
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
