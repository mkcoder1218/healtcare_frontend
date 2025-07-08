import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as NotificationService from '../services/notification.service';
import type { BackendNotification } from '../services/notification.service';
import { useAuth } from './AuthContext';

// Define notification types
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

// Define frontend notification interface
export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  duration?: number; // Duration in milliseconds before auto-dismiss
}

// Define notification context type
interface NotificationContextType {
  // Frontend toast notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'isRead'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  
  // Backend notifications
  backendNotifications: BackendNotification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markBackendNotificationAsRead: (id: string) => Promise<void>;
  markAllBackendNotificationsAsRead: () => Promise<void>;
  deleteBackendNotification: (id: string) => Promise<void>;
}

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider component
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Frontend toast notifications state
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Backend notifications state
  const [backendNotifications, setBackendNotifications] = useState<BackendNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { isAuthenticated } = useAuth();

  // Add a new frontend toast notification
  const addNotification = (notification: Omit<Notification, 'id' | 'isRead'>) => {
    const id = Date.now().toString();
    const newNotification: Notification = {
      ...notification,
      id,
      isRead: false
    };

    setNotifications(prevNotifications => [...prevNotifications, newNotification]);

    // Auto-remove notification after duration (if provided)
    if (notification.duration) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration);
    }
  };

  // Remove a frontend toast notification by ID
  const removeNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  // Mark a frontend toast notification as read
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  // Clear all frontend toast notifications
  const clearAll = () => {
    setNotifications([]);
  };
  
  // Fetch backend notifications
  const fetchNotifications = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await NotificationService.getNotifications();
      setBackendNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };
  
  // Mark a backend notification as read
  const markBackendNotificationAsRead = async (id: string) => {
    try {
      await NotificationService.markAsRead(id);
      setBackendNotifications(prev => 
        prev.map(notification => 
          notification.id === id ? { ...notification, isRead: true } : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
      addNotification({
        message: 'Failed to mark notification as read',
        type: NotificationType.ERROR,
        duration: 5000
      });
    }
  };
  
  // Mark all backend notifications as read
  const markAllBackendNotificationsAsRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      setBackendNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      addNotification({
        message: 'Failed to mark all notifications as read',
        type: NotificationType.ERROR,
        duration: 5000
      });
    }
  };
  
  // Delete a backend notification
  const deleteBackendNotification = async (id: string) => {
    try {
      await NotificationService.deleteNotification(id);
      const notification = backendNotifications.find(n => n.id === id);
      setBackendNotifications(prev => prev.filter(n => n.id !== id));
      if (notification && !notification.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
      addNotification({
        message: 'Failed to delete notification',
        type: NotificationType.ERROR,
        duration: 5000
      });
    }
  };
  
  // Fetch notifications on mount and when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
      
      // Poll for new notifications every 30 seconds
      const interval = setInterval(() => {
        fetchNotifications();
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  return (
    <NotificationContext.Provider
      value={{
        // Frontend toast notifications
        notifications,
        addNotification,
        removeNotification,
        markAsRead,
        clearAll,
        
        // Backend notifications
        backendNotifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        markBackendNotificationAsRead,
        markAllBackendNotificationsAsRead,
        deleteBackendNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}; 