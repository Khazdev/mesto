class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-76/cards', {
      headers: {
        authorization: 'beb01290-b862-4e63-9356-a8cedbbf4df4'
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  getUserInfo() {
    fetch('https://nomoreparties.co/v1/cohort-76/users/me', {
      headers: {
        authorization: 'beb01290-b862-4e63-9356-a8cedbbf4df4'
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  updateProfile(name, about) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-76/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'beb01290-b862-4e63-9356-a8cedbbf4df4',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    }).then(r => r.json())
      .then((result) => {
        console.log(result);
      });
  }

  addCard(name, link) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-76/cards', {
      method: 'POST',
      headers: {
        authorization: 'beb01290-b862-4e63-9356-a8cedbbf4df4',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    }).then(r => r.json())
      .then((result) => {
        console.log(result);
      });
  }

  deleteCard(id) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-76/cards/' + id, {
      method: 'DELETE',
      headers: {
        authorization: 'beb01290-b862-4e63-9356-a8cedbbf4df4',
        'Content-Type': 'application/json'
      },
    }).then(r => r.json())
      .then((result) => {
        console.log(result);
      });
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-76',
  headers: {
    authorization: 'beb01290-b862-4e63-9356-a8cedbbf4df4',
    'Content-Type': 'application/json'
  }
});
