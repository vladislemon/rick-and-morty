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
loadCharacters(onCharactersLoadCallback);

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

  for (let result of root.results) { // Поле results undefined?
    document.write(`<img src="${result.image}" alt="Image" height="128"/>`); // image undefined?
    document.write('<p>');
    document.write(result.name); // name undefined?
    document.write('<hr>');
  }
}
