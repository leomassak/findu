import axios from 'axios';
import { baseUrl } from '../configs/app-config';
import AppStorage from './storage';
import user from '../api/user';

async function request(method, url, data = {}, header = {}, params = {}) {
    if(!header['Content-Type']) header['Content-Type'] = 'application/json';
    try {
        const response = await axios({
            method,
            url: `${baseUrl}${url}`,
            data,
            headers: header,
            params,
        });
        if (response && response.data) {
            return response.data;
        }
    } catch (err) {
        console.log('err', err.response);
        return Promise.reject(new Error(err.response.data.code))
    }
}

async function authenticatedHeader(header) {
    const userToken = await AppStorage.getToken();
    header.Authorization = `Bearer ${userToken}`;
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
    params,
    data,
    header = {}
) {
    const userHeader = await authenticatedHeader(header);
    return request('get', url, data, userHeader, params);
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
    header = {},
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

async function deleteAuthenticated(
    url,
    data,
) {
    const userHeader = await authenticatedHeader({});
    return request('delete', url, data, userHeader);
}

export default {
    request,
    getRest,
    getAuthenticated,
    postRest,
    postAuthenticated,
    putRest,
    putAuthenticated,
    deleteAuthenticated,
}