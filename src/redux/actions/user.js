import UserApi from '../../api/user';
import Errors from '../../utils/erros';
import AppStorage from '../../services/storage';

import { addLoading, removeLoading } from './loading';

export const ACTION_SAVE_USER = 'SAVE_USER';

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

export const updateUserData = (registerData) => async (dispatch) => {
    dispatch(addLoading());
    try {
        await UserApi.updateUserData(registerData); 
        const userData = await UserApi.getUser();
        console.log(userData);
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