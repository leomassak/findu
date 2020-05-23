import RestService from '../services/rest';

function userLogin(loginData) {
    return RestService.postRest('auth', { ...loginData });
};

function forgotPassword(email) {
    return RestService.postRest('user/forgot-password', email);
}

function redefinePassword(email, code, password) {
    return RestService.postRest('redefine-password', { email, code, password })
}

export default {
    userLogin,
    forgotPassword,
    redefinePassword,
}