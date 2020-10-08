import RestService from '../services/rest';

function getAllFriends(queryParams) {
    return RestService.getAuthenticated('friends', queryParams);
}

function getAllFollowers(queryParams) {
    return RestService.getAuthenticated('friends/following-me', queryParams);
}

function addFriend(shareCode) {
    return RestService.postAuthenticated('friends/add', { shareCode });
}

function removeFriend(friendId) {
    return RestService.deleteAuthenticated(`friends/${friendId}`);
}

function updateFriendStatus(id, approved) {
    return RestService.putAuthenticated(`friends/${id}`, approved);
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
    return RestService.postAuthenticated(`friends/${friendId}/rules`, params);
}

export default {
    getAllFriends,
    addFriend,
    removeFriend,
    getAllFollowers,
    updateFriendStatus,
    createRule,
}