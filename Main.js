import {CharacterLoader} from "./CharacterLoader.js";

//MAIN
const characterLoader = new CharacterLoader();
characterLoader.loadCharacters(onCharactersLoadCallback, "");

document.forms.search.onsubmit = (event) => {
    characterLoader.loadCharacters(onCharactersLoadCallback, document.forms.search.elements.name.value);
    event.preventDefault();
}

function onCharactersLoadCallback(status, response) {
    const characters = response.map(character => createCharacterDiv(character));
    const oldCharactersDiv = document.getElementById('characters');
    const newCharactersDiv = document.createElement('div');
    newCharactersDiv.id = oldCharactersDiv.id;
    newCharactersDiv.append(...characters);
    oldCharactersDiv.replaceWith(newCharactersDiv);
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
