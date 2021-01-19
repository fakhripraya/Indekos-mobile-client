import React, { useEffect } from 'react'
import { AppStyle } from '../../config/app.config';
import { Button, ScrollView, Dimensions, StyleSheet, Text, View } from 'react-native'

export default function RoomSelection() {

    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text style={styles.title}>Room Selection</Text>
            <View style={styles.absoluteContainer}  >
                <View>

                </View>
                <View>

                </View>
            </View>
            <View style={styles.container_1}>
                <Text>Period    </Text>
                <View>
                    <View style={styles.submitBtnText}>
                        <Text style={styles.button}>a</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container_2}>
                <Text>Date</Text>
                <View>
                    <View>
                    </View>
                    <View>
                    </View>
                    <View>
                    </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    title: {
        alignSelf: 'center',
        position: 'absolute',
        fontWeight: 'bold',
        justifyContent: 'center',
        top: AppStyle.screenSize.height / 9,
        fontSize: 20 / Dimensions.get("screen").fontScale,
    },
    absoluteContainer: {
        position: 'absolute',
        elevation: 5,
        borderRadius: 15,
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        bottom: AppStyle.screenSize.height / 2.75,
        width: AppStyle.screenSize.width * 0.9,
        height: AppStyle.screenSize.height * 0.4,
    },
    container_1: {
        flex: 0.75,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    container_2: {
        flex: 0.25,
        alignItems: 'flex-start',
    },
    submitBtnText: {
        backgroundColor: AppStyle.sub_main_color,
        fontSize: 16 / Dimensions.get("screen").fontScale
    },
    button: {
        paddingTop: 15,
        color: 'white',
        borderRadius: 50,
        paddingBottom: 15,
        textAlign: 'center',
        borderColor: 'white',
    },
})
