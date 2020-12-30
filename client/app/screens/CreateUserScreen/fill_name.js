import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import { AppStyle } from '../../config/app.config';

export default function FillName({ navigation }) {

    // handle registration form submit
    function handleSubmit() {

        navigation.replace('PickRole');

    }

    return (
        <View style={styles.container}>
            <View style={styles.background_1} />
            <View style={styles.background_2} />
            <View style={styles.wrapper}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 / Dimensions.get("screen").fontScale }}>My <Text style={{ color: AppStyle.fourt_main_color }}>name</Text> is</Text>
                <View style={styles.input}>
                    <TextInput
                        onChangeText={(newVal) => { }}
                        textAlign="center"
                        style={{ flex: 1, paddingLeft: 0, fontSize: 20 / Dimensions.get("screen").fontScale }} />

                </View>
                <TouchableOpacity onPress={() => handleSubmit()}>
                    <View style={[styles.submitButton, { backgroundColor: AppStyle.sub_main_color }]}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale }}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyle.main_color,
    },
    background_1: {
        top: AppStyle.screenSize.height * 0.85,
        width: AppStyle.screenSize.width * 0.5,
        height: AppStyle.screenSize.width * 0.5,
        transform: [{ scale: 2 }],
        position: 'absolute',
        alignSelf: 'flex-start',
        backgroundColor: AppStyle.third_main_color,
        borderRadius: 100,
    },
    background_2: {
        top: AppStyle.screenSize.height * 0.85,
        width: AppStyle.screenSize.width * 0.5,
        height: AppStyle.screenSize.width * 0.5,
        transform: [{ scale: 2 }],
        position: 'absolute',
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(78, 122, 174, 0.5)',
        borderRadius: 100,
    },
    wrapper: {
        width: '100%',
        position: 'absolute',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: AppStyle.screenSize.height * 0.45,
        bottom: AppStyle.screenSize.height * 0.35,
    },
    input: {
        width: AppStyle.screenSize.width * 0.80,
        height: AppStyle.screenSize.height * 0.070,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    submitButton: {
        width: AppStyle.screenSize.width * 0.4,
        height: AppStyle.screenSize.height * 0.075,
        backgroundColor: 'grey',
        borderRadius: 100 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
