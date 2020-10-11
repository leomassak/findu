import AuthApi from '../../api/auth';
import UserApi from '../../api/user';
import * as UserAction from './user';
import AppStorage from '../../services/storage';

import * as FriendsActions from './friends';
import * as GroupsActions from './groups';
import * as LoadingActions from './loading';
import * as NotificationsActions from './notifications';
import * as UserActions from './user';

import Errors from '../../utils/erros';

import { addLoading, removeLoading } from './loading';
import { saveUser } from './user';

export const ACTION_AUTHENTICATE = 'ACTION_AUTHENTICATE';

export const authenticate = (userData) => async (dispatch) => {
    let user = userData;
    dispatch(addLoading());
    try {
        const response = await AuthApi.userLogin(user);
        await AppStorage.createUserAuthData(response.token);
        const userData = await UserApi.getUser();
        dispatch(saveUser(userData))
        await dispatch(UserAction.changePushToken());
    } catch (err) {
        console.log(err);
        if (Errors.login[err.message] !== undefined) {
            throw new Error(Errors.login[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export const forgotPassword = (userData) => async (dispatch) => {
    dispatch(addLoading());
    try {
        await AuthApi.forgotPassword(userData);
    } catch (err) {
        if (Errors.recoverPsw[err.message] !== undefined) {
            throw new Error(Errors.recoverPsw[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export const redefinePassword = (email, token, password) => async (dispatch) => {
    dispatch(addLoading());
    try {
        const sendForm = {
            email,
            code: token,
            password,
        }
        await AuthApi.redefinePassword(sendForm);
    } catch (err) {
        if (Errors.redefinePsw[err.message] !== undefined) {
            throw new Error(Errors.redefinePsw[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export const verifyInitiaFlow = () => async (dispatch) => {
    dispatch(addLoading());
    try {
        let isLogged = false;
        const isAuthenticated = await AppStorage.isAuthenticated();
        if (isAuthenticated) {
            isLogged = true;
            const userData = await UserApi.getUser();
            dispatch(saveUser(userData))
            await dispatch(UserAction.changePushToken());
        }
        return isLogged;
    } catch (e) {
        console.log(e);
    } finally {
        dispatch(removeLoading());
    }
};

export const logout = () => async (dispatch, getState) => {
    try {
        AuthApi.userLogout(getState().user.me._id);
    } catch (err) {
        console.log(err);
    }
    await AppStorage.cleanAuth();
    FriendsActions.saveAllFriends([]);
    FriendsActions.saveFriendsInfo([]);
    GroupsActions.saveAllFriends([]);
    GroupsActions.saveFriendsInfo([]);
    NotificationsActions.saveNotificationsLimit(true);
    NotificationsActions.saveAllNotifications([]);
    UserAction.saveUser(null);
};
