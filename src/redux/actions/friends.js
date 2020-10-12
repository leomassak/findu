import FriendsApi from '../../api/friends';
import Errors from '../../utils/erros';

import { addLoading, removeLoading } from './loading';

export const ACTION_SAVE_FRIENDS_INFO = 'SAVE_FRIENDS_INFO';

export const ACTIONS_SAVE_ALL_FRIENDS = 'SAVE_ALL_FRIENDS';

export const saveFriendsInfo = (friendsInfo) => ({
    type: ACTION_SAVE_FRIENDS_INFO,
    payload: friendsInfo,
});

export const saveAllFriends = (allFriends) => ({
    type: ACTIONS_SAVE_ALL_FRIENDS,
    payload: allFriends,
});

export const getAllFriends = (queryParams, load) => async (dispatch) => {
    if (load) dispatch(addLoading());
    try {
        const friendsInfo = await FriendsApi.getAllFriends(queryParams);
        if (!queryParams) {
            dispatch(saveAllFriends(friendsInfo.friends));
        }
        return friendsInfo;
    } catch (err) {
        console.log('err', err);
        if (Errors.getAllFriends[err.message] !== undefined) {
            throw new Error(Errors.getAllFriends[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export const getAllFollowers = (queryParams, load) => async (dispatch) => {
    if (load) dispatch(addLoading());
    try {
        const followersInfo = await FriendsApi.getAllFollowers(queryParams);
        return followersInfo;
    } catch (err) {
        console.log('err', err);
        if (Errors.getAllFollowers[err.message] !== undefined) {
            throw new Error(Errors.getAllFollowers[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export const updateFriendStatus = (id, approved) => async (dispatch) => {
    dispatch(addLoading());
    try {
        await FriendsApi.updateFriendStatus(id, approved);
    } catch (err) {
        console.log('err', err);
        if (Errors.updateFriendStatus[err.message] !== undefined) {
            throw new Error(Errors.updateFriendStatus[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export const addFriend = (shareCode) => async (dispatch) => {
    dispatch(addLoading());
    try {
        await FriendsApi.addFriend(shareCode);
    } catch (err) {
        console.log('err', err);
        if (Errors.addFriend[err.message] !== undefined) {
            throw new Error(Errors.addFriend[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export const removeFriend = (friendId) => async (dispatch) => {
    dispatch(addLoading());
    try {
        await FriendsApi.removeFriend(friendId);
    } catch (err) {
        if (Errors.removeFriend[err.message] !== undefined) {
            throw new Error(Errors.removeFriend[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export const createFriendRule = (friendId, latLong, radius, userAreaName, areaType, actionType) => async (dispatch) => {
    dispatch(addLoading());
    try {
        await FriendsApi.createRule(friendId, latLong, radius, userAreaName, areaType, actionType);
    } catch (err) {
        if (Errors.createRule[err.message] !== undefined) {
            throw new Error(Errors.createRule[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
}

export const deleteFriendRule = (friendId, ruleId) => async (dispatch) => {
    dispatch(addLoading());
    try {
        await FriendsApi.deleteFriendRule(friendId, ruleId);
    } catch (err) {
        if (Errors.createRule[err.message] !== undefined) {
            throw new Error(Errors.createRule[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
}