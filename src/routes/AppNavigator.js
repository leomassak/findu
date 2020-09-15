import * as React from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import LoginFlowScreen from '../screens/login/loginFlow/LoginFlowScreen';
import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import PswRecoverScreen from '../screens/pswRecover/PswRecover';
import RedefinePswScreen from '../screens/pswRecover/RedefinePsw';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/editProfile/EditProfileScreen';
import ContactsScreen from '../screens/contacts/ContactsScreen';
import GroupsScreen from '../screens/groups/GroupsScreen';
import AddGroupInfoScreen from '../screens/addGroup/Addinfo/AddInfo';

import HomeNavigator from './HomeNavigator';

const AppStack = createStackNavigator();

function AppNavigator() {
    return (
        <AppStack.Navigator headerMode="none">
           <AppStack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            
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

            <AppStack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />

            <AppStack.Screen 
              name="HomeNavigator"
              component={HomeNavigator}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />

            <AppStack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />

            <AppStack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
             <AppStack.Screen
              name="Contacts"
              component={ContactsScreen}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
             <AppStack.Screen
              name="Groups"
              component={GroupsScreen}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
             <AppStack.Screen
              name="AddInfo"
              component={AddGroupInfoScreen}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
        </AppStack.Navigator>
    );
}

export default AppNavigator;
