import RestService from '../services/rest';

function getAllGroups(queryParams) {
    return RestService.getAuthenticated('groups', queryParams);
}

function addGroup(name, color, members) {
    return RestService.postAuthenticated('groups', { name, color, members });
}

function removeGroup(id) {
    return RestService.deleteAuthenticated(`groups/${id}`);
}

function updateGroup(id, params) {
    return RestService.putAuthenticated(`groups/${id}`, {...params });
}

export default {
    getAllGroups,
    addGroup,
    removeGroup,
    updateGroup,
}