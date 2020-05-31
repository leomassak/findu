import UserApi from '../../api/user';
import Errors from '../../utils/erros';
import AppStorage from '../../services/storage';

import { addLoading, removeLoading } from './loading';

export const register = (registerData) => async (dispatch) => {
    dispatch(addLoading());
    try {
        const response = await UserApi.registerUser(registerData); 
        AppStorage.createUserAuthData(response.token);
        // await dispatch(saveToken(response.token));
    } catch (err) {
        console.log(err);
        if (Errors.register[err.message] !== undefined) {
            throw new Error(Errors.register[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};