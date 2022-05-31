class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(res.status)
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(this._checkResponse) //если сервер ответил успешно(ok) создаем из ответа объект, если нет то появляется ошибка
    }

    editProfile(data) {                      //метод редактирования профиля
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",                 //метод изменяет существующие данные на сервере
            headers: this._headers,
            body: JSON.stringify({     //делает из объекта строку
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkResponse) //если сервер ответил успешно(ok) создаем из ответа объект, если нет то появляется ошибка
    }

    addCard(object) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",                 //метод изменяет существующие данные на сервере
            headers: this._headers,
            body: JSON.stringify({     //делает из объекта строку
                name: object.name,
                link: object.link,
            }),
        })
            .then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers
        })
            .then(this._checkResponse)

    }

    changeStatusLike(id, isLiked) {
        if (isLiked) {
            return this.addLike(id);
        } else {
            return this.deleteLike(id)
        }
    }

    newAvatar(data) {                      //метод редактирования профиля
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",                 //метод изменяет существующие данные на сервере
            headers: this._headers,
            body: JSON.stringify({     //делает из объекта строку
                avatar: data.avatar
            })
        })
            .then(this._checkResponse) //если сервер ответил успешно(ok) создаем из ответа объект, если нет то появляется ошибка

    }

}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
        authorization: 'b0b415dc-4ab5-4282-b366-67357f280c75',
        'Content-Type': 'application/json'
    }
});