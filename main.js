'use strict';

class Requester {
  xhr = new XMLHttpRequest();

  constructor(callback) {
    this.xhr.onload = () => {
      callback(this.xhr.status, this.xhr.response);
    }
  }

  doGetRequest(url) {
    this.xhr.open('GET', url);
    this.xhr.send();
  }
}

//MAIN
document.addEventListener(
  'DOMContentLoaded',
  () => loadCharacters(onCharactersLoadCallback)
);

function loadCharacters(onLoadCallback) {
  doGetRequest('https://rickandmortyapi.com/api/character', onLoadCallback);
}

function doGetRequest(url, onLoadFunction) {
  let requester = new Requester(onLoadFunction);
  requester.doGetRequest(url);
}

// Что будет, если кто-то ещё одновременно модифицирует document?
function onCharactersLoadCallback(status, response) {
  if (status !== 200) {
    document.write(`Error status: ${status}`);
    return;
  }

  let root = JSON.parse(response); // Ошибка парсинга?

  let characters = root.results.map(character => createCharacterDiv(character));
  document.body.append(...characters);
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
