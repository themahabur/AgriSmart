// ═══════════════════════════════════════════════════════
// SOCKET.IO CLIENT CONFIGURATION
// ═══════════════════════════════════════════════════════

import { io } from "socket.io-client";

let socket = null;

/**
 * Initialize Socket.IO connection with JWT token
 */
export const initSocket = (token) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3050", {
      auth: {
        token: token, // JWT token from NextAuth
      },
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Connection event listeners
    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("🔴 Connection error:", error.message);
    });
  }

  return socket;
};

/**
 * Get existing socket instance
 */
export const getSocket = () => {
  if (!socket) {
    console.warn("⚠️ Socket not initialized. Call initSocket(token) first.");
  }
  return socket;
};

/**
 * Disconnect and cleanup socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 Socket disconnected and cleaned up");
  }
};
