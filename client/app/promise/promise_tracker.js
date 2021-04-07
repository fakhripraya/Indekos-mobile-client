import {
    View,
    Text,
    Modal,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import React from 'react';
import { AppStyle } from '../config/app.config';
import { usePromiseTracker } from "react-promise-tracker";
import { Normalize, NormalizeFont } from '../functions/normalize';

// PromiseSpinner is a spinner that triggers while the application doang the http request
const PromiseSpinner = () => {

    // Function Hooks
    const { promiseInProgress } = usePromiseTracker();
    // Renders the Promise Spinner component
    return (
        promiseInProgress &&
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
    )
}

// the render elements style
const styles = StyleSheet.create({

    modal: {
        flex: 1,
    },
    spinner: {
        flex: 1,
        elevation: 5,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: Normalize(20),
        justifyContent: 'center',
        maxWidth: Normalize(100),
        maxHeight: Normalize(100),
        borderRadius: Normalize(25),
        top: (AppStyle.windowSize.height - (AppStyle.windowSize.height / 2)) - (Normalize(100) / 2),
    },
});

export default PromiseSpinner;
