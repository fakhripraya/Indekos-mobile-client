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
import { trackPromise } from 'react-promise-tracker';
import { UserService } from '../../config/app.config';
import { AppStyle, Normalize } from '../../config/app.config';
import { FirstBackground } from '../../components/Backgrounds/create_user_background';

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
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: Normalize(18) }}>My <Text style={{ color: AppStyle.fourt_main_color }}>name</Text> is</Text>
                <View style={styles.input}>
                    <TextInput
                        textAlign="center"
                        value={inputValue}
                        onChangeText={(newVal) => setInput(newVal)}
                        style={{ flex: 1, paddingLeft: 0, fontSize: Normalize(14) }} />

                </View>
                <TouchableOpacity onPress={() => handleSubmit()}>
                    <View style={[styles.submitButton, { backgroundColor: AppStyle.sub_main_color }]}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: Normalize(14) }}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </FirstBackground>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: AppStyle.screenSize.height * 0.45,
        bottom: AppStyle.screenSize.height * 0.35,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: Normalize(10),
        width: AppStyle.screenSize.width * 0.80,
        height: AppStyle.screenSize.height * 0.070,
    },
    submitButton: {
        alignItems: 'center',
        backgroundColor: 'grey',
        justifyContent: 'center',
        borderRadius: Normalize(50),
        width: AppStyle.screenSize.width * 0.4,
        height: AppStyle.screenSize.height * 0.075,
    }
})
