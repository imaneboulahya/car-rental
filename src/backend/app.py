from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from models import db, User, Car, Reservation
from dotenv import load_dotenv
import urllib.parse
import os
import sys
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename

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

@app.route('/api/reservations', methods=['GET'])
def get_reservations():
    try:
        bookings = Reservation.query.all()
        return jsonify([b.to_dict() for b in bookings])
    except Exception as e:
        return jsonify({"error": "Failed to fetch reservations"}), 500

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