import RestService from '../services/rest';

function registerUser(registerData) {
    return RestService.postRest('users', { ...registerData });
}

export default {
    registerUser,
}