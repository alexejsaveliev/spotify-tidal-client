import config from '../config.json';
import { authHeader } from '../_helpers';
import axios from 'axios'
const queryString = require('querystring')

export const scheduling = {
    getSettingsList,
    saveSetting
}

function getSettingsList() {

    const reqOptions = {
        url: `${config.apiUrl}/scheduling/getSettingsList`,
        headers: authHeader()
    }
    
    return axios.get(reqOptions)
            .then(res => res.data)
            .catch(err => {
                console.log(err)
            })

}

function saveSetting(data) {
    const reqOptions = {
        method: 'POST',
        url: `${config.apiUrl}/scheduling/saveSetting`,
        headers: authHeader(),
        body: data
    }

    axios(reqOptions)
        .then((res) => {
            return res
        }).catch((err) => {
            return Promise.reject(err.message)
        });
}

