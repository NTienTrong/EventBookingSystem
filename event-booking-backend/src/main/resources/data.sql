-- Thêm tài khoản admin cố định
-- Mật khẩu: Admin@123 (đã được mã hóa bằng BCrypt)
INSERT INTO users (username, email, password, full_name, role, created_at, updated_at)
VALUES (
    'admin',
    'admin@eventbooking.com',
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', -- Mật khẩu: Admin@123
    'System Administrator',
    'ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT (username) DO NOTHING; 