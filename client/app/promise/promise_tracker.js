import React from 'react';
import { animated, useTransition } from 'react-spring'
import { usePromiseTracker } from "react-promise-tracker";
import {
    ActivityIndicator,
    View,
    StyleSheet
} from 'react-native';

const AnimatedView = animated(View)

// PromiseSpinner is a spinner that triggers while the application doang the http request
const PromiseSpinner = (props) => {

    // Function Hooks
    const { promiseInProgress } = usePromiseTracker();
    const transitions = useTransition(null, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 3000 }
    })

    // Renders the Promise Spinner component
    return transitions.map(({ key, props }) =>
        promiseInProgress &&
        <AnimatedView key={key} style={[props, styles.container]}>
            <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" />
        </AnimatedView>
    )
}

// the render elements style
const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        position: 'absolute',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    spinner: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        position: 'absolute',
    }
});

export default PromiseSpinner;
