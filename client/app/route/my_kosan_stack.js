import React from 'react';
import { enableScreens } from 'react-native-screens';
import MyKosanDetail from '../screens/MyKosanScreen/my_kosan_detail';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Optimize navigation
enableScreens();

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the MyKosanStack
export default function MyKosanStack() {
    return (
        <NestedStack.Navigator screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal",
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerTransparent: false,
            headerStyle: { height: 0 },
            title: '',
            headerTintColor: 'rgba(255,255,255,0)'
        }}>
            <NestedStack.Screen name="MyKosanDetail" component={MyKosanDetail} />
        </NestedStack.Navigator>
    );
}