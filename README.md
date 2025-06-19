# EventBookingSystem

Hệ thống đặt vé sự kiện gồm 2 phần:
- **Backend:** Spring Boot (Java 17, MySQL)
- **Frontend:** Next.js (React 19, TypeScript)

---

## Hướng dẫn cài đặt & chạy dự án từng bước

### **Bước 1: Chuẩn bị môi trường**
- Cài đặt **Java 17** trở lên
- Cài đặt **Maven** 3.8+
- Cài đặt **Node.js** >= 18.x và **npm** >= 9.x
- Cài đặt **MySQL** 8.x và tạo database tên `event_booking`

---

### **Bước 2: Cài đặt & chạy Backend**

1. **Clone project về máy:**
   ```bash
   git clone <link-repo-cua-ban>
   cd EventBookingSystem/event-booking-backend
   ```
2. **Cấu hình database:**
   - Mở file `src/main/resources/application.properties`
   - Sửa các dòng sau cho đúng thông tin MySQL của bạn:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/event_booking?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
     spring.datasource.username=YOUR_DB_USERNAME
     spring.datasource.password=YOUR_DB_PASSWORD
     ```
3. **Chạy backend:**
   ```bash
   # Nếu dùng Maven Wrapper:
   ./mvnw spring-boot:run
   # Hoặc dùng Maven:
   mvn spring-boot:run
   ```
   - Backend sẽ chạy ở: http://localhost:8080

---

### **Bước 3: Cài đặt & chạy Frontend**

1. **Mở terminal mới, chuyển vào thư mục frontend:**
   ```bash
   cd ../event-booking-frontend
   ```
2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```
3. **Chạy frontend:**
   ```bash
   npm run dev
   ```
   - Frontend sẽ chạy ở: http://localhost:3001

---

### **Bước 4: Sử dụng hệ thống**
- Truy cập http://localhost:3001 để sử dụng giao diện người dùng.
- Đăng nhập bằng tài khoản admin hoặc tạo tài khoản mới.
- Thực hiện các chức năng đặt vé, quản lý sự kiện, v.v.

---

### **Một số lưu ý**
- Nếu gặp lỗi CORS, kiểm tra lại cấu hình backend (đã cho phép origin frontend).
- Nếu cần seed dữ liệu mẫu, xem file `event-booking-backend/src/main/resources/data.sql`.
- Đổi các thông tin cấu hình (database, email, JWT secret, ...) cho phù hợp môi trường của bạn.

---

### **Cấu trúc thư mục**

```
EventBookingSystem/
  ├── event-booking-backend/   # Spring Boot backend
  └── event-booking-frontend/  # Next.js frontend
```