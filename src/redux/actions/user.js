import UserApi from '../../api/user';

import { addLoading, removeLoading } from './loading';

export const register = (registerData) => async (dispatch) => {
    dispatch(addLoading());
    try {
        const response = await UserApi.registerUser(registerData); 
        return response;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    } finally {
        dispatch(removeLoading());
    }
};