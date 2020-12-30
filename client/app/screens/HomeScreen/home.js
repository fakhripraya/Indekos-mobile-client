import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import React from 'react';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
