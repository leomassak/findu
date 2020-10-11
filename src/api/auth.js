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

function userLogout(params) {
    console.log({ userId: params });
    return RestService.postAuthenticated('auth/logout', { userId: params });
};

export default {
    userLogin,
    forgotPassword,
    redefinePassword,
    userLogout,
}