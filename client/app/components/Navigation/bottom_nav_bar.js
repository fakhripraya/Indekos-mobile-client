import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

const BottomNavBar = ({ state, navigation }) => {

    const { routes } = state;

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {map.routes((route) => {

                    return (
                        <TouchableOpacity style={styles.tabContainer}>
                            <Text>{route.name}</Text>
                        </TouchableOpacity>
                    )

                })}
            </View>
        </View>
    )
}

export default BottomNavBar

const styles = StyleSheet.create({

    wrapper: {
        elevation: 5,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'white',
    },
    container: {
        flexDirection: 'row',
    },
    tabContainer: {

    }

})
