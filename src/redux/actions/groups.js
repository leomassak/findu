import GroupsApi from '../../api/groups.js';
import Errors from '../../utils/erros';

import { addLoading, removeLoading } from './loading';

export const ACTION_SAVE_GROUPS_INFO = 'SAVE_FRIENDS_INFO';

export const ACTIONS_SAVE_ALL_GROUPS = 'SAVE_ALL_FRIENDS';

export const saveFriendsInfo = (groupsInfo) => ({
    type: ACTION_SAVE_GROUPS_INFO,
    payload: groupsInfo,
});

export const saveAllFriends = (allGroups) => ({
    type: ACTIONS_SAVE_ALL_GROUPS,
    payload: allGroups,
});

export const getAllGroups = (queryParams, load) => async (dispatch) => {
    if (load) dispatch(addLoading());
    try {
        const groupsInfo = await GroupsApi.getAllGroups(queryParams);
        if (!queryParams) {
            dispatch(saveAllGroups(groupsInfo.groups));
        }
        return groupsInfo;
    } catch (err) {
        console.log('err', err);
        if (Errors.getAllGroups[err.message] !== undefined) {
            throw new Error(Errors.getAllGroups[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export const updateGroup = (id, params) => async (dispatch) => {
    dispatch(addLoading());
    try {
        await GroupsApi.updateGroup(id, params);
    } catch (err) {
        if (Errors.updateGroup[err.message] !== undefined) {
            throw new Error(Errors.updateGroup[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export const addGroup = (name, color, members) => async (dispatch) => {
    dispatch(addLoading());
    try {
        await GroupsApi.addGroup(name, color, members);
    } catch (err) {
        if (Errors.addGroup[err.message] !== undefined) {
            throw new Error(Errors.addGroup[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export const removeGroup = (groupId) => async (dispatch) => {
    dispatch(addLoading());
    try {
        await GroupsApi.removeGroup(groupId);
    } catch (err) {
        if (Errors.removeGroup[err.message] !== undefined) {
            throw new Error(Errors.removeGroup[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};