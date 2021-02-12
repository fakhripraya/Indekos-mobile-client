import React from 'react';
import Home from '../screens/HomeScreen/home';
import Chats from '../screens/ChatScreen/chats';
import Search from '../screens/SearchScreen/search';
import MyKosan from '../screens/MyKosanScreen/my_kosan';
import BottomNavBar from '../components/Navigation/bottom_nav_bar';
import UserProfile from '../screens/UserProfileScreen/user_profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function AppStack() {

    return (
        <Tab.Navigator tabBar={props => <BottomNavBar {...props} />}>
            <Tab.Screen options={{ tabBarVisible: false }} name="Home" component={Home} />
            <Tab.Screen options={{ tabBarVisible: false }} name="Search" component={Search} />
            <Tab.Screen options={{ tabBarVisible: false }} name="MyKosan" component={MyKosan} />
            <Tab.Screen options={{ tabBarVisible: false }} name="UserProfile" component={UserProfile} />
            <Tab.Screen options={{ tabBarVisible: false }} name="Chats" component={Chats} />
        </Tab.Navigator>
    )
}
