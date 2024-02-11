from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline

model = AutoModelForSeq2SeqLM.from_pretrained("facebook/nllb-200-distilled-600M")
tokenizer = AutoTokenizer.from_pretrained("facebook/nllb-200-distilled-600M")

translator = pipeline('translation', model=model, tokenizer=tokenizer, src_lang="pol_Latn", tgt_lang="eng_Latn")

def translate(text):
    translated_text = translator(text)[0]['translation_text']
    print(translated_text)
    return translated_text

if __name__ == "__main__":
    translate('''Вічний революціонер –
                Дух, що тіло рве до бою,
                Рве за поступ, щастя й волю, –
                Він живе, він ще не вмер.
                Ні попівськії тортури,
                Ні тюремні царські мури,
                Ані війська муштровані,
                Ні гармати лаштовані,
                Ні шпіонське ремесло
                В гріб його ще не звело''')