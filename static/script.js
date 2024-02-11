const translateButton = document.getElementById('translate-button');
const textArea = document.getElementById('text_to_translate');

console.log("This is translateButton value", translateButton);

translateButton.addEventListener('click', () => {
    const text = textArea.value;
    fetch('/translate', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(translatedText => {
        const translatedTextArea = document.getElementById('translated_text');
        translatedTextArea.value = translatedText.translated_text;
    });
});