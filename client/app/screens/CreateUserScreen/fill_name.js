import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppStyle } from '../../config/app.config';
import { trackPromise } from 'react-promise-tracker';
import { UserService } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import { FirstBackground } from '../../components/Backgrounds/create_user_background';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + UserService.host + UserService.port + "/"
})

export default function FillName({ navigation }) {

    // Hooks
    const dispatch = useDispatch()

    // Function states
    const [inputValue, setInput] = useState('')

    // handle registration form submit
    function handleSubmit() {

        // triggers the http patch request to /update/signed url to update the created user displayname
        trackPromise(
            api.patch('/update/signed', {
                displayname: inputValue,
            })
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        navigation.replace('PickRole', {
                            tempDisplayname: inputValue,
                        });
                    }
                })
                .catch(error => {
                    if (error.response.status === 401)
                        // go to welcome screen if user is not authorized
                        navigation.replace('WelcomeStack');
                    else
                        // dispatch the popUpModalChange actions to store the generic message modal state
                        dispatch(popUpModalChange({ show: true, title: 'ERROR', message: error.response.data.message }));
                })
        );
    }

    return (
        <FirstBackground>
            <View style={styles.wrapper}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: NormalizeFont(18) }}>My <Text style={{ color: AppStyle.fourt_main_color }}>name</Text> is</Text>
                <View style={styles.input}>
                    <TextInput
                        textAlign="center"
                        value={inputValue}
                        onChangeText={(newVal) => setInput(newVal)}
                        style={{ flex: 1, fontSize: NormalizeFont(16) }} />

                </View>
            </View>
            <View style={styles.submitBtn}>
                <TouchableOpacityPrevent style={{ width: Normalize(125) }} onPress={() => handleSubmit()}>
                    <Text style={[styles.button, { backgroundColor: AppStyle.sub_main_color, fontSize: NormalizeFont(14), fontWeight: 'bold', }]}>
                        Submit
                    </Text>
                </TouchableOpacityPrevent>
            </View>
        </FirstBackground>
    )
}

const styles = StyleSheet.create({

    wrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: AppStyle.screenSize.height * 0.5,
        marginTop: AppStyle.screenSize.height * 0.1,
    },
    input: {
        height: Normalize(40),
        backgroundColor: 'white',
        borderRadius: Normalize(10),
        width: AppStyle.screenSize.width * 0.8,
    },
    submitBtn: {
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: Normalize(75),
        width: AppStyle.windowSize.width,
    },
    button: {
        color: 'white',
        textAlign: 'center',
        paddingTop: Normalize(10),
        borderRadius: Normalize(50),
        paddingBottom: Normalize(10),
    },

})
