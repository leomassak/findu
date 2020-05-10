import * as React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginFlowScreen from '../screens/login/loginFlow/LoginFlowScreen';

const AppStack = createStackNavigator();

function AppNavigator() {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="Flow" component={LoginFlowScreen} />
    </AppStack.Navigator>
  );
}

export default AppNavigator;
