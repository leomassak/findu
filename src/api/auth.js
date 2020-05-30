import RestService from '../services/rest';

function userLogin(loginData) {
    return RestService.postRest('auth', { ...loginData });
};

function forgotPassword(email) {
    return RestService.postRest('user/forgot-password', email);
}

function redefinePassword(params) {
    return RestService.postRest('user/redefine-password', params)
}

export default {
    userLogin,
    forgotPassword,
    redefinePassword,
}