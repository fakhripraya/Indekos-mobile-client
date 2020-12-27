import React from 'react';
import Home from '../screens/HomeScreen';
import Splash from '../screens/SplashScreen';
import Welcome from '../screens/WelcomeScreen';
import { Transition } from 'react-native-reanimated';
import { createAppContainer } from 'react-navigation';
import Register from '../screens/RegisterScreen/start';
import RegisterOtp from '../screens/RegisterScreen/otp';
import RegisterFinal from '../screens/RegisterScreen/final';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

const AppStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                headerTransparent: true
            }
        }
    }
);
const AuthStack = createStackNavigator(
    {
        Register: {
            screen: Register,
            navigationOptions: {
                headerTitle: '',
                headerTransparent: true
            }
        },
        RegisterOtp: {
            screen: RegisterOtp,
            navigationOptions: {
                headerTitle: '',
                headerTransparent: true
            }
        },
        RegisterFinal: {
            screen: RegisterFinal,
            navigationOptions: {
                headerTitle: '',
                headerTransparent: true
            }
        }
    }
);

export default createAppContainer(createAnimatedSwitchNavigator(
    {
        Splash: Splash,
        Welcome: Welcome,
        Auth: AuthStack,
        App: AppStack
    },
    {
        initialRouteName: 'Splash',
        transition: (
            <Transition.Together>
                <Transition.Out
                    type="scale"
                    durationMs={500}
                    interpolation="easeInOut"
                />
                <Transition.In
                    type="scale"
                    durationMs={500}
                    interpolation="easeInOut" />
            </Transition.Together>
        ),
    }
));