import os
import firebase_admin
from firebase_admin import credentials, firestore

# Load Firebase credentials
cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred)

# Firestore instance
db = firestore.client()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "vnewkvoweve2lbfobb032g2ubf308110")
