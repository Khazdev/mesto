class Api {
  constructor(options) {
    // тело конструктора
    this.baseurl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseurl}/cards`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this.baseurl}/users/me`, {
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((error) => {
        console.error(error);
      });
  }

  updateProfile(name, about) {
    return fetch(`${this.baseurl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(this._checkResponse)
      .catch((error) => {
        console.error(error);
      });
  }

  addCard(name, link) {
    return fetch(`${this.baseurl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._checkResponse)
      .catch((error) => {
        console.error(error);
      });
  }

  deleteCard(id) {
    return fetch(`${this.baseurl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((error) => {
        console.error(error);
      });
  }

  // другие методы работы с API
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-76",
  headers: {
    authorization: "beb01290-b862-4e63-9356-a8cedbbf4df4",
    "Content-Type": "application/json",
  },
});
