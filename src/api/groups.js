import RestService from '../services/rest';

function getAllGroups(queryParams) {
    return RestService.getAuthenticated('groups', queryParams);
}

function addGroup(name, color, members) {
    return RestService.postAuthenticated('groups', { name, color, members });
}

function getById() {
    return RestService.postAuthenticated(`groups/${id}`);
}

function removeGroup(id) {
    return RestService.deleteAuthenticated(`groups/${id}`);
}

function updateGroup(id, params) {
    return RestService.putAuthenticated(`groups/${id}`, {...params });
}

function createRule(friendId, latLong, radius, name, areaType, action) {
    const params = {
        action,
        location: {
            type: areaType,
            coordinates: [latLong.longitude, latLong.latitude],
            radius,
            name,
        },
    };
    return RestService.postAuthenticated(`groups/${friendId}/rules`, params);
}

function deleteGroupRule(friendId, ruleId) {
    return RestService.deleteAuthenticated(`groups/${friendId}/rules/${ruleId}`,);
}

export default {
    getAllGroups,
    addGroup,
    removeGroup,
    updateGroup,
    createRule,
    deleteGroupRule,
    getById,
}