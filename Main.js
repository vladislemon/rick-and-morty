import {CharacterLoader} from "./CharacterLoader.js";

//MAIN
const characterLoader = new CharacterLoader();
characterLoader.loadCharacters(onCharactersLoadCallback, "");

document.forms.search.onsubmit = (event) => {
    characterLoader.loadCharacters(onCharactersLoadCallback, document.forms.search.elements.name.value);
    event.preventDefault();
}

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

    return characterDiv;
}
