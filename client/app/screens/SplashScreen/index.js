import {
    popUpModalChange
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
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AuthService } from '../../config/app.config';

// creates the react spring animated view
const AnimatedView = animated(View)

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/"
})

// axios cancel source
var cancelSource

// Splash is the root of Splash stack
const Splash = ({ navigation }) => {

    // hooks
    const dispatch = useDispatch()
    const transitions = useTransition(null, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 1000 }
    })

    // event before component mount/update/leave
    useEffect(() => {

        // creates the cancel token source
        cancelSource = axios.CancelToken.source()

        // triggers the http post request to / url in the authentication service to fetch the logged in users
        api.get('/', {
            cancelToken: cancelSource.token
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    navigation.replace('AppStack');
                }
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    // TODO: development only
                    console.log('Request canceled', error.message);
                } else {
                    if (error.response.status === 401)
                        // go to welcome screen if user is not authorized
                        navigation.replace('WelcomeStack');
                    else
                        // dispatch the popUpModalChange actions to store the generic message modal state
                        dispatch(popUpModalChange({ show: true, title: 'ERROR', message: error.response.data.message }));
                }
            });
        return () => {
            // cancel the request (the message parameter is optional)
            cancelSource.cancel();
        }
    }, []);

    // Renders the Splash screen
    return transitions.map(({ key, props }) =>
        <AnimatedView key={key} style={[props, styles.container]}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading Application...</Text>
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

export default Splash
