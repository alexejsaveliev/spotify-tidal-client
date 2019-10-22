import config from '../config.json';
import { authHeader } from '../_helpers';

export const trackListService = {
    getTracks
}

function getTracks(params = {}) {

    const { limit = 50, offset = 0, searchQuery = '', filter, sort } = params
    const queryOptions = `limit=${limit / 2}&offset=${offset}&filter=${searchQuery}`

    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }

    let trackList = []

    return fetch(`${config.apiUrl}/spotify/getTracks?${queryOptions}`, reqOptions)
        .then(handleResponse)
        .then((data) => {
            // console.log(tracksList);
            const spotifyTracks = data.map((el) => {
                el.source = 'spotify'
                el.artist = el.artists[0].name
                return el
            })

            trackList = trackList.concat(spotifyTracks)

            return fetch(`${config.apiUrl}/tidal/getTracks?${queryOptions}`, reqOptions)
                .then(handleResponse)
                .then((data) => {
                    // console.log(tracksList);
                    const tidalTracks = data.map((el) => {
                        el.source = 'tidal'
                        el.artist = el.artist.name
                        return el
                    })

                    trackList = trackList.concat(tidalTracks)

                    return trackList
                })

        })

}

function logout() {
    localStorage.removeItem('user')
}

function handleResponse(response) {

    return response.text().then(text => {
        // console.log(response);
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

        return data;
    })
}