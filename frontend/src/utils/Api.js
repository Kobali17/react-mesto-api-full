class Api {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
  }

  getInitialCards() {
    return this._fetch('/cards', 'GET');
  }

  addUserCard(values) {
    return this._fetch('/cards', 'POST', JSON.stringify({
      name: values.place,
      link: values.link,
    }));
  }

  takeCardLike(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, 'PUT');
  }

  removeCardLke(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, 'DELETE');
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.takeCardLike(cardId);
    }
    return this.removeCardLke(cardId);
  }

  delCard(cardId) {
    return this._fetch(`/cards/${cardId}`, 'DELETE');
  }

  getUserData() {
    return this._fetch('/users/me', 'GET');
  }

  patchUserData(values) {
    return this._fetch('/users/me', 'PATCH', JSON.stringify({
      name: values.name,
      about: values.about,
    }));
  }

  patchUserAvatar(values) {
    return this._fetch('/users/me/avatar', 'PATCH', JSON.stringify({
      avatar: values.avatar,
    }));
  }

  _fetch(url, method, body) {
    return fetch(this._baseUrl + url, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        ...this._headers,
      },
      body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default api;
