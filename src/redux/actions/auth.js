import AuthApi from '../../api/auth';
import AppStorage from '../../services/storage';

import Errors from '../../utils/erros';

import { addLoading, removeLoading } from './loading';

export const ACTION_AUTHENTICATE = 'ACTION_AUTHENTICATE';

export const saveToken = (token) => ({
  type: ACTION_LOADING_START,
  payload: token,
});

export const authenticate = (userData) => async (dispatch) => {
    dispatch(addLoading());
    try {
        const response = await AuthApi.userLogin(userData); 
        AppStorage.createUserAuthData(response.token);
        // await dispatch(saveToken(response.token));
    } catch (err) { 
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
        console.log(err);
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
    try {
        let isLogged = false;
        const isAuthenticated = await AppStorage.isAuthenticated();
        if (isAuthenticated) {
            isLogged = true;
            // const auth = await AuthService.get();
            // dispatch(saveAuthentication(auth));
            // await dispatch(getMe());
        }
        return isLogged;
    } catch (e) {
      //
    }
};

export const logout = async () => {
    await AppStorage.cleanAuth();
};
