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
        await dispatch(saveToken(response.token));
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
