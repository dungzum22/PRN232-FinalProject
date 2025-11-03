import React, { useState, useEffect } from 'react';
import { Bell, Package, Tag, Info, Trash2, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { Card, CardContent } from '../components/styled';
import { Badge } from '../components/styled';
import { Button } from '../components/styled';
import * as S from './NotificationsPage.styled';

interface NotificationsPageProps {
  onNavigate: (page: string) => void;
}

export function NotificationsPage({ onNavigate }: NotificationsPageProps) {
  const {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refreshNotifications,
  } = useNotifications();

  const [loading, setLoading] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package style={{ color: '#3b82f6' }} />;
      case 'promo':
        return <Tag style={{ color: '#d97757' }} />;
      case 'system':
        return <Info style={{ color: '#6b7280' }} />;
      default:
        return <Bell style={{ color: '#6b7280' }} />;
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    await refreshNotifications();
    setLoading(false);
  };

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.HeaderInfo>
            <S.Title>
              Notifications
              {isConnected ? (
                <Wifi style={{ width: '1.25rem', height: '1.25rem', color: '#10b981', marginLeft: '0.5rem' }} title="Real-time connected" />
              ) : (
                <WifiOff style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444', marginLeft: '0.5rem' }} title="Disconnected" />
              )}
            </S.Title>
            {unreadCount > 0 && (
              <S.UnreadCount>
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </S.UnreadCount>
            )}
          </S.HeaderInfo>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button $variant="outline" onClick={handleRefresh} disabled={loading}>
              <RefreshCw style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
              Refresh
            </Button>
            {unreadCount > 0 && (
              <Button $variant="outline" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
        </S.Header>

        {loading ? (
          <Card>
            <CardContent>
              <S.LoadingState>
                <S.LoadingIcon>
                  <Bell />
                </S.LoadingIcon>
                <S.LoadingText>Loading notifications...</S.LoadingText>
              </S.LoadingState>
            </CardContent>
          </Card>
        ) : notifications.length > 0 ? (
          <S.NotificationsList>
            {notifications.map(notification => (
              <S.NotificationCard key={notification.id} $unread={!notification.read}>
                <S.NotificationContent>
                  <S.IconWrapper>
                    {getNotificationIcon(notification.type)}
                  </S.IconWrapper>
                  <S.NotificationBody>
                    <S.NotificationHeader>
                      <S.NotificationTitle>{notification.title}</S.NotificationTitle>
                      <S.NotificationActions>
                        {!notification.read && (
                          <Badge className="bg-blue-500">New</Badge>
                        )}
                        <Button
                          $variant="ghost"
                          $size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          style={{ height: '1.5rem', width: '1.5rem', padding: 0 }}
                        >
                          <Trash2 style={{ width: '1rem', height: '1rem', color: '#6b7280' }} />
                        </Button>
                      </S.NotificationActions>
                    </S.NotificationHeader>
                    <S.NotificationMessage>{notification.message}</S.NotificationMessage>
                    <S.NotificationFooter>
                      <S.NotificationDate>
                        {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                        {new Date(notification.createdAt).toLocaleTimeString()}
                      </S.NotificationDate>
                      {!notification.read && (
                        <Button
                          $variant="ghost"
                          $size="sm"
                          onClick={() => markAsRead(notification.id)}
                          style={{ fontSize: '0.75rem' }}
                        >
                          Mark as read
                        </Button>
                      )}
                    </S.NotificationFooter>
                  </S.NotificationBody>
                </S.NotificationContent>
              </S.NotificationCard>
            ))}
          </S.NotificationsList>
        ) : (
          <Card>
            <CardContent>
              <S.EmptyState>
                <Bell />
                <h2>No notifications</h2>
                <p>You're all caught up! Check back later for updates.</p>
              </S.EmptyState>
            </CardContent>
          </Card>
        )}
      </S.Content>
    </S.Container>
  );
}
