export default class Api {
  constructor(url) {
    this._url = url;
  }

  getData() {
    return fetch(this._url).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
