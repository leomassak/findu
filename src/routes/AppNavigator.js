import * as React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginFlowScreen from '../screens/login/loginFlow/LoginFlowScreen';
import LoginScreen from '../screens/login/LoginScreen';

const AppStack = createStackNavigator();

function AppNavigator() {
  return (
    <AppStack.Navigator headerMode="none">
      
      <AppStack.Screen name="Flow" component={LoginFlowScreen} />

      <AppStack.Screen name="Login" component={LoginScreen} />


    </AppStack.Navigator>
  );
}

export default AppNavigator;
