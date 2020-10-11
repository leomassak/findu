import Immutable from 'seamless-immutable';
import { NotificationsActions } from '../actions';

const initialState = Immutable({
  allNotifications: [],
  limit: true,
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
