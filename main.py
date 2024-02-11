from flask import Flask, request, render_template, jsonify
from translator import translate

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate_text():
    text_to_translate = request.get_json().get("text")
    translated_text = translate(text_to_translate)
    return jsonify({"translated_text": translated_text})

if __name__ == "__main__":
    app.run(debug=True)