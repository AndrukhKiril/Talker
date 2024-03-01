const translateButton = document.getElementById('translate_button');
const srcTextArea = document.getElementById('text_to_translate');
const tgtTextArea = document.getElementById('translated_text');

const srcLanguages = document.getElementById('src_languages');
const tgtLanguages = document.getElementById('tgt_languages');

let srcInput = document.getElementById('src_input');
let tgtInput = document.getElementById('tgt_input');

function csvToArr(csvData, column) {
    const lines = csvData.trim().split("\n");
    const hasHeader = lines[0].split(",").length > 1;
    const startIndex = hasHeader ? 1 : 0;

    const values = lines.slice(startIndex).map(line => line.split(",")[column]);
  
    return values;
  }

async function readCsv() {
    const response = await fetch('../static/flores_codes.csv');
    const csvData = await response.text();
    const language_codes = csvToArr(csvData, 1);
    const language_names = csvToArr(csvData, 0);
    return { language_codes, language_names }; 
}

async function createSelectors() {
    try {
        const { language_codes, language_names } = await readCsv();

        for (let i = 0; i < language_codes.length; i++) {
            const srcOption = document.createElement('option');
            const tgtOption = document.createElement('option');

            srcOption.value = language_names[i];
            tgtOption.value = language_names[i];

            srcLanguages.appendChild(srcOption);
            tgtLanguages.appendChild(tgtOption);        
        }   

        srcInput.value = "Polish";
        tgtInput.value = "English";

    } catch (error) {
        console.log(error);
    }
};

createSelectors();

async function checkAndTranslate() {
    try {
        const { language_codes, language_names } = await readCsv();

        if (language_names.includes(srcInput.value) && language_names.includes(tgtInput.value)) {
            const text = srcTextArea.value;

            tgtTextArea.value = "";
            if (srcTextArea.value.trim() !== "") {
                tgtTextArea.placeholder = 'Wait...';

                let src_language = language_codes[language_names.indexOf(srcInput.value)]; 
                let tgt_language = language_codes[language_names.indexOf(tgtInput.value)]; 

                fetch('/translate', {
                    method: 'POST',
                    body: JSON.stringify({ text, src_language, tgt_language }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(translatedText => {
                    tgtTextArea.value = translatedText.translated_text;
                    tgtTextArea.placeholder = '';
                });
            } else {
                srcTextArea.placeholder = 'Enter a text';
            }
        } else {
            if (!language_names.includes(srcInput.value)) {
                console.log(srcLanguages)
                srcTextArea.value = "";
                srcTextArea.placeholder = "The language is not supported, choose a language presented above";
            }
            if (!language_names.includes(tgtInput.value)) {
                tgtTextArea.value = "";
                tgtTextArea.placeholder = "The language is not supported, choose a language presented above";
            }
        }
    } catch (error) {
        console.log(error);
    }
}

srcTextArea.addEventListener('input', () => {
    srcTextArea.placeholder = "Write here a message you want to translate and listen to";
});

tgtTextArea.addEventListener('input', () => {
    tgtTextArea.placeholder = "";
});

translateButton.addEventListener('click', () => {
    checkAndTranslate();
});

const swapButton = document.getElementById('swap_languages');

swapButton.addEventListener('click', () => {
    var temp = srcInput.value;
    srcInput.value = tgtInput.value;
    tgtInput.value = temp;
});