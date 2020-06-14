import axios from 'axios';
import { baseUrl } from '../configs/app-config';
import AppStorage from './storage';

async function request(method, url, data = {}, header = {}) {
    if (!header['Content-Type']) header['Content-Type'] = 'application/json';
    try {
        const response = await axios({
            method,
            url: `${baseUrl}${url}`,
            data,
            headers: header,
        });
        if (response && response.data) {
            return response.data;
        }
    } catch (err) {
        return Promise.reject(new Error(err.response.data.code))
    }
}

async function authenticatedHeader(header) {
    const userToken = await AppStorage.getToken();
    header['authorization'] = `Bearer ${userToken}`;
    return header;
}

async function getRest(
    url,
    data,
) {
    return request('get', url, data);
};

async function getAuthenticated(
    url,
    data,
) {
    const userHeader = await authenticatedHeader({});
    return request('get', url, data, userHeader);
};

async function postRest(
    url,
    data,
    header,
) {
    return request('post', url, data, header);
};

async function postAuthenticated(
    url,
    data,
) {
    const userHeader = await authenticatedHeader({});
    return request('post', url, data, userHeader);
};

async function putRest(
    url,
    data,
    header,
) {
    return request('put', url, data, header);
};

async function putAuthenticated(
    url,
    data,
) {
    const userHeader = await authenticatedHeader({});
    return request('put', url, data, userHeader);
};

export default {
    request,
    getRest,
    getAuthenticated,
    postRest,
    postAuthenticated,
    putRest,
    putAuthenticated,
}