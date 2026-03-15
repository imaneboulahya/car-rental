CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(50),
    name VARCHAR(100),
    price_per_day INTEGER,
    image_url TEXT,
    status VARCHAR(20) DEFAULT 'Available',
    seats INTEGER,
    fuel VARCHAR(50),
    transmission VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS reservations (
    id VARCHAR(20) PRIMARY KEY,
    car_name VARCHAR(100),
    client_name VARCHAR(100),
    client_email VARCHAR(120),
    start_date VARCHAR(20),
    end_date VARCHAR(20),
    total_price INTEGER,
    status VARCHAR(20) DEFAULT 'Pending'
);

INSERT INTO users (username, email, password)
VALUES ('admin', 'admin@example.com', 'admin1234');

    
