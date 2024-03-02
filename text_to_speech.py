from gtts import gTTS

import os
import csv

filename = open('./static/language_codes.csv', 'r')

file = csv.DictReader(filename)

language_codes = []

for col in file:
    language_codes.append(col['IETF'])

def text_to_speech(text, lang_idx):
    filename = f'static/generated_audio.mp3'
    try:
        os.remove(filename)
    except OSError:
        pass
    tts = gTTS(text=text, lang=language_codes[lang_idx], tld="com")
    tts.save(filename)