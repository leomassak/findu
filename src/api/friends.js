import RestService from '../services/rest';

function getAllFriends(queryParams) {
    return RestService.getAuthenticated('friends', queryParams);
}

function addFriend(shareCode) {
    return RestService.postAuthenticated('friends/add', { shareCode });
}

function removeFriend(friendId) {
    return RestService.deleteAuthenticated(`friends/${friendId}`);
}

export default {
    getAllFriends,
    addFriend,
    removeFriend,
}