class AuthApi {
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

    registration(password, email) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        }).then((res) => this._checkResponse(res));
    }

    login(password, email) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        }).then((res) => this._checkResponse(res));
    }

    getUserData(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        }).then((res) => this._checkResponse(res));
    }
}

export const authApi = new AuthApi({
    baseUrl: "https://auth.nomoreparties.co",
    headers: {
        "Content-Type": "application/json",
    },
});