# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
## Hệ thống Thương mại Điện tử Cửa hàng Bánh ngọt

---

## **1. TỔNG QUAN DỰ ÁN**

### **1.1 Tên dự án**
PRN232 Final Project - Bakery E-commerce System

### **1.2 Mô tả tổng quan**
Hệ thống thương mại điện tử chuyên bán các sản phẩm bánh ngọt, bánh mì và đồ tráng miệng với kiến trúc microservices, hỗ trợ đặt hàng online và thanh toán qua VNPay.

### **1.3 Mục đích**
- Tạo ra một nền tảng thương mại điện tử hiện đại cho cửa hàng bánh ngọt
- Cho phép khách hàng duyệt, tìm kiếm và đặt mua sản phẩm trực tuyến
- Cung cấp giao diện quản trị cho việc quản lý sản phẩm, đơn hàng và khách hàng
- Tích hợp thanh toán online và quản lý giỏ hàng thông minh

### **1.4 Phạm vi dự án**
- **Frontend**: Giao diện người dùng và quản trị viên
- **Backend**: Hệ thống API microservices
- **Database**: Quản lý dữ liệu sản phẩm, đơn hàng, khách hàng
- **Payment**: Tích hợp VNPay cho thanh toán online
- **Notification**: Hệ thống thông báo real-time

---

## **2. MÔ TẢ SẢN PHẨM KINH DOANH**

### **2.1 Loại hình kinh doanh**
**Cửa hàng bánh ngọt (Bakery Shop)** chuyên cung cấp:
- Bánh mì tươi nướng
- Bánh ngọt và bánh kem
- Đồ tráng miệng cao cấp
- Sản phẩm đặc biệt theo mùa

### **2.2 Danh mục sản phẩm**

#### **2.2.1 BREAD (Bánh mì)**
- **Croissant**: Bánh sừng bò Pháp cổ điển với lớp bơ thơm ngon
- **Golden Lava Bun**: Bánh mì mềm nhân kem trứng sữa
- **Gourmet Fruit Loaf**: Bánh mì trái cây với các loại hạt khô
- **Sausage Standard**: Bánh mì xúc xích cổ điển
- **Spring In The City**: Bánh mì theo mùa với hương vị mùa xuân

#### **2.2.2 CAKE SLICE (Bánh kem cắt lát)**
- **Berry Choco**: Bánh chocolate với topping trái cây tươi
- **Brownie Cheese Sliced**: Cheesecake kem với lớp brownie
- **Bunny**: Bánh kem hình thỏ với hương vani
- **Chocolate Peanut Mousse**: Bánh mousse chocolate với đậu phộng
- **Les Opera Sliced**: Bánh Opera Pháp với cà phê và chocolate
- **Oreo Chocolate Cheese**: Cheesecake chocolate với topping Oreo

#### **2.2.3 SAVORY (Bánh mặn)**
- **Chocolate Bun**: Bánh mì mềm nhân chocolate
- **Chocolate Croissant**: Croissant nhân chocolate đậm đà
- **Goma Croissant**: Croissant kiểu Nhật với hương vị mè
- **Matcha Bun**: Bánh mì trà xanh với nhân đậu đỏ
- **Ultimate Choco Croissant**: Croissant chocolate đặc biệt
- **White Choco Croissant**: Croissant nhân chocolate trắng

#### **2.2.4 SPECIAL (Sản phẩm đặc biệt)**
- **Les Opera**: Bánh Opera Pháp sang trọng nhiều lớp
- **MangoCoCo Cake**: Bánh kem xoài và dừa nhiệt đới
- **Party Pink**: Bánh kem hồng rực rỡ cho tiệc tùng
- **Passion Cheese**: Cheesecake chanh dây chua ngọt
- **Rainbow**: Bánh kem cầu vồng nhiều lớp
- **Snowy Fruity**: Bánh kem mùa đông với lớp trái cây
- **Tiramisu**: Tiramisu Ý cổ điển với cà phê và mascarpone

#### **2.2.5 SWEET (Đồ ngọt)**
- **Chocolate Donut**: Donut mềm phủ chocolate
- **Croffle Chocolate Black**: Croffle chocolate đen giòn tan
- **Croffle Chocolate White**: Croffle phủ chocolate trắng
- **Flan Cake**: Bánh flan caramel kem
- **Japan Light Cheese**: Cheesecake Nhật Bản mềm mịn

### **2.3 Đặc điểm sản phẩm**
- **Giá cả**: Từ $2.99 - $8.99
- **Tồn kho**: Quản lý số lượng có sẵn
- **Hình ảnh**: Mỗi sản phẩm có hình ảnh chất lượng cao
- **Mô tả**: Chi tiết về thành phần và hương vị
- **Tình trạng**: Có sẵn/Không có sẵn

---

## **3. YÊU CẦU CHỨC NĂNG**

### **3.1 Chức năng cho Khách hàng**

#### **3.1.1 Quản lý tài khoản**
- **FR-001**: Đăng ký tài khoản mới
- **FR-002**: Đăng nhập hệ thống
- **FR-003**: Đăng xuất tài khoản
- **FR-004**: Quản lý thông tin cá nhân
- **FR-005**: Đổi mật khẩu
- **FR-006**: Quên mật khẩu

#### **3.1.2 Duyệt sản phẩm**
- **FR-007**: Xem danh sách sản phẩm theo danh mục
- **FR-008**: Tìm kiếm sản phẩm theo tên
- **FR-009**: Lọc sản phẩm theo giá (min-max)
- **FR-010**: Lọc sản phẩm theo danh mục
- **FR-011**: Xem chi tiết sản phẩm
- **FR-012**: Xem hình ảnh sản phẩm

#### **3.1.3 Quản lý giỏ hàng**
- **FR-013**: Thêm sản phẩm vào giỏ hàng
- **FR-014**: Xem giỏ hàng
- **FR-015**: Cập nhật số lượng sản phẩm
- **FR-016**: Xóa sản phẩm khỏi giỏ hàng
- **FR-017**: Kiểm tra tồn kho tự động
- **FR-018**: Tính tổng tiền giỏ hàng

#### **3.1.4 Đặt hàng và thanh toán**
- **FR-019**: Tạo đơn hàng mới
- **FR-020**: Chọn phương thức thanh toán (COD/VNPay)
- **FR-021**: Thanh toán qua VNPay
- **FR-022**: Xác nhận đơn hàng
- **FR-023**: Xem lịch sử đơn hàng
- **FR-024**: Xem chi tiết đơn hàng

#### **3.1.5 Đánh giá và phản hồi**
- **FR-025**: Đánh giá sản phẩm
- **FR-026**: Viết bình luận về sản phẩm
- **FR-027**: Xem đánh giá của khách hàng khác

### **3.2 Chức năng cho Quản trị viên**

#### **3.2.1 Quản lý sản phẩm**
- **FR-028**: Thêm sản phẩm mới
- **FR-029**: Cập nhật thông tin sản phẩm
- **FR-030**: Xóa sản phẩm
- **FR-031**: Quản lý tồn kho sản phẩm
- **FR-032**: Cập nhật trạng thái sản phẩm

#### **3.2.2 Quản lý danh mục**
- **FR-033**: Thêm danh mục mới
- **FR-034**: Cập nhật danh mục
- **FR-035**: Xóa danh mục
- **FR-036**: Xem danh sách danh mục

#### **3.2.3 Quản lý đơn hàng**
- **FR-037**: Xem danh sách đơn hàng
- **FR-038**: Cập nhật trạng thái đơn hàng
- **FR-039**: Xem chi tiết đơn hàng
- **FR-040**: Quản lý đơn hàng theo trạng thái

#### **3.2.4 Quản lý khách hàng**
- **FR-041**: Xem danh sách khách hàng
- **FR-042**: Xem thông tin chi tiết khách hàng
- **FR-043**: Khóa/mở khóa tài khoản khách hàng

#### **3.2.5 Quản lý phản hồi**
- **FR-044**: Xem danh sách đánh giá
- **FR-045**: Xóa đánh giá không phù hợp
- **FR-046**: Phản hồi đánh giá khách hàng

---

## **4. YÊU CẦU PHI CHỨC NĂNG**

### **4.1 Yêu cầu hiệu suất**
- **NFR-001**: Thời gian phản hồi API < 2 giây
- **NFR-002**: Hệ thống hỗ trợ 1000 người dùng đồng thời
- **NFR-003**: Thời gian tải trang < 3 giây
- **NFR-004**: Uptime 99.5%

### **4.2 Yêu cầu bảo mật**
- **NFR-005**: Mã hóa mật khẩu bằng bcrypt
- **NFR-006**: Xác thực JWT token
- **NFR-007**: Phân quyền rõ ràng (Admin/Customer)
- **NFR-008**: Bảo vệ chống SQL Injection
- **NFR-009**: HTTPS cho tất cả giao tiếp

### **4.3 Yêu cầu khả năng sử dụng**
- **NFR-010**: Giao diện responsive trên mobile/desktop
- **NFR-011**: Hỗ trợ tiếng Việt
- **NFR-012**: Giao diện thân thiện, dễ sử dụng
- **NFR-013**: Thông báo lỗi rõ ràng

### **4.4 Yêu cầu tương thích**
- **NFR-014**: Tương thích với trình duyệt Chrome, Firefox, Safari, Edge
- **NFR-015**: Hỗ trợ thiết bị di động iOS/Android
- **NFR-016**: Tương thích với .NET Core 6.0+

---

## **5. KIẾN TRÚC HỆ THỐNG**

### **5.1 Kiến trúc tổng thể**
```
┌─────────────────┐    ┌─────────────────┐
│   UserUI        │    │   AdminUI       │
│   (MVC)         │    │   (Razor Pages) │
└─────────┬───────┘    └─────────┬───────┘
          │                      │
          └──────────┬───────────┘
                     │
          ┌─────────────────┐
          │   API Gateway   │
          │   (Ocelot)      │
          └─────────┬───────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
┌───▼───┐    ┌─────▼─────┐    ┌────▼────┐
│AuthAPI│    │UserAPI    │    │ProductAPI│
└───────┘    └───────────┘    └─────────┘
    │               │               │
┌───▼───┐    ┌─────▼─────┐    ┌────▼────┐
│CartAPI│    │OrderAPI   │    │FeedbackAPI│
└───────┘    └───────────┘    └─────────┘
    │               │               │
┌───▼───┐    ┌─────▼─────┐    ┌────▼────┐
│NotifAPI│   │SQL Server │    │SQL Server│
└───────┘    └───────────┘    └─────────┘
```

### **5.2 Công nghệ sử dụng**

#### **5.2.1 Frontend**
- **ASP.NET Core MVC** (UserUI)
- **ASP.NET Core Razor Pages** (AdminUI)
- **Bootstrap 5** (UI Framework)
- **JavaScript/jQuery** (Client-side logic)
- **SignalR** (Real-time notifications)

#### **5.2.2 Backend**
- **ASP.NET Core Web API** (.NET 6.0)
- **Entity Framework Core** (ORM)
- **SQL Server** (Database)
- **Ocelot** (API Gateway)
- **JWT Bearer Authentication**

#### **5.2.3 Payment & External Services**
- **VNPay** (Payment Gateway)
- **Email Service** (SMTP)
- **SignalR** (Real-time communication)

---

## **6. MÔ HÌNH DỮ LIỆU**

### **6.1 Các Entity chính**

#### **6.1.1 User**
```csharp
public class User
{
    public int UserId { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public string Role { get; set; } // "Admin" | "Customer"
    public string Address { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime RegistrationDate { get; set; }
}
```

#### **6.1.2 Product**
```csharp
public class Product
{
    public int ProductID { get; set; }
    public string ProductName { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public string ImageURL { get; set; }
    public bool IsAvailable { get; set; }
    public DateTime CreatedDate { get; set; }
    public int CategoryID { get; set; }
    public Category Category { get; set; }
}
```

#### **6.1.3 Category**
```csharp
public class Category
{
    public int CategoryID { get; set; }
    public string CategoryName { get; set; }
    public string Description { get; set; }
    public ICollection<Product> Products { get; set; }
}
```

#### **6.1.4 Cart**
```csharp
public class Cart
{
    public int CartID { get; set; }
    public int UserID { get; set; }
    public int ProductID { get; set; }
    public int Quantity { get; set; }
    public DateTime LastUpdated { get; set; }
    public User User { get; set; }
    public Product Product { get; set; }
}
```

#### **6.1.5 Order**
```csharp
public class Order
{
    public int OrderID { get; set; }
    public int UserID { get; set; }
    public DateTime OrderDate { get; set; }
    public string ShippingAddress { get; set; }
    public decimal TotalAmount { get; set; }
    public string OrderStatus { get; set; }
    public string PaymentMethod { get; set; }
    public string PaymentStatus { get; set; }
    public User User { get; set; }
    public ICollection<OrderDetail> OrderDetails { get; set; }
}
```

---

## **7. API SPECIFICATIONS**

### **7.1 Authentication API**
- `POST /auth/login` - Đăng nhập
- `POST /auth/register` - Đăng ký
- `POST /auth/refresh` - Làm mới token

### **7.2 Product API**
- `GET /products` - Lấy danh sách sản phẩm
- `GET /products/{id}` - Lấy chi tiết sản phẩm
- `GET /products/category/{id}` - Lấy sản phẩm theo danh mục
- `GET /products/search` - Tìm kiếm sản phẩm
- `POST /products` - Tạo sản phẩm mới (Admin)
- `PUT /products/{id}` - Cập nhật sản phẩm (Admin)
- `DELETE /products/{id}` - Xóa sản phẩm (Admin)

### **7.3 Cart API**
- `GET /cart/me` - Lấy giỏ hàng của user
- `POST /cart/add` - Thêm sản phẩm vào giỏ
- `PUT /cart/update-quantities` - Cập nhật số lượng
- `DELETE /cart/{cartId}` - Xóa sản phẩm khỏi giỏ

### **7.4 Order API**
- `GET /OrderHistory/me` - Lấy lịch sử đơn hàng
- `POST /OrderHistory/add` - Tạo đơn hàng mới
- `GET /OrderHistory/details/{orderId}` - Chi tiết đơn hàng
- `PUT /Orders/{id}/update` - Cập nhật đơn hàng (Admin)

---

## **8. GIAO DIỆN NGƯỜI DÙNG**

### **8.1 Trang chủ**
- Banner quảng cáo sản phẩm
- Danh mục sản phẩm chính
- Sản phẩm bán chạy
- Thông tin liên hệ

### **8.2 Trang sản phẩm**
- Danh sách sản phẩm với bộ lọc
- Chi tiết sản phẩm
- Hình ảnh sản phẩm
- Đánh giá và bình luận

### **8.3 Trang giỏ hàng**
- Danh sách sản phẩm đã chọn
- Cập nhật số lượng
- Tính tổng tiền
- Chuyển đến thanh toán

### **8.4 Trang thanh toán**
- Thông tin giao hàng
- Chọn phương thức thanh toán
- Xác nhận đơn hàng
- Chuyển hướng VNPay

---

## **9. TESTING STRATEGY**

### **9.1 Unit Testing**
- Test các service layer
- Test các repository methods
- Test các utility functions

### **9.2 Integration Testing**
- Test API endpoints
- Test database operations
- Test external service integration

### **9.3 User Acceptance Testing**
- Test các user flows chính
- Test responsive design
- Test cross-browser compatibility

---

## **10. DEPLOYMENT & MAINTENANCE**

### **10.1 Deployment**
- **Development**: Local development environment
- **Staging**: Testing environment
- **Production**: Azure/AWS cloud deployment

### **10.2 Monitoring**
- Application performance monitoring
- Database performance monitoring
- Error logging and tracking
- User activity analytics

### **10.3 Maintenance**
- Regular security updates
- Database backup and recovery
- Performance optimization
- Feature updates and enhancements

---

## **11. KẾT LUẬN**

Hệ thống thương mại điện tử cửa hàng bánh ngọt này được thiết kế để cung cấp trải nghiệm mua sắm trực tuyến hiện đại và tiện lợi cho khách hàng, đồng thời cung cấp công cụ quản lý hiệu quả cho quản trị viên. Với kiến trúc microservices và các tính năng thanh toán online, hệ thống có thể mở rộng và phát triển trong tương lai.

---

**Tài liệu này được tạo bởi:** Development Team  
**Ngày tạo:** 2024  
**Phiên bản:** 1.0  
**Trạng thái:** Final
