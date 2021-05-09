import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import Chats from '../screens/ChatScreen/chats';
import ChatMessager from '../screens/ChatScreen/chat_messager';

// Optimize navigation
enableScreens();

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the Chat
export default function ChatStack() {
    return (
        <NestedStack.Navigator screenOptions={{ headerTransparent: false, headerStyle: { height: 0 }, title: '', headerTintColor: 'rgba(255,255,255,0)' }}>
            <NestedStack.Screen name="Chats" component={Chats} />
            <NestedStack.Screen name="ChatMessager" component={ChatMessager} />
        </NestedStack.Navigator>
    );
}