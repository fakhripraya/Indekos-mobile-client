import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppStyle } from '../../config/app.config';

export default function Agreement() {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        width: '100%',
        position: 'absolute',
        backgroundColor: 'white',
        height: AppStyle.screenSize.height * 0.6,
        bottom: AppStyle.screenSize.height * 0.1,
    },
})
