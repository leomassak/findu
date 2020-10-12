import RestService from '../services/rest';

function getAll(notificationsData) {
    return RestService.getAuthenticated('notifications/me', notificationsData);
};

export default {
    getAll,
}