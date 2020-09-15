import Immutable from 'seamless-immutable';
import { GroupsActions } from '../actions';

const initialState = Immutable({
  groupsInfo: [],
  allGroups: [],
});

export default function groups(state = initialState, action) {
  switch (action.type) {
    case GroupsActions.ACTION_SAVE_GROUPS_INFO:
      return state.merge({
        groupsInfo: action.payload,
      });
    case GroupsActions.ACTIONS_SAVE_ALL_GROUPS:
      return state.merge({
        allGroups: action.payload,
      });
    default:
      return state;
  }
}

export function getGroupsInfo(state) {
  return state.groups.groupsInfo;
}

export function getAllGroups(state) {
  return state.groups.allGroups;
}
