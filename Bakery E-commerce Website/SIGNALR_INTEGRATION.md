# SignalR Real-time Notification Integration

## 📋 Tổng quan

Dự án đã được tích hợp **SignalR client** để nhận thông báo real-time từ backend. Người dùng sẽ nhận được thông báo ngay lập tức khi có sự kiện mới mà không cần refresh trang.

## 🎯 Tính năng đã implement

### ✅ 1. SignalR Service Module (`src/lib/signalr.ts`)
- Tạo và quản lý SignalR connection
- Auto-reconnect với exponential backoff
- Join/Leave user notification groups
- Event handlers cho `ReceiveNotification`

### ✅ 2. NotificationContext (`src/contexts/NotificationContext.tsx`)
- Quản lý SignalR connection lifecycle
- Tự động kết nối khi user login
- Tự động disconnect khi user logout
- Lưu trữ và cập nhật danh sách notifications
- Hiển thị toast notification khi nhận message mới
- Cung cấp các methods: `markAsRead`, `markAllAsRead`, `deleteNotification`, `refreshNotifications`

### ✅ 3. NotificationsPage Updates
- Hiển thị connection status (Wifi icon)
- Real-time updates khi nhận notification mới
- Refresh button để load lại notifications
- Unread count badge

### ✅ 4. Header Component Updates
- Real-time unread notification badge
- Tự động cập nhật số lượng thông báo chưa đọc

### ✅ 5. Toast Notifications
- Hiển thị toast khi nhận notification mới
- Bao gồm message và timestamp

## 🔧 Cấu trúc Code

### SignalR Connection Flow

```
User Login
    ↓
NotificationContext khởi tạo
    ↓
Tạo SignalR connection
    ↓
Connect to: http://localhost:5000/hubs/notifications
    ↓
Join user group: "user-{userId}"
    ↓
Listen for "ReceiveNotification" event
    ↓
Nhận notification → Update state → Show toast
    ↓
User Logout → Leave group → Disconnect
```

### Backend SignalR Hub Methods

**Hub URL**: `http://localhost:5000/hubs/notifications`

**Client Methods** (gọi từ frontend):
- `JoinUserGroup(userId: int)` - Join vào group nhận notifications
- `LeaveUserGroup(userId: int)` - Leave group

**Server Events** (backend gửi đến frontend):
- `ReceiveNotification` - Event khi có notification mới
  ```typescript
  {
    id: number,
    message: string,
    type: string,  // "order" | "promo" | "system"
    createdAt: string
  }
  ```

## 📦 Dependencies

```json
{
  "@microsoft/signalr": "^8.0.7"
}
```

## 🚀 Cách sử dụng

### 1. Trong Component

```typescript
import { useNotifications } from '../contexts/NotificationContext';

function MyComponent() {
  const {
    notifications,      // Danh sách notifications
    unreadCount,        // Số lượng chưa đọc
    isConnected,        // Connection status
    markAsRead,         // Mark 1 notification as read
    markAllAsRead,      // Mark tất cả as read
    deleteNotification, // Xóa notification
    refreshNotifications // Refresh danh sách
  } = useNotifications();

  return (
    <div>
      {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
      <p>Unread: {unreadCount}</p>
    </div>
  );
}
```

### 2. Connection States

SignalR connection có các states:
- `Disconnected` - Chưa kết nối
- `Connecting` - Đang kết nối
- `Connected` - Đã kết nối (có thể nhận notifications)
- `Reconnecting` - Đang reconnect

### 3. Auto-reconnect

Connection tự động reconnect khi bị mất kết nối với exponential backoff:
- Lần 1: 0s (ngay lập tức)
- Lần 2: 2s
- Lần 3: 10s
- Lần 4+: 30s

## 🧪 Testing

### Test Real-time Notifications

1. **Start Backend**:
   ```bash
   cd backend/NotificationAPI
   dotnet run
   ```

2. **Start Frontend**:
   ```bash
   cd "Bakery E-commerce Website"
   npm run dev
   ```

3. **Login** vào ứng dụng

4. **Kiểm tra connection**:
   - Vào trang Notifications
   - Xem icon Wifi (xanh = connected, đỏ = disconnected)

5. **Test gửi notification** (từ backend hoặc Swagger):
   ```csharp
   // Gọi từ backend service
   await _hubContext.Clients.Group($"user-{userId}")
       .SendAsync("ReceiveNotification", new {
           Id = 1,
           Message = "Test notification",
           Type = "system",
           CreatedAt = DateTime.UtcNow
       });
   ```

6. **Verify**:
   - Toast notification xuất hiện
   - Notification badge ở header tăng lên
   - Notification xuất hiện trong danh sách

## 🐛 Troubleshooting

### Connection không thành công

1. **Kiểm tra backend đang chạy**:
   ```bash
   curl http://localhost:5000/hubs/notifications
   ```

2. **Kiểm tra console logs**:
   - Mở DevTools → Console
   - Tìm messages: "✅ SignalR Connected" hoặc "❌ SignalR Connection Error"

3. **Kiểm tra authentication token**:
   - SignalR connection sử dụng access token từ localStorage
   - Đảm bảo user đã login và có valid token

### Không nhận được notifications

1. **Kiểm tra đã join user group chưa**:
   - Console log: "✅ Joined notification group for user {userId}"

2. **Kiểm tra backend có gửi đúng event không**:
   - Event name phải là `ReceiveNotification`
   - Payload phải có: `id`, `message`, `type`, `createdAt`

3. **Kiểm tra userId**:
   - Backend gửi đến group: `user-{userId}`
   - Frontend join group với cùng userId

## 📝 Notes

- SignalR connection chỉ được tạo khi user đã login
- Connection tự động cleanup khi user logout
- Notifications được load từ API khi connection được thiết lập
- Toast notifications có duration 5 seconds
- Connection state được expose qua `isConnected` và `connectionState`

## 🔐 Security

- Access token được gửi kèm mỗi SignalR request
- Token được lấy từ `localStorage` qua `storage.getAccessToken()`
- Backend validate token trước khi cho phép join group
- Mỗi user chỉ nhận notifications của chính họ

## 🎨 UI/UX Features

- **Real-time badge**: Số lượng unread notifications ở header
- **Connection indicator**: Wifi icon hiển thị connection status
- **Toast notifications**: Popup khi nhận notification mới
- **Auto-update**: Danh sách notifications tự động cập nhật
- **Refresh button**: Cho phép user manually refresh

## 📚 References

- [ASP.NET Core SignalR JavaScript client](https://learn.microsoft.com/en-us/aspnet/core/signalr/javascript-client)
- [@microsoft/signalr npm package](https://www.npmjs.com/package/@microsoft/signalr)

