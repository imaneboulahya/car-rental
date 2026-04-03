from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from models import db, User, Car, Reservation
from dotenv import load_dotenv
import urllib.parse
import os
import sys
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename
from sqlalchemy import text

# --- 1. ENVIRONMENT & ENCODING FIXES ---
load_dotenv()

# Fix for Windows terminal encoding issues (common in Morocco/French locales)
if sys.platform == "win32":
    os.environ['PGCLIENTENCODING'] = 'utf-8'

app = Flask(__name__)

# Allows React (Port 3000) to communicate with Flask (Port 8080)
CORS(app, resources={r"/*": {"origins": "*"}})

# --- 2. FOLDER CONFIGURATION ---
# Folder for Profile Pictures
UPLOAD_FOLDER = 'uploads/avatars'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024  # Limit 2MB
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# --- 3. EMAIL CONFIGURATION (SMTP) ---
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME", "ocationvoiture@gmail.com")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD", "ffes ncsx ybuv thiw")
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

# --- 4. DATABASE CONFIGURATION (PostgreSQL) ---
username = os.getenv("DB_USERNAME", "postgres")
password = os.getenv("DB_PASSWORD", "123456789")
database = os.getenv("DB_NAME", "test26_db")
db_host = os.getenv("DB_HOST", "localhost")
db_port = os.getenv("DB_PORT", "5432")

# Encode password to handle special characters (@, #, etc.)
encoded_password = urllib.parse.quote_plus(password)

app.config['SQLALCHEMY_DATABASE_URI'] = (
    f'postgresql://{username}:{encoded_password}@{db_host}:{db_port}/{database}'
    '?client_encoding=utf8'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "luxdrive-secure-key-2026")

db.init_app(app)

# --- 5. DATABASE INITIALIZATION ---
with app.app_context():
    try:
        db.create_all()
        # Simple Migration: Add car_image column if it doesn't exist
        db.session.execute(text("ALTER TABLE reservations ADD COLUMN IF NOT EXISTS car_image VARCHAR(500);"))
        db.session.commit()
        print("--- LUXDRIVE BACKEND STATUS ---")
        print(f"Database: {database} connected successfully.")
        print("Tables verified: Users, Cars, Reservations.")
        print("-------------------------------")
    except Exception as e:
        print(f"Database connection error: {repr(e)}")

# --- 6. STATIC FILE SERVING ---
@app.route('/uploads/avatars/<filename>')
def serve_avatar(filename):
    """Serves uploaded profile pictures so they appear in React."""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/asset/<filename>')
def serve_asset(filename):
    """Serves car assets so they appear in React."""
    return send_from_directory('../../asset', filename)

# --- 7. AUTHENTICATION ROUTES ---

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.password == password:
        return jsonify({
            "message": "Login successful",
            "user": user.to_dict() # Dictionary includes id and image_url
        }), 200
    return jsonify({"error": "Invalid email or password"}), 401

@app.route('/users', methods=['POST'])
def signup():
    data = request.json
    if not data or not all(k in data for k in ("username", "email", "password")):
        return jsonify({"error": "Missing required fields"}), 400
    try:
        new_user = User(
            username=data['username'], 
            email=data['email'], 
            password=data['password'] 
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Could not create user", "details": str(e)}), 400

# --- 8. USER PROFILE UPDATES ---

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Updates username and email in the database."""
    data = request.json
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        
        db.session.commit()
        return jsonify(user.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Update failed", "details": str(e)}), 500

@app.route('/api/users/<int:user_id>/avatar', methods=['POST'])
def upload_avatar(user_id):
    """Saves profile picture to disk and updates image_url in DB."""
    if 'avatar' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['avatar']
    user = User.query.get(user_id)

    if file and user:
        filename = secure_filename(f"user_{user_id}_{file.filename}")
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        # Absolute URL for React to fetch
        user.image_url = f"http://127.0.0.1:8080/uploads/avatars/{filename}"
        db.session.commit()
        
        return jsonify(user.to_dict()), 200
    return jsonify({"error": "Upload failed"}), 400

# --- 9. FLEET & RESERVATION ROUTES ---

@app.route('/api/cars', methods=['GET'])
def get_cars():
    try:
        cars = Car.query.all()
        return jsonify([car.to_dict() for car in cars])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/cars', methods=['POST'])
def add_car():
    data = request.json
    try:
        new_car = Car(
            brand=data.get('brand'),
            name=data.get('name'),
            type=data.get('type'),
            price_per_day=int(data.get('pricePerDay', 0)),
            image_url=data.get('image'),
            status=data.get('status', 'Available'),
            seats=int(data.get('specs', {}).get('seats', 4)),
            fuel=data.get('specs', {}).get('fuel', 'Petrol'),
            transmission=data.get('specs', {}).get('transmission', 'Automatic'),
            acceleration=data.get('specs', {}).get('acceleration', '0-100 in 3.0s')
        )
        db.session.add(new_car)
        db.session.commit()
        return jsonify(new_car.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to add car", "details": str(e)}), 500

@app.route('/api/cars/<int:car_id>', methods=['PUT'])
def update_car(car_id):
    data = request.json
    try:
        car = Car.query.get(car_id)
        if not car:
            return jsonify({"error": "Car not found"}), 404
        
        car.brand = data.get('brand', car.brand)
        car.name = data.get('name', car.name)
        car.type = data.get('type', car.type)
        car.price_per_day = int(data.get('pricePerDay', car.price_per_day))
        car.image_url = data.get('image', car.image_url)
        car.status = data.get('status', car.status)
        
        specs = data.get('specs', {})
        car.seats = int(specs.get('seats', car.seats))
        car.fuel = specs.get('fuel', car.fuel)
        car.transmission = specs.get('transmission', car.transmission)
        car.acceleration = specs.get('acceleration', car.acceleration)
        
        db.session.commit()
        return jsonify(car.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to update car", "details": str(e)}), 500

@app.route('/api/cars/<int:car_id>', methods=['DELETE'])
def delete_car(car_id):
    try:
        car = Car.query.get(car_id)
        if not car:
            return jsonify({"error": "Car not found"}), 404
        
        db.session.delete(car)
        db.session.commit()
        return jsonify({"message": "Car deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to delete car", "details": str(e)}), 500

@app.route('/api/reservations', methods=['GET'])
def get_reservations():
    try:
        bookings = Reservation.query.all()
        return jsonify([b.to_dict() for b in bookings])
    except Exception as e:
        return jsonify({"error": "Failed to fetch reservations"}), 500

@app.route('/api/reservations', methods=['POST'])
def create_reservation():
    data = request.json
    try:
        # Generate a sequential ID: RES-1, RES-2, etc.
        count = Reservation.query.count()
        res_id = f"RES-{count + 1}"
        
        # Check if ID already exists (in case of deletions) and find next available
        while Reservation.query.get(res_id):
            count += 1
            res_id = f"RES-{count + 1}"
        
        new_res = Reservation(
            id=res_id,
            car_name=data.get('carName'),
            client_name=data.get('clientName'),
            client_email=data.get('clientEmail'),
            start_date=data.get('startDate'),
            end_date=data.get('endDate'),
            total_price=int(str(data.get('totalPrice')).replace('dh', '').replace(',', '')),
            status="Pending",
            car_image=data.get('carImage')
        )
        db.session.add(new_res)
        db.session.commit()
        return jsonify(new_res.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error creating reservation: {str(e)}")
        return jsonify({"error": "Failed to create reservation", "details": str(e)}), 500

@app.route('/api/reservations/<string:res_id>', methods=['DELETE'])
def delete_reservation(res_id):
    try:
        res = Reservation.query.get(res_id)
        if not res:
            return jsonify({"error": "Reservation not found"}), 404
        
        db.session.delete(res)
        db.session.commit()
        return jsonify({"message": "Reservation deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to delete reservation", "details": str(e)}), 500

@app.route('/api/reservations/<string:res_id>/status', methods=['PUT'])
def update_res_status(res_id):
    data = request.json
    try:
        res = Reservation.query.get(res_id)
        if res:
            res.status = data.get('status')
            db.session.commit()
            return jsonify(res.to_dict()), 200
        return jsonify({"error": "Not found"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# --- 10. CONTACT FORM EMAIL ---

@app.route('/api/contact/send', methods=['POST'])
def send_contact():
    data = request.json
    try:
        msg = Message(
            subject=f"🚗 LuxeDrive Contact: {data.get('subject')}",
            sender=app.config['MAIL_USERNAME'],
            recipients=[app.config['MAIL_USERNAME']]
        )
        msg.body = f"From: {data.get('fullName')} ({data.get('emailAddress')})\n\nMessage:\n{data.get('message')}"
        mail.send(msg)
        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"error": "Email failed", "details": str(e)}), 500

# --- 11. ERROR HANDLING ---
@app.errorhandler(404)
def resource_not_found(e):
    return jsonify({"error": "The requested URL was not found on the server."}), 404

if __name__ == '__main__':
    # Running on 8080 to match React frontend fetch calls
    app.run(host='127.0.0.1', port=8080, debug=True)