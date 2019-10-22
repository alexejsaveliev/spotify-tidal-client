import config from '../config.json';
import { authHeader } from '../_helpers';
const axios = require('axios');
const queryString = require('querystring')

export const spotify = {
    login,
    auth,
    getUserPlaylists
}

function login() {
    
    const reqOptions = {
        method: 'GET',
        // mode: 'no-cors',
        headers: authHeader()
    }

    axios(`${config.apiUrl}/spotify/login`, reqOptions)
        .then(( res ) => res.data )
        .catch( handleError )
}

function auth(params) {
    const reqOptions = {
        method: 'GET',
        url: `${config.apiUrl}/spotify/auth?${queryString.stringify(params)}`,
        headers: authHeader()
    }

    axios(reqOptions)
        .then(res => res.data)
        .catch( handleError )
}

function getUserPlaylists() {

    const reqOptions = {
        method: 'GET',
        url: `${config.apiUrl}/spotify/getUserPlaylists?`,
        headers: authHeader()
    }


    return axios(reqOptions)
        .then( res => {
            const { data } = res
            return data.map((el) => {
                el.img = el.images.length === 3 ? el.images[2].url : el.images[0].url
                el.title = el.name

                return el
            })
        })
        .catch(handleError)
}

function logout() {
    localStorage.removeItem('user')
}

function handleError(error) {
   
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);

      return Promise.reject(error.message)

}