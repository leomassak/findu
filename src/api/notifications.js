import RestService from '../services/rest';

function getAll(notificationsData) {
    console.log(notificationsData)
    return RestService.getAuthenticated('notifications/me', notificationsData);
};

export default {
    getAll,
}