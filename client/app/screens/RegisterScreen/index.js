import React from 'react';
import { AppStyle } from '../../config/app.config';
import { StyleSheet, Text, View } from 'react-native';

export default function Register() {
    return (
        <View>
            <View style={styles.background_1} />
            <View style={styles.background_2} />
            <View style={styles.background_3} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    background_1: {
        backgroundColor: AppStyle.main_color
    },
    background_2: {
        backgroundColor: AppStyle.sub_main_color
    },
    background_3: {
        backgroundColor: AppStyle.third_main_color
    },
})
