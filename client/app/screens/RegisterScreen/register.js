import {
    Text,
    View,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    accountRegistrationChange,
    popUpModalChange
} from '../../redux'
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppStyle } from '../../config/app.config';
import { SocialIcon } from 'react-native-elements';
import { trackPromise } from 'react-promise-tracker'
import { AuthService } from '../../config/app.config';
import Background from '../../components/Backgrounds/registration_background';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/",
})

// Register is the root of registration stack
export default function Register({ navigation }) {

    // Variables
    // waRegex is a regular expression to match standard phone string
    var regWA = /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/;
    // regEmail is a regular expression to match standard email string
    var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Function states
    const [inputValue, setInput] = useState('')
    // Hooks
    const dispatch = useDispatch()

    // Functions
    // handle Email validation
    function handleValidateEmail(value) {

        if (regEmail.test(value) === true) {
            return true;
        }

        return false;
    };

    // handle WhatsApp validation
    function handleValidatePhone(value) {

        if (value.length > 8) {
            if (value.includes('+')) {
                var subPhone = value.split('+', 2);
                if (isNaN(subPhone[1])) {
                    return false;
                }
            }
            else {
                if (isNaN(value)) {
                    return false;
                }
            }
        }

        if (regWA.test(value) === true) {
            return true;
        }

        return false;
    };

    // handle registration form submit
    function handleSubmit() {

        // validation

        var count = 0;

        if (!handleValidatePhone(inputValue)) {
            count++;
        }
        if (!handleValidateEmail(inputValue)) {
            count++;
        }
        if (count == 2) {

            dispatch(popUpModalChange({ show: true, title: 'ERROR', message: "Invalid Phone number / Email" }));
            return;

        }

        // dispatch the accountRegistrationChange actions to store new user credentials  
        dispatch(accountRegistrationChange({ username: inputValue }))

        // triggers the http post request to /register url in the authentication service to process the registration
        trackPromise(
            api.post(
                '/register',
                { username: inputValue }
            )
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        navigation.replace('RegisterOtp');
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

    // Renders the Register screen
    return (
        <Background>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Register
                </Text>
                <View style={styles.inputContainer}>
                    <View style={styles.warnMessage}>
                        <Text style={styles.warnMessageText} >
                            Make sure you have whatsapp
                        </Text>
                        <Text style={styles.warnMessageText} >
                            account when you registering your
                        </Text>
                        <Text style={styles.warnMessageText} >
                            phone number
                        </Text>
                    </View>
                    <View style={styles.authInputWrapper}>
                        <Text style={styles.authInputTitle}>
                            Phone / Email
                        </Text>
                        <View style={styles.authInput}>
                            <TextInput
                                textAlign="left"
                                value={inputValue}
                                onChangeText={(newVal) => setInput(newVal)}
                                style={{ flex: 1, paddingLeft: 10, fontSize: 16 / Dimensions.get("screen").fontScale }} />
                        </View>
                    </View>
                    <View style={styles.o2AuthWrapper}>
                        <TouchableOpacityPrevent style={{ width: AppStyle.screenSize.width / 6, marginRight: 5 }}>
                            <SocialIcon button type='google' />
                        </TouchableOpacityPrevent>
                        <TouchableOpacityPrevent style={{ width: AppStyle.screenSize.width / 6 }}>
                            <SocialIcon button type='facebook' />
                        </TouchableOpacityPrevent>
                    </View>
                </View>
                <View style={styles.submitBtn}>
                    <TouchableOpacityPrevent style={{ width: AppStyle.screenSize.width / 3 }} onPress={() => handleSubmit()}>
                        <Text style={[styles.button, styles.submitBtnText]}>
                            Submit
                        </Text>
                    </TouchableOpacityPrevent>
                </View>
                <View style={styles.loginBtn}>
                    <Text style={{ fontSize: 16 / Dimensions.get("screen").fontScale }} >
                        Have an account ?{' '}
                    </Text>
                    <TouchableOpacityPrevent onPress={() => { navigation.push('LoginStack'); }} >
                        <Text style={{ color: AppStyle.fourt_main_color, fontSize: 16 / Dimensions.get("screen").fontScale }}>
                            Login
                        </Text>
                    </TouchableOpacityPrevent>
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
        top: AppStyle.screenSize.height * 0.3,
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
        height: AppStyle.screenSize.height - (AppStyle.screenSize.height * 0.5),
    },
    warnMessage: {
        width: '100%',
        paddingTop: '5%',
        borderRadius: 15,
        paddingBottom: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        height: AppStyle.screenSize.height * 0.15,
        backgroundColor: AppStyle.fourt_main_color,
    },
    warnMessageText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14 / Dimensions.get("screen").fontScale,
    },
    authInputWrapper: {
        width: '100%',
        marginTop: '10%',
        marginBottom: '5%'
    },
    authInputTitle: {
        fontWeight: 'bold',
        alignSelf: 'flex-start', bottom: 5,
        fontSize: 14 / Dimensions.get("screen").fontScale,
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
    submitBtnText: {
        backgroundColor: AppStyle.sub_main_color,
        fontSize: 16 / Dimensions.get("screen").fontScale
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
