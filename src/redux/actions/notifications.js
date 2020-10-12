import NotificationsApi from '../../api/notifications';
import Errors from '../../utils/erros';

import { addLoading, removeLoading } from './loading';

export const ACTIONS_SAVE_ALL_NOTIFICATIONS = 'SAVE_ALL_NOTIFICATIONS';

export const ACTIONS_SAVE_NOTIFICATIONS_LIMIT = 'SAVE_NOTIFICATIONS_LIMIT';

export const ACTION_SHOW_MESSAGE = 'ACTION_SHOW_MESSAGE';

export const saveAllNotifications = (allNotifications) => ({
    type: ACTIONS_SAVE_ALL_NOTIFICATIONS,
    payload: allNotifications,
});

export const saveNotificationsLimit = (limit) => ({
    type: ACTIONS_SAVE_NOTIFICATIONS_LIMIT,
    payload: limit,
});

export const getAll = (queryParams) => async (dispatch, getState) => {
    dispatch(addLoading());
    try {
        const notifications = await NotificationsApi.getAll(queryParams);
        if (queryParams.page === 1) {
            dispatch(saveAllNotifications(notifications.rows));
        } else {
            const newVector = getState().notifications.allNotifications.concat(notifications.rows);
            dispatch(saveAllNotifications(newVector));
        }
        dispatch(saveNotificationsLimit(notifications.rows.length < 15));
    } catch (err) {
        if (Errors.getAllFriends[err.message] !== undefined) {
            throw new Error(Errors.getAllFriends[err.message]);
        } else {
            throw new Error(Errors.undefined);
        }
    } finally {
        dispatch(removeLoading());
    }
};

export function showMessage(title, message, isError) {
  return (dispatch) => {
      dispatch({ type: ACTION_SHOW_MESSAGE, payload: { title, message, isError } });
      dispatch({ type: ACTION_SHOW_MESSAGE, payload: { title: null, message: null } });
  };
}

export function showPushMessage(data) {
  return (dispatch) => {
    dispatch(showMessage(data.title, data.body, false));
  };
}
