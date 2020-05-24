import { LoadingActions } from '../actions';

export default (
  state = false,
  action,
) => {
  switch (action.type) {
    case LoadingActions.ACTION_LOADING_START:
      return true;
    case LoadingActions.ACTION_LOADING_END:
      return false;
    default:
      return state;
  }
};

export function getLoading(state) {
  return state.loading;
}
