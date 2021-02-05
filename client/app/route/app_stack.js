import React from 'react';
import { StyleSheet } from 'react-native';
import Home from '../screens/HomeScreen/home';
import Chats from '../screens/HomeScreen/chats';
import Search from '../screens/HomeScreen/search';
import MyKosan from '../screens/HomeScreen/my_kosan';
import UserProfile from '../screens/HomeScreen/user_profile';
import BottomNavBar from '../components/Navigation/bottom_nav_bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

const styles = StyleSheet.create({})
