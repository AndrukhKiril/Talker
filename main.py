from flask import Flask, request, render_template, jsonify
from translator import translate

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate_text():
    text_to_translate = request.get_json().get("text")
    src_lang = request.get_json().get("src_language")
    tgt_lang = request.get_json().get("tgt_language")
    translated_text = translate(text_to_translate, src_lang, tgt_lang)
    return jsonify({"translated_text": translated_text})

if __name__ == "__main__":
    app.run(debug=True)