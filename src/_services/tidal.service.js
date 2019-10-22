import config from '../config.json';
import { authHeader } from '../_helpers';
const queryString = require('querystring')

export const tidal = {
    login,
    getUserFavoritePlaylists
}

function login(username, password) {

    const reqOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    }

    return fetch(`${config.apiUrl}/tidal/login`, reqOptions)
        .then(handleResponse)
}

function getUserFavoritePlaylists(onlyCreatedByUser = false) {
    const reqOptions = {
        method: 'GET',
        headers: {...authHeader(), 'Content-Type': 'application/json'}
    }

    return fetch(`${config.apiUrl}/tidal/getUserPlaylists?createdByUser=${onlyCreatedByUser}`, reqOptions)
        .then(handleResponse)
        .then((res) => {
            console.log(res);
            const playlists = res.map((el) => {
                const { playlist } = el
                
                playlist.img = '../src/assets/tidal_logo_small.svg'

                return playlist
            })

            return playlists
        })
}

function handleResponse(response) {
   
    return response.text().then(text => {
        // console.log(response);
        const data = text && JSON.parse(text);
        if (!response.ok) {
            
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    })
}