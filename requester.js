export class Requester {
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
