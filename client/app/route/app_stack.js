import React from 'react';
import Home from '../screens/HomeScreen/home';
import Chats from '../screens/ChatScreen/chats';
import Search from '../screens/SearchScreen/search';
import { enableScreens } from 'react-native-screens';
import MyKosan from '../screens/MyKosanScreen/my_kosan';
import BottomNavBar from '../components/Navigation/bottom_nav_bar';
import UserProfile from '../screens/UserProfileScreen/user_profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Optimize navigation
enableScreens();

// Create a bottom tab navigation
const Tab = createBottomTabNavigator();

export default function AppStack() {
    return (
        <Tab.Navigator tabBar={props => <BottomNavBar {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="MyKosan" component={MyKosan} />
            <Tab.Screen name="UserProfile" component={UserProfile} />
            <Tab.Screen name="Chats" component={Chats} />
        </Tab.Navigator>
    )
}
