import {
    Text,
    View,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    accountRegistrationChange
} from '../../redux'
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppStyle } from '../../config/app.config';
import { SocialIcon } from 'react-native-elements';
import { trackPromise } from 'react-promise-tracker'
import { HostServer } from '../../config/app.config';
import Background from '../../components/Backgrounds/LoginBackground'

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + HostServer.host + HostServer.port + "/"
})

// Login is the root of Login stack
export default function Login({ navigation }) {

    // Redux dispatch
    const dispatch = useDispatch()
    // Function state
    const [inputValue, setInput] = useState('')

    // handle login form submit
    function handleSubmit() {

        // dispatch the accountRegistrationChange actions to store new user credentials  
        dispatch(accountRegistrationChange({ username: inputValue, password: "", otp_code: "" }))

        // triggers the http post request to /register url in the authentication service to process the registration
        trackPromise(
            api.post(
                '/register',
                { username: inputValue }
            )
                .then(response => {
                    if (response.status === 200) {
                        navigation.replace('AppStack');
                    }
                })
                .catch(error => {
                    if (error.response.status !== 200) {
                        // TODO: development only, delete when development done
                        console.log(error.response.data.message);
                    }
                })
        );
    }

    // Renders the Login screen
    return (
        <Background >
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Login
                </Text>
                <View style={styles.inputContainer}>
                    <View style={styles.authInputWrapper}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale, alignSelf: 'flex-start', bottom: 5 }}>
                            Username
                        </Text>
                        <View style={styles.authInput}>
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={(newVal) => setInput(newVal)}
                                value={inputValue}
                                textAlign="left"
                                style={{ flex: 1, paddingLeft: 10, fontSize: 16 }} />
                        </View>
                    </View>
                    <View style={styles.authInputWrapper}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale, alignSelf: 'flex-start', bottom: 5 }}>
                            Password
                        </Text>
                        <View style={styles.authInput}>
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={(newVal) => setInput(newVal)}
                                value={inputValue}
                                textAlign="left"
                                style={{ flex: 1, paddingLeft: 10, fontSize: 16 / Dimensions.get("screen").fontScale }} />
                        </View>
                    </View>
                    <View style={styles.o2AuthWrapper}>
                        <TouchableOpacity style={{ width: AppStyle.screenSize.width / 6, marginRight: 5 }}>
                            <SocialIcon button type='google' />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: AppStyle.screenSize.width / 6 }}>
                            <SocialIcon button type='facebook' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.submitBtn}>
                    <TouchableOpacity style={{ width: AppStyle.screenSize.width / 3 }} onPress={() => handleSubmit()}>
                        <Text style={[styles.button, { backgroundColor: AppStyle.sub_main_color, fontSize: 16 / Dimensions.get("screen").fontScale }]}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.loginBtn}>
                    <Text style={{ fontSize: 14 / Dimensions.get("screen").fontScale }} >
                        Forgot Password? <Text style={{ color: AppStyle.fourt_main_color }}>Click Here</Text>
                    </Text>
                </View>
            </View>
        </Background >
    )
}

// the render elements style
const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        flexDirection: 'column',
        top: AppStyle.screenSize.height * 0.375,
    },
    title: {
        right: '5%',
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        bottom: AppStyle.screenSize.height / 4,
        fontSize: 32 / Dimensions.get("screen").fontScale
    },
    inputContainer: {
        elevation: 5,
        borderRadius: 15,
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        bottom: AppStyle.screenSize.height / 4.5,
        width: AppStyle.screenSize.width - (AppStyle.screenSize.width * 0.1),
        height: AppStyle.screenSize.height - (AppStyle.screenSize.height * 0.55),
    },
    authInputWrapper: {
        width: '100%',
        marginTop: '5%',
        marginBottom: '5%',
    },
    authInput: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 7.5,
        borderColor: 'gray',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        height: AppStyle.screenSize.height * 0.075,
    },
    o2AuthWrapper: {
        flexDirection: 'row',
    },
    submitBtn: {
        flex: 1,
        bottom: AppStyle.screenSize.height / 7,
    },
    loginBtn: {
        flex: 1,
        flexDirection: 'row',
        bottom: AppStyle.screenSize.height / 9,
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
