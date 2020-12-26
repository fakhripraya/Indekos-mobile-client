import axios from 'axios';
import React, { useEffect } from 'react';
import { HostServer } from '../../config/app.config';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { animated, useTransition } from 'react-spring';

const AnimatedView = animated(View)

var cancelSource;

const api = axios.create({
    baseURL: "http://" + HostServer.host + HostServer.port + "/"
})

const Splash = ({ navigation }) => {

    useEffect(() => {

        if (cancelSource) {
            cancelSource.cancel();
        }

        cancelSource = axios.CancelToken.source()

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
                    console.log('Request canceled', error.message);
                } else {
                    if (error.response.status === 401) {
                        // TODO: delete after development and change to !== 401
                        console.log("unauthorized");
                        navigation.navigate('Welcome');
                    }
                    else
                        console.log(error.message);
                }
            });
        return () => {
            // when the component unmount
            // TODO: delete after development
            console.log("component unmounted");
            // cancel the request (the message parameter is optional)
            cancelSource.cancel();
        }
    }, []);

    const transitions = useTransition(null, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 1000 }
    })

    return transitions.map(({ key, props }) =>
        <AnimatedView key={key} style={[props, styles.container]}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>LOADING YOUR APP CHAMP</Text>
        </AnimatedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Splash
