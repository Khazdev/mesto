export class UserInfo {
  constructor({ nameSelector, bioSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._bio = document.querySelector(bioSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = null;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      bio: this._bio.textContent,
      id: this._id,
    };
  }

  setUserInfo(userData) {
    const {name, about: bio, _id: id, avatar} = userData;
    this._name.textContent = name;
    this._bio.textContent = bio;
    this._id = id;
    this._avatar.src = avatar;
  }
}
