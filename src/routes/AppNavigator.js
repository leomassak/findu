import * as React from 'react';
import {View, Text} from 'react-native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';


import LoginFlowScreen from '../screens/login/loginFlow/LoginFlowScreen';
import LoginScreen from '../screens/login/LoginScreen';
import PswRecoverScreen from '../screens/pswRecover/PswRecover';
import RedefinePswScreen from '../screens/pswRecover/RedefinePsw';

const AppStack = createStackNavigator();

function AppNavigator() {
  return (
    <AppStack.Navigator headerMode="none">
      
      <AppStack.Screen
        name="Flow"
        component={LoginFlowScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <AppStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <AppStack.Screen
        name="RedefinePsw"
        component={RedefinePswScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <AppStack.Screen
        name="PswRecover"
        component={PswRecoverScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

    </AppStack.Navigator>
  );
}

export default AppNavigator;
