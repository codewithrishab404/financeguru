from flask import Blueprint, request, jsonify
from .services import firebase_service

main = Blueprint("main", __name__)

@main.route("/profile", methods=["POST"])
def save_profile():
    data = request.json
    firebase_service.save_user_profile(data)
    return jsonify({"message": "Profile saved successfully"})

# @main.route("/upload_csv", methods=["POST"])
# def upload_csv():
#     file = request.files["file"]
#     summary = csv_service.process_csv(file)
#     return jsonify({"summary": summary})

# @main.route("/chat", methods=["POST"])
# def chat():
#     user_input = request.json.get("message")
#     user_id = request.json.get("user_id")
#     response = ai_service.generate_response(user_input, user_id)
#     return jsonify({"reply": response})
