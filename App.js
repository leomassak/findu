/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import PushMessage from './src/components/pushMessage/PushMessage';
import messaging from '@react-native-firebase/messaging';

import store from './src/redux/store';
import AppNavigator from './src/routes/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <PushMessage />
    </Provider>
  );
};

export default App;
