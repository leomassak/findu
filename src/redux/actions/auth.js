import AuthApi from '../../api/auth';
import AppStorage from '../../services/storage';

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
        console.log(err);
        throw new Error(err.message);
    } finally {
        dispatch(removeLoading());
    }
};
