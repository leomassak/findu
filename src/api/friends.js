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
    return RestService.postAuthenticated(`friends/${id}`, approved);
}

export default {
    getAllFriends,
    addFriend,
    removeFriend,
    getAllFollowers,
    updateFriendStatus,
}