// hooks/useNotification.js
import { useState, useEffect } from 'react';

export function useNotification() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications from localStorage on component mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      const parsedNotifications = JSON.parse(savedNotifications);
      setNotifications(parsedNotifications);
      
      // Calculate unread count
      const unread = parsedNotifications.filter(n => n.status === 'unread').length;
      setUnreadCount(unread);
    }
  }, []);

  // Save notifications to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // Update unread count
    const unread = notifications.filter(n => n.status === 'unread').length;
    setUnreadCount(unread);
  }, [notifications]);

  // Add new notification
  const addNotification = (notificationData) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notificationData,
      status: 'unread',
      created_at: new Date().toISOString(),
      isRead: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    return newNotification;
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, status: 'read', isRead: true }
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({
        ...notification,
        status: 'read',
        isRead: true
      }))
    );
  };

  // Delete notification
  const deleteNotification = (notificationId) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications
  };
}