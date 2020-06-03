import { UserActions } from '../actions';

const initialState = ({
    me: null,
});

export default function auth(state = initialState, action) {
    switch (action.type) {
      case UserActions.ACTION_SAVE_USER:
        return {
          ...state,
          me: action.payload,
        };
      default:
        return state;
    }
  }

export function getUser(state) {
  return state.user.me;
}
