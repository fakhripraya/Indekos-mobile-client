import {
    userLocationState,
} from '../../redux';
import {
    animated,
    useTransition,
} from 'react-spring';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { Normalize } from '../../config/app.config';

// creates the react spring animated view
const AnimatedView = animated(View)

// Loading is the root of Home stack
const Loading = ({ navigation }) => {

    // hooks
    const dispatch = useDispatch()
    const transitions = useTransition(null, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 1000 }
    })

    // trigger event on render
    useEffect(() => {
        (async () => {

            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {

                dispatch(userLocationState({ locationPermission: false, location: null, locationFlag: true }));
                return;
            }

            try {

                let location = await Location.getCurrentPositionAsync({});
                dispatch(userLocationState({ locationPermission: true, location: location, locationFlag: true }));
                return;

            } catch (e) {

                dispatch(userLocationState({ locationPermission: false, location: null, locationFlag: true }));
                return;

            }
        })();
    }, []);

    // Renders the Splash screen
    return transitions.map(({ key, props }) =>
        <AnimatedView key={key} style={[props, styles.container]}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ fontSize: Normalize(12) }}>Loading Home...</Text>
        </AnimatedView>
    )
}

// the render elements style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Loading
