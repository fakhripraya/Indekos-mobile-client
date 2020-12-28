import axios from 'axios';
import React, { useEffect } from 'react';
import { HostServer } from '../../config/app.config';
import {
    animated,
    useTransition
} from 'react-spring';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View
} from 'react-native';

// creates the react spring animated view
const AnimatedView = animated(View)

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + HostServer.host + HostServer.port + "/"
})

// axios cancel source
var cancelSource

// Splash is the root of Splash stack
const Splash = ({ navigation }) => {

    // hooks
    const transitions = useTransition(null, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 1000 }
    })

    useEffect(() => {

        // creates the cancel token source
        cancelSource = axios.CancelToken.source()

        // triggers the http post request to / url in the authentication service to fetch the logged in users
        api.get('/', {
            cancelToken: cancelSource.token
        })
            .then(response => {
                if (response.status === 200) {
                    // TODO: set the state to logged in
                    console.log(response.status);
                    navigation.navigate('App');
                }
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    // TODO: development only
                    console.log('Request canceled', error.message);
                } else {
                    if (error.response.status === 401) {
                        // TODO: delete after development and change to !== 401
                        console.log("unauthorized");
                        navigation.navigate('Welcome');
                    }
                    else
                        console.log(error.message); // TODO: development only, delete when development done
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
            <Text>LOADING YOUR APP CHAMP</Text>
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
