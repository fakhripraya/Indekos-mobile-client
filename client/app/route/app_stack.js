import React from 'react';
import Home from '../screens/HomeScreen/home';
import Chats from '../screens/ChatScreen/chats';
import Loading from '../screens/HomeScreen/loading';
import Search from '../screens/SearchScreen/search';
import { useSelector, useDispatch } from 'react-redux';
import MyKosan from '../screens/MyKosanScreen/my_kosan';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavBar from '../components/Navigation/bottom_nav_bar';
import UserProfile from '../screens/UserProfileScreen/user_profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Create a bottom tab navigation
const Tab = createBottomTabNavigator();

// create a nested stack navigator
const NestedStack = createStackNavigator();

export default function AppStack() {

    const userLocationFlag = useSelector(state => state.userReducer.locationFlag);

    if (userLocationFlag === false) {
        return (
            <NestedStack.Navigator screenOptions={{ headerShown: false }}>
                <NestedStack.Screen name="Loading" component={Loading} />
            </NestedStack.Navigator>
        )
    } else {
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
}
