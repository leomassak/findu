import Immutable from 'seamless-immutable';
import { FriendsActions } from '../actions';

const initialState = Immutable({
    friendsInfo: [],
});

export default function auth(state = initialState, action) {
    switch (action.type) {
      case FriendsActions.ACTION_SAVE_FRIENDS_INFO:
        return state.merge({
          friendsInfo: action.payload,
        });
      default:
        return state;
    }
  }

export function getFriendsInfo(state) {
  return state.friends.friendsInfo;
}
