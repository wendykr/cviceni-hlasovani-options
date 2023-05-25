const containerElm = document.querySelector('.container');

const h1Elm = document.createElement('h1');
h1Elm.textContent = 'Hlasování';

const pElm = document.createElement('p');
pElm.setAttribute('id','zprava');

const element = document.createElement('form');
element.setAttribute('id','formular');

containerElm.append(h1Elm, element, pElm);

element.innerHTML = `
    <!--<div class="form__field">
        <label class="form__label" for="question">Vyberte otázku</label>
        <select id="question" class="form__input"></select>
    </div>-->
    <div class="form__field">
        <label class="form__label" for="answer">Vyberte odpověď</label>
        <select id="answer" class="form__input"></select>
    </div>
    <div class="form__field">
        <label class="form__label">Jméno hlasujícího:</label>
        <input class="form__input" type="text" id="voter" name="voter" required>
    </div>
    <input class="form__button" type="submit" value="Poslat hlas">
    `;

const voterElm = element.querySelector('#voter');
const zpravaElm = document.querySelector('#zprava');

fetch('https://apps.kodim.cz/daweb/hlasovani/api/poll/1')
.then(response => response.json())
.then(data => {
    data.poll.options.map(oneOption => {
        const answerElm = element.querySelector('#answer');
        answerElm.innerHTML += `<option value="${oneOption.id}">${oneOption.text}</option>`;
    })
});

const answerElm = element.querySelector('#answer');
console.log(answerElm.value);

const sendVote = (event) => {
    event.preventDefault();

    const objectVote = {
        optionId: 1,
        voterName: voterElm.value
    }

    fetch('https://apps.kodim.cz/daweb/hlasovani/api/poll/1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectVote),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'error') {
            zpravaElm.innerHTML = `<span class="error">Nelze hlasovat dvakrát se stejným jménem 😪</span>`;
        } else {
            zpravaElm.innerHTML = `<span class="sucess">Váš hlas byl odeslán 🤗</span>`;
            voterElm.value = '';
        }
    });
}

element.addEventListener('submit', sendVote);