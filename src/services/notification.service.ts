import api from './api';

// Define notification types
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

// Define notification interface
export interface BackendNotification {
  id: string;
  userId: number;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

// Get all notifications for the current user
export const getNotifications = async (): Promise<{ notifications: BackendNotification[], unreadCount: number }> => {
  try {
    const response = await api.get('/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Mark a notification as read
export const markAsRead = async (notificationId: string): Promise<void> => {
  try {
    await api.put(`/notifications/${notificationId}/read`);
  } catch (error) {
    console.error(`Error marking notification ${notificationId} as read:`, error);
    throw error;
  }
};

// Mark all notifications as read
export const markAllAsRead = async (): Promise<void> => {
  try {
    await api.put('/notifications/read-all');
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

// Delete a notification
export const deleteNotification = async (notificationId: string): Promise<void> => {
  try {
    await api.delete(`/notifications/${notificationId}`);
  } catch (error) {
    console.error(`Error deleting notification ${notificationId}:`, error);
    throw error;
  }
};

// Get unread notification count
export const getUnreadCount = async (): Promise<number> => {
  try {
    const response = await api.get('/notifications/unread-count');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching unread notification count:', error);
    throw error;
  }
}; 