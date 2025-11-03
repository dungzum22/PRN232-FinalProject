import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAuth } from './AuthContext';
import { Notification } from '../types';
import * as signalrService from '../lib/signalr';
import * as api from '../lib/api';
import { toast } from 'sonner';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isConnected: boolean;
  connectionState: signalR.HubConnectionState;
  loadNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [connectionState, setConnectionState] = useState<signalR.HubConnectionState>(
    signalR.HubConnectionState.Disconnected
  );

  // Load notifications from API
  const loadNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      return;
    }

    try {
      const data = await api.getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error('Failed to load notifications:', err);
    }
  }, [user]);

  // Mark notification as read
  const markAsRead = useCallback(async (id: string) => {
    try {
      await api.markNotificationAsRead(id);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error('Failed to mark as read:', err);
      toast.error('Failed to mark notification as read');
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      await Promise.all(unreadNotifications.map(n => api.markNotificationAsRead(n.id)));
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast.success('All notifications marked as read');
    } catch (err) {
      console.error('Failed to mark all as read:', err);
      toast.error('Failed to mark all as read');
    }
  }, [notifications]);

  // Delete notification
  const deleteNotification = useCallback(async (id: string) => {
    try {
      await api.deleteNotification(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      toast.success('Notification deleted');
    } catch (err) {
      console.error('Failed to delete notification:', err);
      toast.error('Failed to delete notification');
    }
  }, []);

  // Refresh notifications
  const refreshNotifications = useCallback(async () => {
    await loadNotifications();
  }, [loadNotifications]);

  // Setup SignalR connection when user logs in
  useEffect(() => {
    if (!user) {
      // Cleanup connection when user logs out
      if (connection) {
        signalrService.leaveUserGroup(connection, user?.id || '').catch(console.error);
        signalrService.stopConnection(connection).catch(console.error);
        setConnection(null);
        setConnectionState(signalR.HubConnectionState.Disconnected);
      }
      setNotifications([]);
      return;
    }

    // Create and start connection
    const newConnection = signalrService.createNotificationConnection();

    // Setup connection state change handlers
    newConnection.onreconnecting(() => {
      console.log('🔄 SignalR Reconnecting...');
      setConnectionState(signalR.HubConnectionState.Reconnecting);
    });

    newConnection.onreconnected(async () => {
      console.log('✅ SignalR Reconnected');
      setConnectionState(signalR.HubConnectionState.Connected);
      // Rejoin user group after reconnection
      if (user) {
        await signalrService.joinUserGroup(newConnection, user.id);
      }
    });

    newConnection.onclose(() => {
      console.log('🛑 SignalR Connection Closed');
      setConnectionState(signalR.HubConnectionState.Disconnected);
    });

    // Setup notification handler
    signalrService.onReceiveNotification(newConnection, (notification) => {
      console.log('📬 New notification received:', notification);
      
      // Add new notification to the list
      const newNotif: Notification = {
        id: notification.id.toString(),
        userId: user.id,
        title: getNotificationTitle(notification.type),
        message: notification.message,
        type: mapNotificationType(notification.type),
        read: false,
        createdAt: notification.createdAt,
      };

      setNotifications(prev => [newNotif, ...prev]);

      // Show toast notification
      toast.success(notification.message, {
        description: new Date(notification.createdAt).toLocaleString(),
        duration: 5000,
      });
    });

    // Start connection and join user group
    const initConnection = async () => {
      try {
        await signalrService.startConnection(newConnection);
        setConnectionState(signalR.HubConnectionState.Connected);
        await signalrService.joinUserGroup(newConnection, user.id);
        setConnection(newConnection);
        
        // Load initial notifications
        await loadNotifications();
      } catch (err) {
        console.error('Failed to initialize SignalR connection:', err);
        setConnectionState(signalR.HubConnectionState.Disconnected);
      }
    };

    initConnection();

    // Cleanup on unmount
    return () => {
      if (newConnection) {
        signalrService.leaveUserGroup(newConnection, user.id).catch(console.error);
        signalrService.stopConnection(newConnection).catch(console.error);
      }
    };
  }, [user, loadNotifications]);

  // Helper function to get notification title based on type
  const getNotificationTitle = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'order':
        return 'Order Update';
      case 'promo':
        return 'Special Offer';
      case 'system':
        return 'System Notification';
      default:
        return 'Notification';
    }
  };

  // Helper function to map backend type to frontend type
  const mapNotificationType = (type: string): 'order' | 'system' | 'promo' => {
    const lowerType = type.toLowerCase();
    if (lowerType === 'order') return 'order';
    if (lowerType === 'promo') return 'promo';
    return 'system';
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const isConnected = connectionState === signalR.HubConnectionState.Connected;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isConnected,
        connectionState,
        loadNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

