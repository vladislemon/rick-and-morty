import {Requester} from "./requester.js";

const CHARACTER_URL = 'https://rickandmortyapi.com/api/character';

//MAIN
loadCharacters(onCharactersLoadCallback);

document.forms.search.onsubmit = (event) => {
    loadCharactersFiltered(onCharactersLoadCallback, document.forms.search.elements.name.value);
    event.preventDefault();
}

function loadCharacters(onLoadCallback) {
    doGetRequest(CHARACTER_URL, onLoadCallback);
}

function loadCharactersFiltered(onLoadCallback, name) {
    doGetRequest(`${CHARACTER_URL}?name=${name}`, onLoadCallback);
}

function doGetRequest(url, onLoadFunction) {
    let requester = new Requester(onLoadFunction);
    requester.doGetRequest(url);
}

// Что будет, если кто-то ещё одновременно модифицирует document?
function onCharactersLoadCallback(status, response) {
    if (status !== 200 && status !== 404) {
        document.write(`Error status: ${status}`);
        return;
    }

    let characters = readCharacters(status, response).map(character => createCharacterDiv(character));

    let oldCharactersDiv = document.getElementById('characters');
    let newCharactersDiv = document.createElement('div');
    newCharactersDiv.id = oldCharactersDiv.id;
    newCharactersDiv.append(...characters);
    oldCharactersDiv.replaceWith(newCharactersDiv);
}

function readCharacters(status, response) {
    if (status === 404) {
        return [];
    }
    return JSON.parse(response).results; // Ошибка парсинга?
}

function createCharacterDiv(character) {
    let characterDiv = document.createElement('div');
    characterDiv.className = "character";

    let image = document.createElement('img');
    image.src = character.image;
    image.alt = character.name;
    image.height = 128;

    let p = document.createElement('p');

    let name = document.createTextNode(character.name);

    characterDiv.append(image, p, name);

    return characterDiv;
}
