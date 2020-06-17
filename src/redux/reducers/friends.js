import Immutable from 'seamless-immutable';
import { FriendsActions } from '../actions';

const initialState = Immutable({
  friendsInfo: [],
  allFriends: [],
});

export default function auth(state = initialState, action) {
  switch (action.type) {
    case FriendsActions.ACTION_SAVE_FRIENDS_INFO:
      return state.merge({
        friendsInfo: action.payload,
      });
    case FriendsActions.ACTIONS_SAVE_ALL_FRIENDS:
      return state.merge({
        allFriends: action.payload,
      });
    default:
      return state;
  }
}

export function getFriendsInfo(state) {
  return state.friends.friendsInfo;
}

export function getAllFriends(state) {
  return state.friends.allFriends;
}
