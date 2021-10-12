import {CharacterLoader} from "./CharacterLoader.js";

//MAIN
const characterLoader = new CharacterLoader();
characterLoader.loadCharacters(onCharactersLoadCallback, "");

let lastSearchString = "";
document.forms.search.onsubmit = (event) => {
    lastSearchString = document.forms.search.elements.name.value;
    characterLoader.loadCharacters(onCharactersLoadCallback, lastSearchString);
    event.preventDefault();
}

window.onpopstate = () => characterLoader.loadCharacters(onCharactersLoadCallback, lastSearchString);

function getContent() {
    return document.getElementById('content');
}

function replaceContent(newContent) {
    const oldContent = getContent();
    newContent.id = oldContent.id;
    oldContent.replaceWith(newContent);
}

function onCharactersLoadCallback(status, response) {
    const characters = response.map(character => createCharacterDiv(character));
    const newContent = document.createElement('div');
    newContent.append(...characters);
    replaceContent(newContent);
}

function createCharacterDiv(character) {
    const characterDiv = document.createElement('div');
    characterDiv.className = "character";

    const image = document.createElement('img');
    image.src = character.image;
    image.alt = character.name;
    image.height = 128;

    const p = document.createElement('p');

    const name = document.createTextNode(character.name);

    characterDiv.append(image, p, name);

    characterDiv.onclick = (event) => onCharacterClick(event, character);

    return characterDiv;
}

function onCharacterClick(event, character) {
    window.history.pushState(null, character.name);
    characterLoader.loadCharacter(onCharacterLoadCallback, character.id);
    event.preventDefault();
}

function onCharacterLoadCallback(status, response) {
    const character = createFullCharacterDiv(response);
    const newContent = document.createElement('div');
    newContent.append(character);
    replaceContent(newContent);
}

function createFullCharacterDiv(character) {
    const characterDiv = createCharacterDiv(character);

    const p = document.createElement('p');
    //const status = document.createTextNode(character.status);

    characterDiv.append(p.cloneNode(), JSON.stringify(character));

    return characterDiv;
}
