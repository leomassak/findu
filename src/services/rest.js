import axios from 'axios';
import { baseUrl } from '../configs/app-config';

async function request(method, url, data = {}, header = {}) {
    if(!header['Content-Type']) header['Content-Type'] = 'application/json';
    try {
    const response = await axios({
        method,
        url: `${baseUrl}${url}`,
        data,
        header,
    }
    );
    if(response && response.data) {
        return response.data;
    }
    } catch(err) {
        console.log(err);
        return Promise.reject(new Error({ error: 'Não foi possível concluir a operação' }))
    }
}

async function authenticatedHeader(header) {
    const userToken = await AppStorage.getToken();
    header['Authorization'] = `Bearer ${userToken}`;
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
    header,
) {
    const userHeader = await authenticatedHeader(header);
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
    header,
) {
    const userHeader = await authenticatedHeader(header);
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
    header, 
) {
    const userHeader = await authenticatedHeader(header);
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