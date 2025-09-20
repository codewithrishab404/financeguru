from config import db

def save_user_profile(user, user_data, overwrite=True):
    """
    Save or update user profile in Firestore
    """
    user_id = user.get("uid")
    if overwrite:
        db.collection("users").document(user_id).set(user_data)  # set
    else:
        db.collection("users").document(user_id).set(user_data, merge=True)  # update

def get_user_profile(user_id):
    doc = db.collection("users").document(user_id).get()
    return doc.to_dict() if doc.exists else None