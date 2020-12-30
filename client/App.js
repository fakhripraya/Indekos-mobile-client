import React from 'react';
import axios from 'axios';
import store from './app/redux/store';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import AppStack from './app/route/app_stack.js';
import LoginStack from './app/route/login_stack';
import SplashStack from './app/route/splash_stack';
import WelcomeStack from './app/route/welcome_stack';
import PromiseSpinner from './app/promise/promise_tracker';
import CreateUserStack from './app/route/create_user_stack';
import RegistrationStack from './app/route/registration_stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// create a root stack navigator
const RootStack = createStackNavigator();

// set axios default configuration
axios.defaults.withCredentials = true;

// the root of all the applications stack
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="SplashStack">
            <RootStack.Screen
              name="SplashStack"
              component={SplashStack}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="WelcomeStack"
              component={WelcomeStack}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="RegistrationStack"
              component={RegistrationStack}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="LoginStack"
              component={LoginStack}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="CreateUserStack"
              component={CreateUserStack}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="AppStack"
              component={AppStack}
              options={{ headerShown: false }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </View>
      <PromiseSpinner />
    </Provider>
  );
}

// the render elements style
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
