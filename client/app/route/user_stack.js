import React from 'react';
import { enableScreens } from 'react-native-screens';
import UserProfile from '../screens/UserProfileScreen/user_profile';
import UserSettings from '../screens/UserProfileScreen/user_setting';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Optimize navigation
enableScreens();

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the Chat
export default function ChatStack() {
    return (
        <NestedStack.Navigator screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerTransparent: false,
            headerStyle: { height: 0 },
            title: '',
            headerTintColor: 'rgba(255,255,255,0)'
        }}>
            <NestedStack.Screen name="UserProfile" component={UserProfile} />
            <NestedStack.Screen name="UserSettings" component={UserSettings} />
        </NestedStack.Navigator>
    );
}