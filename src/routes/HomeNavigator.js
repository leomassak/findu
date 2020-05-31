import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/customDrawer/CustomDrawer';

import HomeScreen from '../screens/home/HomeScreen';

const Drawer = createDrawerNavigator();

function HomeNavigator() {
    return(
        <Drawer.Navigator 
            overlayColor="transparent"
            drawerType="back"
            drawerContent={props => <CustomDrawer {...props} />}
            drawerStyle={{
                paddingHorizontal: '4%',
                paddingVertical: '5%',
            }}
            screenOptions={{
                swipeEnabled: false,
            }}

        >
            <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
    );
}

export default HomeNavigator;