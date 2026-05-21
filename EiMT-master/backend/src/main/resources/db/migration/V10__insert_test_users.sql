-- Insert test users (password is hashed with BCrypt)
-- admin / admin123
-- user / user123
INSERT INTO users(created_at, updated_at, username, password, name, surname, email, role)
VALUES
    (now(), now(), 'admin', '$2a$10$slYQmyNdGzin7olVN3p5aOG7VLcvxVVcqPTW9P8.0OxTfwYvT.7tq', 'Admin', 'User', 'admin@test.com', 'ADMINISTRATOR'),
    (now(), now(), 'user', '$2a$10$Dx0S3hFoXz7JrxnVCVxYgOm/uJvCBN3GxoYDXnCb1KPvvC7i2ZvZi', 'Regular', 'User', 'user@test.com', 'USER');
