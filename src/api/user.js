import RestService from '../services/rest';

function registerUser(registerData) {
    return RestService.postRest('users', { ...registerData });
}

function getUser() {
    return RestService.getAuthenticated('users/me');
}

function updateUserData(registerData) {
    return RestService.putAuthenticated('user', registerData);
}

export default {
    registerUser,
    getUser,
    updateUserData,
}