import RestService from '../services/rest';

function registerUser(registerData) {
    console.log('req data', registerData);
    return RestService.postRest('users', { ...registerData });
}

export default {
    registerUser,
}