CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    image_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(50),
    name VARCHAR(100),
    type VARCHAR(50),
    price_per_day INTEGER,
    image_url TEXT,
    status VARCHAR(20) DEFAULT 'Available',
    seats INTEGER,
    fuel VARCHAR(50),
    transmission VARCHAR(50),
    acceleration VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS reservations (
    id VARCHAR(20) PRIMARY KEY,
    car_name VARCHAR(100),
    client_name VARCHAR(100),
    client_email VARCHAR(120),
    start_date VARCHAR(20),
    end_date VARCHAR(20),
    total_price INTEGER,
    status VARCHAR(20) DEFAULT 'Pending',
    car_image VARCHAR(500)
);

-- Register default admin if not exists
INSERT INTO users (username, email, password)
SELECT 'admin', 'admin@example.com', 'admin1234'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');

-- Clear and Seed cars
DELETE FROM cars;

INSERT INTO cars (brand, name, type, price_per_day, image_url, status, seats, fuel, transmission, acceleration) VALUES
('Land Rover', 'Range Rover SV', 'Sport', 1000, '/asset/range.avif', 'Available', 5, 'Electric', 'Automatic', '1.99s 0-60'),
('Volkswagen', 'Volkswagen T-Roc', 'Sport', 600, '/asset/troc.jpeg', 'Rented', 2, 'Gasoline', 'PDK', '3.2s 0-60'),
('Mercedes', 'G-Wagon G63', 'SUV', 800, '/asset/benz.jpeg', 'Available', 5, 'Gasoline', 'Automatic', '4.5s 0-60'),
('Hundai', 'Hundai Tucson N Line', 'Luxury', 600, '/asset/tucson.jpeg', 'Available', 4, 'Gasoline', 'Automatic', '5.1s 0-60'),
('Volkswagen', 'golf 8r', 'Sport', 900, '/asset/golf.jpg', 'Maintenance', 4, 'diesel', 'Automatic', '2.6s 0-60'),
('SEAT', 'Seat Leon', 'Sport', 400, '/asset/seat leon.png', 'Available', 5, 'Gasoline', 'Automatic', '7.5s 0-60');


    
