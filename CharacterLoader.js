import {Requester} from "./Requester.js";

const CHARACTER_URL = 'https://rickandmortyapi.com/api/character';

export class CharacterLoader {
    loadCharacters(callback, characterName) {
        const onLoadFunction = (status, response) => {
            if (status !== 200) {
                if (status !== 404) {
                    alert(`Error status: ${status}`);
                }
                callback(status, []);
                return;
            }
            callback(status, JSON.parse(response).results);
        }
        const requester = new Requester(onLoadFunction);
        requester.doGetRequest(`${CHARACTER_URL}?name=${characterName}`);
    }
}
