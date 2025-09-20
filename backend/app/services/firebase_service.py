from config import db

def save_user_profile(profile_data):
    user_id = profile_data.get("user_id")
    db.collection("users").document(user_id).set(profile_data)

def get_user_profile(user_id):
    doc = db.collection("users").document(user_id).get()
    return doc.to_dict() if doc.exists else None
