export class UserInfo {
  constructor({ nameSelector, bioSelector }) {
    this._name = document.querySelector(nameSelector);
    this._bio = document.querySelector(bioSelector);
    this._id = null;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      bio: this._bio.textContent,
      id: this._id,
    };
  }

  setUserInfo({ name, bio, id }) {
    this._name.textContent = name;
    this._bio.textContent = bio;
    this._id = id;
  }
}
