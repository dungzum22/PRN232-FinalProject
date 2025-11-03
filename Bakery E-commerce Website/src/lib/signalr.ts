import * as signalR from '@microsoft/signalr';
import { storage } from './storage';

const HUB_URL = 'http://localhost:5000/hubs/notifications';

export interface SignalRNotification {
  id: number;
  message: string;
  type: string;
  createdAt: string;
}

/**
 * Create and configure a SignalR connection to the notification hub
 */
export const createNotificationConnection = (): signalR.HubConnection => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(HUB_URL, {
      accessTokenFactory: () => {
        const token = storage.getAccessToken();
        return token || '';
      },
      skipNegotiation: false,
      transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
    })
    .withAutomaticReconnect({
      nextRetryDelayInMilliseconds: (retryContext) => {
        // Exponential backoff: 0s, 2s, 10s, 30s, then 30s
        if (retryContext.previousRetryCount === 0) {
          return 0;
        } else if (retryContext.previousRetryCount === 1) {
          return 2000;
        } else if (retryContext.previousRetryCount === 2) {
          return 10000;
        } else {
          return 30000;
        }
      },
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();

  return connection;
};

/**
 * Start the SignalR connection with error handling
 */
export const startConnection = async (
  connection: signalR.HubConnection
): Promise<void> => {
  try {
    await connection.start();
    console.log('✅ SignalR Connected');
  } catch (err) {
    console.error('❌ SignalR Connection Error:', err);
    throw err;
  }
};

/**
 * Stop the SignalR connection gracefully
 */
export const stopConnection = async (
  connection: signalR.HubConnection
): Promise<void> => {
  try {
    await connection.stop();
    console.log('🛑 SignalR Disconnected');
  } catch (err) {
    console.error('❌ SignalR Disconnection Error:', err);
  }
};

/**
 * Join a user-specific notification group
 */
export const joinUserGroup = async (
  connection: signalR.HubConnection,
  userId: string
): Promise<void> => {
  try {
    if (connection.state === signalR.HubConnectionState.Connected) {
      await connection.invoke('JoinUserGroup', parseInt(userId));
      console.log(`✅ Joined notification group for user ${userId}`);
    } else {
      console.warn('⚠️ Cannot join group: Connection not established');
    }
  } catch (err) {
    console.error('❌ Error joining user group:', err);
    throw err;
  }
};

/**
 * Leave a user-specific notification group
 */
export const leaveUserGroup = async (
  connection: signalR.HubConnection,
  userId: string
): Promise<void> => {
  try {
    if (connection.state === signalR.HubConnectionState.Connected) {
      await connection.invoke('LeaveUserGroup', parseInt(userId));
      console.log(`✅ Left notification group for user ${userId}`);
    }
  } catch (err) {
    console.error('❌ Error leaving user group:', err);
  }
};

/**
 * Register a handler for receiving notifications
 */
export const onReceiveNotification = (
  connection: signalR.HubConnection,
  handler: (notification: SignalRNotification) => void
): void => {
  connection.on('ReceiveNotification', handler);
};

/**
 * Remove the notification handler
 */
export const offReceiveNotification = (
  connection: signalR.HubConnection
): void => {
  connection.off('ReceiveNotification');
};

/**
 * Get the current connection state
 */
export const getConnectionState = (
  connection: signalR.HubConnection
): signalR.HubConnectionState => {
  return connection.state;
};

/**
 * Check if connection is active
 */
export const isConnected = (connection: signalR.HubConnection): boolean => {
  return connection.state === signalR.HubConnectionState.Connected;
};

