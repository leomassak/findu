import Immutable from 'seamless-immutable';
import { NotificationsActions } from '../actions';

const initialState = Immutable({
  allNotifications: [],
  limit: true,
  title: null,
  message: null,
  isError: false,
});

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case NotificationsActions.ACTIONS_SAVE_ALL_NOTIFICATIONS:
        return state.merge({
            allNotifications: action.payload,
        });
    case NotificationsActions.ACTIONS_SAVE_NOTIFICATIONS_LIMIT:
        return state.merge({
            limit: action.payload,
        });
    case NotificationsActions.ACTION_SHOW_MESSAGE:
        return state.merge({
          title: action.payload.title,
          message: action.payload.message,
          isError: action.payload.isError,
        });
    default:
      return state;
  }
}

export function getAll(state) {
  return state.notifications.allNotifications;
}

export function getLimit(state) {
    return state.notifications.limit;
}

export function getMessage(state) {
  return state.notifications.message;
}

export function getTitle(state) {
  return state.notifications.title;
}

export function getIsError(state) {
  return state.notifications.isError;
}
