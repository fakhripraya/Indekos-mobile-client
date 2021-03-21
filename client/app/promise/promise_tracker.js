import {
    View,
    Text,
    Modal,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import React from 'react';
import { AppStyle } from '../config/app.config';
import { Normalize, NormalizeFont } from '../functions/normalize';
import { animated, useTransition } from 'react-spring';
import { usePromiseTracker } from "react-promise-tracker";

// spring animated view element
const AnimatedView = animated(View)

// PromiseSpinner is a spinner that triggers while the application doang the http request
const PromiseSpinner = () => {

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
            <Modal
                animationType="fade"
                transparent={true}
                style={styles.modal}
            >
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color={AppStyle.main_color} />
                    <Text style={{ fontSize: NormalizeFont(14) }}>Loading...</Text>
                </View>
            </Modal>
        </AnimatedView>
    )
}

// the render elements style
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    modal: {
        flex: 1,
    },
    spinner: {
        flex: 1,
        elevation: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        maxWidth: Normalize(100),
        maxHeight: Normalize(100),
        borderRadius: Normalize(25),
        left: (AppStyle.screenSize.width - (AppStyle.screenSize.width / 2)) - (AppStyle.screenSize.width * 0.167),
        top: (AppStyle.screenSize.height - (AppStyle.screenSize.height / 2)) - (AppStyle.screenSize.height * 0.15),
    },
});

export default PromiseSpinner;
