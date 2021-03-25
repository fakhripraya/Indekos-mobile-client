import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { popUpModalChange, } from '../../redux';
import { SocialIcon } from 'react-native-elements';
import { trackPromise } from 'react-promise-tracker';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import { AppStyle, AuthService } from '../../config/app.config';
import LoginBackground from '../../components/Backgrounds/login_background';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/"
})

// Login is the root of Login stack
export default function Login({ navigation }) {

    // Redux dispatch
    const dispatch = useDispatch()

    // Function state
    const [inputUsername, setInputUsername] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    // handle login form submit
    function handleSubmit() {

        // triggers the http post request to /register url in the authentication service to process the registration
        trackPromise(
            api.post(
                '/login',
                {
                    username: inputUsername,
                    password: inputPassword
                }
            )
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        navigation.replace('OTP', {
                            tempUsername: inputUsername,
                            tempPassword: inputPassword,
                            otpType: 1
                        });
                    }
                })
                .catch(error => {
                    if (error.response.status !== 200) {
                        // dispatch the popUpModalChange actions to store the generic message modal state
                        dispatch(popUpModalChange({ show: true, title: 'ERROR', message: error.response.data.message }));
                    }
                })
        );
    }

    // Renders the Login screen
    return (
        <LoginBackground >
            <Text style={styles.title}>
                Login
                </Text>
            <View style={styles.inputContainer}>
                <View style={styles.authInputWrapper}>
                    <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(14), alignSelf: 'flex-start', bottom: Normalize(5) }}>
                        Username
                    </Text>
                    <View style={styles.authInput}>
                        <TextInput
                            onChangeText={(newVal) => setInputUsername(newVal)}
                            value={inputUsername}
                            textAlign="left"
                            style={{ width: '100%', paddingLeft: Normalize(10), fontSize: NormalizeFont(16) }} />
                    </View>
                </View>
                <View style={styles.authInputWrapper}>
                    <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(14), alignSelf: 'flex-start', bottom: Normalize(5) }}>
                        Password
                    </Text>
                    <View style={styles.authInput}>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(newVal) => setInputPassword(newVal)}
                            value={inputPassword}
                            textAlign="left"
                            style={{ width: '100%', paddingLeft: Normalize(10), fontSize: NormalizeFont(16) }} />
                    </View>
                </View>
                <View style={styles.o2AuthWrapper}>
                    <TouchableOpacityPrevent >
                        <SocialIcon iconSize={Normalize(24)} style={{ width: Normalize(40), height: Normalize(40), borderRadius: Normalize(100), marginRight: Normalize(5) }} button type='google' />
                    </TouchableOpacityPrevent>
                    <TouchableOpacityPrevent >
                        <SocialIcon iconSize={Normalize(24)} style={{ width: Normalize(40), height: Normalize(40), borderRadius: Normalize(100) }} button type='facebook' />
                    </TouchableOpacityPrevent>
                </View>
            </View>
            <View style={styles.submitBtn}>
                <TouchableOpacity style={{ width: Normalize(125) }} onPress={() => handleSubmit()}>
                    <Text style={[styles.button, { fontWeight: 'bold', backgroundColor: AppStyle.sub_main_color, fontSize: NormalizeFont(16) }]}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginBtn}>
                <Text style={{ fontSize: NormalizeFont(14) }} >
                    Forgot Password? <Text style={{ color: AppStyle.fourt_main_color }}>Click Here</Text>
                </Text>
            </View>
        </LoginBackground >
    )
}

// the render elements style
const styles = StyleSheet.create({
    title: {
        right: '10%',
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginTop: Normalize(80),
        fontSize: NormalizeFont(32),
    },
    inputContainer: {
        elevation: 5,
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: Normalize(10),
        borderRadius: Normalize(15),
        justifyContent: 'space-evenly',
        width: AppStyle.windowSize.width * 0.9,
    },
    authInputWrapper: {
        marginTop: Normalize(10),
        marginBottom: Normalize(10),
    },
    authInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        height: Normalize(40),
        alignSelf: 'flex-start',
        borderRadius: Normalize(10),
    },
    o2AuthWrapper: {
        flexDirection: 'row',
    },
    submitBtn: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: Normalize(75),
    },
    loginBtn: {
        alignSelf: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: Normalize(25),
    },
    button: {
        color: 'white',
        textAlign: 'center',
        paddingTop: Normalize(10),
        borderRadius: Normalize(50),
        paddingBottom: Normalize(10),
    },
})
