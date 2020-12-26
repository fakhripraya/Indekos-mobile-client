import React, { useEffect } from 'react';
import { AppStyle } from '../../config/app.config';
import { TextInput, Button, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

console.log(Dimensions.get("screen"))
console.log(Dimensions.get("window"))

var ScreenSize = Dimensions.get("screen")
var WindowSize = Dimensions.get("window")

export default function Register({ navigation }) {

    useEffect(() => {
        return () => {
            // when the component unmount
            // TODO: delete after development
            console.log("component unmounted");
        }
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ width: '100%', height: WindowSize.height }}>
                    <View style={styles.container}>
                        <View style={styles.backgroundContainer} >
                            <View style={styles.background_1} />
                            <View style={styles.background_2} />
                        </View>
                        <View style={styles.backgroundContainer_2} >
                            <View style={styles.wrapper}>
                                <View style={styles.inputContainer}>
                                    <View style={styles.warnMessage}>
                                        <Text style={{ textAlign: 'center' }} >
                                            Make sure you have whatsapp account
                                        </Text>
                                        <Text style={{ textAlign: 'center' }} >
                                            when you logging in with phone number
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ alignSelf: 'flex-start', bottom: 5 }}>
                                            Phone / Email
                                        </Text>
                                        <View style={styles.authInput}>
                                            <TextInput style={{ flex: 1 }} />
                                        </View>
                                    </View>
                                    <View style={styles.o2AuthWrapper}>

                                    </View>
                                </View>
                                <View style={styles.submitBtn}>
                                    <Button title="Submit" />
                                </View>
                                <View style={styles.loginBtn}>
                                    <Text >
                                        Phone / Email
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    backgroundContainer: {
        flex: 0.40,
        backgroundColor: AppStyle.third_main_color
    },
    backgroundContainer_2: {
        flex: 0.60,
        backgroundColor: 'white'
    },
    background_1: {
        height: 100,
        width: 100,
        top: (ScreenSize.height * 0.45) - 100,
        transform: [{ scale: ScreenSize.scale / 2 }],
        position: 'absolute',
        alignSelf: 'flex-start',
        borderRadius: 100 / 2,
        backgroundColor: AppStyle.fourt_main_color
    },
    background_2: {
        height: 100,
        width: 100,
        transform: [{ scale: ScreenSize.scale * 2 }],
        left: (ScreenSize.width) * 0.8,
        bottom: (ScreenSize.height * 0.45),
        position: 'absolute',
        alignSelf: 'flex-end',
        borderRadius: 100 / 2,
        backgroundColor: AppStyle.main_color
    },
    wrapper: {
        flex: 1,
        bottom: 20,
        alignItems: 'center',
        flexDirection: 'column'
    },
    inputContainer: {
        flex: 4,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        elevation: 5,
        borderRadius: 15,
        backgroundColor: 'white',
        bottom: ScreenSize.height / 5
    },
    warnMessage: {
        padding: '7.5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
    },
    authInput: {
        alignSelf: 'flex-start',
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 7.5,
        flexDirection: 'row',
    },
    submitBtn: {
        flex: 1,
    },
    loginBtn: {
        flex: 1,
    }
})
