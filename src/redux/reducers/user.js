import Immutable from 'seamless-immutable';
import { UserActions } from '../actions';

const initialState = Immutable({
    me: null,
    friend: {},
});

export default function auth(state = initialState, action) {
    switch (action.type) {
      case UserActions.ACTION_SAVE_USER:
        return state.merge({
          me: action.payload,
        });
      case UserActions.ACTION_SAVE_FRIEND:
        return state.merge({
          friend: action.payload,
        }); 
      default:
        return state;
    }
  }

export function getUser(state) {
  return state.user.me;
}

export function getFriend(state) {
  return state.user.friend;
}
