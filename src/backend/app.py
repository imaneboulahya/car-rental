from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, User, Car, Reservation
from dotenv import load_dotenv
import urllib.parse
import os
import sys
from flask_mail import Mail, Message

# --- 1. ENCODING & ENVIRONMENT FIXES ---
# Load variables from the .env file
load_dotenv()

# This ensures Windows/French characters don't crash the terminal
if sys.platform == "win32":
    os.environ['PGCLIENTENCODING'] = 'utf-8'

app = Flask(__name__)
CORS(app)  # Allows React (Port 3000) to talk to Flask (Port 5000)
# EMAIL CONFIG
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'ocationvoiture@gmail.com'
app.config['MAIL_PASSWORD'] = 'ffes ncsx ybuv thiw'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

# --- 2. DATABASE CONFIGURATION ---
# Pulling values from .env with fallbacks for safety
username = os.getenv("DB_USERNAME", "postgres")
password = os.getenv("DB_PASSWORD", "123456789")
database = os.getenv("DB_NAME", "test26_db")
db_host = os.getenv("DB_HOST", "localhost")
db_port = os.getenv("DB_PORT", "5432")

# We encode the password in case it contains special characters like @ or :
encoded_password = urllib.parse.quote_plus(password)

# Constructing the URI dynamically so every teammate can use their own password
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f'postgresql://{username}:{encoded_password}@{db_host}:{db_port}/{database}'
    '?client_encoding=utf8'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "dev-secret-key")

db.init_app(app)

# --- 3. DATABASE INITIALIZATION ---
with app.app_context():
    try:
        db.create_all()
        print("--- LUXDRIVE BACKEND STATUS ---")
        print(f"Database: {database} connected successfully on {db_host}.")
        print("Tables verified: Users, Cars, Reservations.")
        print("-------------------------------")
    except Exception as e:
        print("Database connection error: " + repr(e))

# --- 4. PUBLIC / SYSTEM ROUTES ---

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "online", "message": "LuxDrive API is running"})

# --- 5. AUTHENTICATION ROUTES ---

@app.route('/users', methods=['GET'])
def get_all_users():
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])
    except Exception as e:
        return jsonify({"error": "Could not fetch users", "details": repr(e)}), 500

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
        return jsonify({"error": "Database write error", "details": repr(e)}), 400

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
            "user": user.to_dict()
        }), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

# --- 6. ADMIN: FLEET MANAGEMENT (Cars) ---

@app.route('/api/cars', methods=['GET'])
def get_cars():
    try:
        cars = Car.query.all()
        return jsonify([car.to_dict() for car in cars])
    except Exception as e:
        return jsonify({"error": "Failed to fetch cars", "details": repr(e)}), 500

@app.route('/api/cars', methods=['POST'])
def add_car():
    data = request.json
    try:
        new_car = Car(
            brand=data.get('brand'),
            name=data.get('name'),
            price_per_day=data.get('pricePerDay'),
            image_url=data.get('image'),
            seats=data.get('seats'),
            fuel=data.get('fuel'),
            transmission=data.get('transmission')
        )
        db.session.add(new_car)
        db.session.commit()
        return jsonify(new_car.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to add car", "details": repr(e)}), 400

# --- 7. ADMIN: RESERVATIONS ---

@app.route('/api/reservations', methods=['GET'])
def get_reservations():
    try:
        bookings = Reservation.query.all()
        return jsonify([b.to_dict() for b in bookings])
    except Exception as e:
        return jsonify({"error": "Failed to fetch reservations", "details": repr(e)}), 500

@app.route('/api/reservations/<string:res_id>', methods=['PUT'])
def update_reservation_status(res_id):
    data = request.json
    try:
        booking = Reservation.query.get(res_id)
        if not booking:
            return jsonify({"error": "Reservation not found"}), 404
        
        booking.status = data.get('status')
        db.session.commit()
        return jsonify(booking.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to update reservation", "details": repr(e)}), 400

# --- 8. ERROR HANDLING ---
@app.errorhandler(404)
def resource_not_found(e):
    return jsonify({"error": "The requested URL was not found on the server."}), 404

# --- 9. CONTACT FORM EMAIL ---
@app.route('/api/contact/send', methods=['POST'])
def send_contact_email():
    data = request.json

    full_name = data.get('fullName')
    email = data.get('emailAddress')
    subject = data.get('subject')
    message = data.get('message')

    if not full_name or not email or not message:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        msg = Message(
            subject=f"🚗 Nouvelle demande - {subject}",
            sender=app.config['MAIL_USERNAME'],
            recipients=[app.config['MAIL_USERNAME']]
        )

        msg.body = f"""
Nom: {full_name}
Email: {email}
Sujet: {subject}

Message:
{message}
"""

        mail.send(msg)

        return jsonify({"success": True}), 200

    except Exception as e:
        print("EMAIL ERROR:", e)
        return jsonify({"error": "Email failed"}), 500


# ✅ TOUJOURS À LA FIN
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)