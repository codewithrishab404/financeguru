# import os
from firebase_admin import auth
from functools import wraps
from flask import request, jsonify

# Firebase client config
# firebaseConfig = {
#   "apiKey": os.getenv("FIREBASE_APIKEY"),
#   "authDomain": os.getenv("FIREBASE_AUTHDOMAIN"),
#   "projectId": os.getenv("FIREBASE_PROJECTID"),
#   "storageBucket": os.getenv("FIREBASE_STORAGEBUCKET"),
#   "messagingSenderId": os.getenv("FIREBASE_MESSAGINGSENDERID"),
#   "appId": os.getenv("FIREBASE_APPID"),
#   "measurementId": os.getenv("FIREBASE_MEASUREMENTID"),
#   "databaseURL": ""
# }

def verify_token(id_token: str):
    """
    Verify Firebase ID token from frontend
    """
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        return {"error": str(e)}

def create_user(email, password):
    """
    Register a new user with email/password
    """
    try:
        user = auth.create_user(email=email, password=password)
        return {"uid": user.uid, "email": user.email}
    except Exception as e:
        return {"error": str(e)}

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "No token provided"}), 401
        
        decoded = verify_token(token)
        if "error" in decoded:
            return jsonify(decoded), 401
        
        # Attach user info to request context
        request.user = decoded
        return f(*args, **kwargs)
    return decorated