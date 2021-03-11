import {
    userLocationState,
} from '../../redux';
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

// Loading is the root of Home stack
const Loading = () => {

    // hooks
    const dispatch = useDispatch()

    // trigger event after the first render to ask the user location based on their permission 
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

    // Renders the Loading screen
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ fontSize: Normalize(12) }}>Loading Home...</Text>
        </View>
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
