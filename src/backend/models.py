from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    image_url = db.Column(db.String(500), nullable=True) # Added for Profile Pictures

    def to_dict(self):
        return {
            "id": self.id, 
            "username": self.username, 
            "email": self.email,
            "image_url": self.image_url
        }

class Car(db.Model):
    __tablename__ = 'cars'
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(50))
    name = db.Column(db.String(100))
    type = db.Column(db.String(50))
    price_per_day = db.Column(db.Integer)
    image_url = db.Column(db.Text) # Use Text for long base64 strings
    status = db.Column(db.String(20), default="Available")
    seats = db.Column(db.Integer)
    fuel = db.Column(db.String(50))
    transmission = db.Column(db.String(50))
    acceleration = db.Column(db.String(50))

    def to_dict(self):
        return {
            "id": self.id, 
            "brand": self.brand, 
            "name": self.name,
            "type": self.type,
            "pricePerDay": self.price_per_day, 
            "image": self.image_url,
            "status": self.status, 
            "specs": {
                "seats": self.seats, 
                "fuel": self.fuel, 
                "transmission": self.transmission,
                "acceleration": self.acceleration
            }
        }

class Reservation(db.Model):
    __tablename__ = 'reservations'
    id = db.Column(db.String(20), primary_key=True)
    car_name = db.Column(db.String(100))
    client_name = db.Column(db.String(100))
    client_email = db.Column(db.String(120))
    start_date = db.Column(db.String(20))
    end_date = db.Column(db.String(20))
    total_price = db.Column(db.Integer)
    status = db.Column(db.String(20), default="Pending")
    car_image = db.Column(db.String(500), nullable=True)

    def to_dict(self):
        return {
            "id": self.id, "carName": self.car_name, "clientName": self.client_name,
            "clientEmail": self.client_email, "startDate": self.start_date,
            "endDate": self.end_date, "totalPrice": self.total_price, "status": self.status,
            "image": self.car_image
        }