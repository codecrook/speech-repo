{
    'use strict';
    class Speech {
        constructor(id, date, author, keywords, speech) {
            this.id = id;
            this.date = date;
            this.author = author;
            this.keywords = keywords;
            this.speech = speech;
        }
    }
    const data = {
        allSpeeches: [],
        filteredSpeeches: [],
        tabSelected: 'add-new-tab',
        id: 0
    }
    const DOMStrings = {
        addNewBtn: document.querySelector('#add-btn'),
        viewAllBtn: document.querySelector('#view-all-btn'),
        addNewTab: document.querySelector('#add-new-tab'),
        viewAllTab: document.querySelector('#view-all-tab'),
        allSpeechDisplay: document.querySelector('#all-speech-display'),
        addSpeechForm: document.querySelector('#add-speech-form'),
        speechDate: document.querySelector('#speech-date'),
        speechAuthor: document.querySelector('#speech-author'),
        speechKeywords: document.querySelector('#speech-keywords'),
        speechText: document.querySelector('#speech-text'),
        addSpeechBtn: document.querySelector('#add-speech-btn'),
        searchSpeech: document.querySelector('#search-speech'),

        speechSnippetBuilder: (speech) => {
            return `
            <div class='speech'>
                <div class='author'>${speech.author}</div>
            </div>
            `;
        }
    };
    const controlMethods = {
        selectTab: (e) => data.tabSelected = (e.target.id === 'add-btn') ? 'add-new-tab' : 'view-all-tab',
        showTab: () => {
            if (data.tabSelected === 'add-new-tab') {
                DOMStrings.addNewTab.style.display = 'block';
                DOMStrings.viewAllTab.style.display = 'none';
            } else {
                DOMStrings.viewAllTab.style.display = 'block';
                DOMStrings.addNewTab.style.display = 'none';
            }
        },
        addSpeech: (e) => {
            e.preventDefault();
            let date = DOMStrings.speechDate.value,
                author = DOMStrings.speechAuthor.value,
                keywords = DOMStrings.speechKeywords.value,
                speech = DOMStrings.speechText.value;

            data.allSpeeches.push(new Speech(data.id, date, author, keywords, speech));
            ++data.id;
            DOMStrings.addSpeechForm.reset();
            window.alert(`Speech added! Total Speeches: ${data.id}`)
            console.log(data.allSpeeches);
        },
        showAllSpeeches: (speeches) => {
            DOMStrings.allSpeechDisplay.innerHTML = '';
            speeches.forEach(speech => {
                DOMStrings.allSpeechDisplay.innerHTML += DOMStrings.speechSnippetBuilder(speech);
            });
        }
    };

    DOMStrings.addNewBtn.addEventListener('click', (e) => { controlMethods.selectTab(e); controlMethods.showTab() });
    DOMStrings.viewAllBtn.addEventListener('click', (e) => {
        controlMethods.selectTab(e);
        controlMethods.showTab();
        controlMethods.showAllSpeeches(data.allSpeeches);
    });
    DOMStrings.addSpeechBtn.addEventListener('click', controlMethods.addSpeech);
    DOMStrings.searchSpeech.addEventListener('keyup', (e) => {
        data.filteredSpeeches = data.allSpeeches.filter(speech => speech.author.includes(e.target.value));
        controlMethods.showAllSpeeches(data.filteredSpeeches);
    });

    controlMethods.showTab();
}