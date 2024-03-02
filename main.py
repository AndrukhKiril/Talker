from flask import Flask, request, render_template, jsonify
from translator import translate
from text_to_speech import text_to_speech

import csv

app = Flask(__name__)

filename = open('./static/language_codes.csv', 'r')

file = csv.DictReader(filename)

language_codes = []

for col in file:
    language_codes.append(col['FLORES-200 code'])


@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate_text():
    text_to_translate = request.get_json().get("text")
    src_lang = request.get_json().get("src_language").strip()
    tgt_lang = request.get_json().get("tgt_language").strip()
    translated_text = translate(text_to_translate, src_lang, tgt_lang)

    text_to_speech(translated_text, language_codes.index(tgt_lang))
    
    return jsonify({"translated_text": translated_text, "generated_audio": 'generated_audio.mp3'})

if __name__ == "__main__":
    app.run(debug=True)