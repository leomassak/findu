import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
  } from 'redux';
  import thunk from 'redux-thunk';
  
  import loadingReducer from './reducers/loading';
  import UserReducer from './reducers/user';
  import FriendsReducer from './reducers/friends';
  import NotificationsReducer from './reducers/notifications';
  
    const store = createStore(
      combineReducers(
        {
          loading: loadingReducer,
          user: UserReducer,
          friends: FriendsReducer,
          notifications: NotificationsReducer,
        },
      ),
      compose(applyMiddleware(thunk)),
    );
  
    export default store;
  