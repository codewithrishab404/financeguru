from flask import Blueprint, request, jsonify
from .services import firebase_service, auth_service
from .services.auth_service import login_required

main = Blueprint("main", __name__)

@main.route("/", methods=["GET"])
def test():
    return jsonify({"message": "The server is up and running!"})

@main.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    result = auth_service.create_user(email, password)
    return jsonify(result)

# To test token verification
@main.route("/protected", methods=["GET"])
@login_required
def protected():
    user = request.user
    print(user)
    return jsonify({"message": "Access granted", "user": user, "valid": True})

# handle user data in database
@main.route("/user-data", methods=["POST", "GET", "PUT"])
@login_required
def user_data():
    user = request.user
    user_id = user.get("uid")

    if request.method == "POST":
        data = request.json
        firebase_service.save_user_profile(user_id, data, overwrite=True)
        user_data = firebase_service.get_user_profile(user_id)
        return jsonify({"message": "Profile saved successfully", "data": user_data})

    elif request.method == "GET":
        profile = firebase_service.get_user_profile(user_id)
        print(profile)
        if profile:
            return jsonify(profile)
        return jsonify({"error": "No profile found"}), 404

    elif request.method == "PUT":
        data = request.json
        firebase_service.save_user_profile(user_id, data, overwrite=False)
        user_data = firebase_service.get_user_profile(user_id)
        return jsonify({"message": "Profile updated successfully", "data": user_data})
