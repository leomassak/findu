import messaging from '@react-native-firebase/messaging';

import UserApi from '../../api/user';
import Errors from '../../utils/erros';
import AppStorage from '../../services/storage';

import { addLoading, removeLoading } from './loading';

export const ACTION_SAVE_USER = 'SAVE_USER';
export const ACTION_SAVE_FRIEND = 'ACTION_SAVE_FRIEND';

export const saveUser = (userData) => ({
    type: ACTION_SAVE_USER,
    payload: userData,
});

export const register = (registerData) => async (dispatch) => {
    dispatch(addLoading());
    try {
        const response = await UserApi.registerUser(registerData);
        await AppStorage.createUserAuthData(response.token);
        const userData = await UserApi.getUser();
        dispatch(saveUser(userData));
    } catch (err) {
        if (Errors.register[err.message] !== undefined) {
            throw new Error(Errors.register[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export const changePushToken = () => async (dispatch) => {
    const tokenFcm = await messaging().getToken();
    dispatch(updateUserData({ pushToken: tokenFcm }));
};

export const updateUserData = (registerData) => async (dispatch) => {
    dispatch(addLoading());
    try {
        await UserApi.updateUserData(registerData);
        const userData = await UserApi.getUser();
        dispatch(saveUser(userData));
    } catch (err) {
        if (Errors.register[err.message] !== undefined) {
            throw new Error(Errors.register[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export const getUserById = (userId) => async (dispatch) => {
    dispatch(addLoading());
    try {
        const user = await UserApi.getById(userId);
        dispatch({
            type: ACTION_SAVE_FRIEND,
            payload: user,
        });
    } catch (err) {
        if (Errors.getById[err.message] !== undefined) {
            throw new Error(Errors.getById[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
}

export const getShareCode = () => async (dispatch) => {
    dispatch(addLoading());
    try {
        return await UserApi.getShareCode();
    } catch (err) {
        console.log(err.message);
        throw new Error(Errors.undefined);
    } finally {
        dispatch(removeLoading());
    }
};