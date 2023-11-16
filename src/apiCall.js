import axios from 'axios';

export async function sendAPICall(method, endpoint, token = "", body = {}) {
    const callUrl = process.env.API_DB_HOST + (endpoint[0] !== '/' ? '/' : '') + endpoint;

    return axios({
        method: method,
        url: callUrl,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        data: body
    });
}
