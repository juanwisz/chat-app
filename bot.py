# bot.py

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def reply():
    userMessage = request.json.get('userMessage', '')  # Get the user's message from the JSON payload
    return jsonify({"botReply": "Hello, you said: " + userMessage})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
