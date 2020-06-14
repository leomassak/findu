import FriendsApi from '../../api/friends';
import Errors from '../../utils/erros';

import { addLoading, removeLoading } from './loading';

export const ACTION_SAVE_FRIENDS_INFO = 'SAVE_FRIENDS_INFO';

export const saveFriendsInfo = (friendsInfo) => ({
    type: ACTION_SAVE_FRIENDS_INFO,
    payload: friendsInfo,
  });

export const getAllFriends = (queryParams, load) => async (dispatch) => {
    if (load) dispatch(addLoading());
    try {
        const friendsInfo = await FriendsApi.getAllFriends(queryParams);
        dispatch(saveFriendsInfo(friendsInfo));
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