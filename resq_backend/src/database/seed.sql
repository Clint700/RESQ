-- Insert test users and capture IDs
INSERT INTO users (username, password) 
VALUES 
    ('testuser1', '$2b$10$K9fkxj8OzOv.U/yxV.3qAuDd8GYRlAqmO8.9/x0lYW1X6j/1IuW8.'),
    ('testuser2', '$2b$10$K9fkxj8OzOv.U/yxV.3qAuDd8GYRlAqmO8.9/x0lYW1X6j/1IuW8.')
RETURNING id;

-- Get inserted user IDs (check manually)
SELECT * FROM users;

-- Insert emergency contacts (ensure the correct IDs are used)
INSERT INTO emergency_contacts (user_id, name, phone_number) 
VALUES 
    ((SELECT id FROM users WHERE username = 'testuser1'), 'Alice', '123-456-7890'),
    ((SELECT id FROM users WHERE username = 'testuser2'), 'Bob', '987-654-3210');

-- Insert alerts (ensure the correct IDs are used)
INSERT INTO alerts (user_id, location, status) 
VALUES 
    ((SELECT id FROM users WHERE username = 'testuser1'), '123 Main St', 'active'),
    ((SELECT id FROM users WHERE username = 'testuser2'), '456 Elm St', 'resolved');