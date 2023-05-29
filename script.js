const containerElm = document.querySelector('.container');

const h1Elm = document.createElement('h1');
h1Elm.textContent = 'Hlasování';

const pElm = document.createElement('p');
pElm.setAttribute('id','zprava');

const element = document.createElement('form');
element.setAttribute('id','formular');

containerElm.append(h1Elm, element, pElm);

element.innerHTML = `
    <div class="form__field">
        <label class="form__label" for="question">Vyberte otázku</label>
        <select id="question" class="form__input"></select>
    </div>
    <div class="form__field">
        <label class="form__label" for="answer">Vyberte odpověď</label>
        <select id="answer" class="form__input"></select>
    </div>
    <div class="form__field">
        <label class="form__label">Vaše jméno</label>
        <input class="form__input" type="text" id="voter" name="voter" size="12" required>
    </div>
    <input class="form__button" type="submit" value="Poslat hlas">
    `;

const voterElm = element.querySelector('#voter');
const zpravaElm = document.querySelector('#zprava');

const questionElm = element.querySelector('#question');
const answerElm = element.querySelector('#answer');

fetch('https://apps.kodim.cz/daweb/hlasovani/api/polls')
.then(response => response.json())
.then(data => {
    data.results.map(oneResult => {
        questionElm.innerHTML += `<option value="${oneResult.id}">${oneResult.question}</option>`;
    })
});

fetch('https://apps.kodim.cz/daweb/hlasovani/api/poll/0')
    .then(response => response.json())
    .then(data => {
        data.poll.options.map(oneOption => {
            answerElm.innerHTML += `<option value="${oneOption.id}">${oneOption.text}</option>`;
    })
});

questionElm.addEventListener('change', (event) => {
    answerElm.innerHTML = '';

    fetch(`https://apps.kodim.cz/daweb/hlasovani/api/poll/${event.target.value}`)
    .then(response => response.json())
    .then(data => {
        data.poll.options.map(oneOption => {
            answerElm.innerHTML += `<option value="${oneOption.id}">${oneOption.text}</option>`;
    })
});
})

const sendVote = (event) => {
    event.preventDefault();

    const objectVote = {
        optionId: Number(answerElm.value),
        voterName: voterElm.value
    }

    fetch(`https://apps.kodim.cz/daweb/hlasovani/api/poll/${Number(questionElm.value)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectVote),
    })
    .then(response => response.json())
    .then(data => {
        if (voterElm.value.length > 12 ) {
            zpravaElm.innerHTML = `<span class="error">Max. délka jména je 12 znaků 💁‍♀️</span>`;
        } else if (data.status === 'error') {
            zpravaElm.innerHTML = `<span class="error">Nelze hlasovat dvakrát se stejným jménem 😪</span>`;
        } else {
            zpravaElm.innerHTML = `<span class="sucess">Váš hlas byl odeslán 🤗</span>`;
            voterElm.value = '';
            questionElm.innerHTML = '';
            answerElm.innerHTML = '';
            fetch('https://apps.kodim.cz/daweb/hlasovani/api/polls')
            .then(response => response.json())
            .then(data => {
                data.results.map(oneResult => {
                    questionElm.innerHTML += `<option value="${oneResult.id}">${oneResult.question}</option>`;
                })
            });

            fetch('https://apps.kodim.cz/daweb/hlasovani/api/poll/0')
                .then(response => response.json())
                .then(data => {
                    data.poll.options.map(oneOption => {
                        answerElm.innerHTML += `<option value="${oneOption.id}">${oneOption.text}</option>`;
                })
            });
        }
    });
}

element.addEventListener('submit', sendVote);