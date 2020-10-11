import NotificationsApi from '../../api/notifications';
import Errors from '../../utils/erros';

import { addLoading, removeLoading } from './loading';

export const ACTIONS_SAVE_ALL_NOTIFICATIONS = 'SAVE_ALL_NOTIFICATIONS';

export const ACTIONS_SAVE_NOTIFICATIONS_LIMIT = 'SAVE_NOTIFICATIONS_LIMIT';

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
        dispatch(saveNotificationsLimit(notifications.rows.length < 10));
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
