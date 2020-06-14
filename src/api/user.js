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

function getById(userId) {
    return RestService.getAuthenticated(`users/${userId}`);
}

function updateUserLocation(locationData) {
    return RestService.postAuthenticated('locations', locationData);
}

function getShareCode() {
    return RestService.getAuthenticated('friends/share');
}

export default {
    registerUser,
    getUser,
    updateUserData,
    getById,
    updateUserLocation,
    getShareCode,
}