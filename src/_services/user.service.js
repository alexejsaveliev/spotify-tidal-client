import config from '../config.json';
import { authHeader } from '../_helpers';

export const userService = { 
    login,
    logout,
    register, 
    getSettings,
    setSettings
}

function login(username, password) {
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }

    return fetch(`${config.apiUrl}/users/login`, reqOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user))
            }

            return user
        })
}

function getSettings() {
    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/users/settings`, reqOptions)
        .then(handleResponse)
        .then( (settings) => {
            return settings
        })
}

function setSettings(updates) {
    const reqOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    }

    return fetch(`${config.apiUrl}/users/settings`, reqOptions)
        .then(handleResponse)
}

function logout() {
    localStorage.removeItem('user')
}

function register(user) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    return fetch(`${config.apiUrl}/users/registration`, requestOption)
        .then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        // console.log(data);
        return data;
    })
}