import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
  } from 'redux';
  import thunk from 'redux-thunk';
  
  import loadingReducer from './reducers/loading';
  import UserReducer from './reducers/user';
  
  export default () => {
    const store = createStore(
      combineReducers(
        {
          loading: loadingReducer,
          user: UserReducer,
        },
      ),
      compose(applyMiddleware(thunk)),
    );
  
    return store;
  };
  