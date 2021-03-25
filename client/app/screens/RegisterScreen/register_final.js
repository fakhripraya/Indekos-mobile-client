import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    popUpModalChange
} from '../../redux';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppStyle } from '../../config/app.config';
import { trackPromise } from 'react-promise-tracker';
import { AuthService } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';
import RegisterBackground from '../../components/Backgrounds/registration_background';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/"
})

// RegisterFinal is the final screen of the registration stack
export default function RegisterFinal({ route, navigation }) {

    // Get navigation parameter
    const tempUsername = route.params.tempUsername;

    // Function state
    const [passwordValue, setPassword] = useState('')
    const [confirmPasswordValue, setConfirmPassword] = useState('')
    const [popFlag, setPopFlag] = useState('none')
    const [popMessage, setPopMessage] = useState('')
    const [popColor, setPopColor] = useState(AppStyle.error)

    // Hooks
    const dispatch = useDispatch()

    // Determine the password level
    // Weak / standard / Strong
    // TODO: belum di implementasi
    function onChangePassword(value) {

        let PasswordLevel = 0;

        var backslash = new RegExp("\\\\", "");

        if (value.length > 6) {
            if ((backslash.test(value) || /[$-/:-@{-~!-#^_`[\]]/.test(value)) && /[a-zA-Z\s]+/.test(value)) {
                PasswordLevel = PasswordLevel + 1;
            }
            if (/\d/.test(value) && /[a-zA-Z\s]+/.test(value)) {
                PasswordLevel = PasswordLevel + 1;
            }
        }

        setPassword(value)

        if (value === '') {
            setPopFlag('none')
        }
        else if (PasswordLevel === 0) {
            setPopFlag('flex')
            setPopMessage('Password anda sangat lemah.')
            setPopColor(AppStyle.error)
        }
        else if (PasswordLevel === 1) {
            setPopFlag('flex')
            setPopMessage('Password anda lemah.')
            setPopColor(AppStyle.warning)
        }
        else if (PasswordLevel === 2) {
            setPopFlag('flex')
            setPopMessage('Password anda kuat.')
            setPopColor(AppStyle.success)
        }
    }

    // handle the process of assign password flow
    function handleSubmit() {

        // validation
        if (passwordValue === '' || passwordValue === null) {

            // dispatch the popUpModalChange actions to store the generic message modal state
            dispatch(popUpModalChange({ show: true, title: 'ERROR', message: "Password tidak boleh kosong" }));
            return;
        }

        if (confirmPasswordValue !== passwordValue) {

            // dispatch the popUpModalChange actions to store the generic message modal state
            dispatch(popUpModalChange({ show: true, title: 'ERROR', message: "Password tidak sesuai dengan password konfirmasi" }));
            return;
        }

        // triggers the http post request to /register/create url to finish the user registration process 
        trackPromise(
            api.post(
                '/register/create',
                {
                    username: tempUsername,
                    password: passwordValue
                }
            )
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        navigation.replace('CreateUserStack');
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

    // Renders the RegisterFinal screen
    return (
        <RegisterBackground>
            <Text style={styles.title}>
                Register
            </Text>
            <View style={styles.inputContainer}>
                <View style={styles.authInputWrapper}>
                    <Text style={styles.authInputTitle}>
                        Password
                        </Text>
                    <View style={styles.authInput}>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(newVal) => { onChangePassword(newVal) }}
                            value={passwordValue}
                            textAlign="left"
                            style={styles.authInputText} />
                    </View>
                </View>
                <View style={styles.authInputWrapper}>
                    <Text style={styles.authInputTitle}>
                        Confirm Password
                        </Text>
                    <View style={styles.authInput}>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(newVal) => setConfirmPassword(newVal)}
                            value={confirmPasswordValue}
                            textAlign="left"
                            style={styles.authInputText} />
                    </View>
                </View>
            </View>
            <View style={styles.submitBtn}>
                <TouchableOpacityPrevent style={{ width: Normalize(125) }} onPress={() => handleSubmit()}>
                    <Text style={[styles.button, { fontWeight: 'bold', backgroundColor: AppStyle.sub_main_color, fontSize: NormalizeFont(16) }]}>
                        Submit
                    </Text>
                </TouchableOpacityPrevent>
            </View>
            <View style={styles.loginBtn}>
                <Text style={{ fontSize: NormalizeFont(14) }} >
                    Have an account ?{' '}
                </Text>
                <TouchableOpacityPrevent onPress={() => { navigation.push('LoginStack'); }} >
                    <Text style={{ color: AppStyle.fourt_main_color, fontSize: NormalizeFont(14) }}>
                        Login
                    </Text>
                </TouchableOpacityPrevent>
            </View>
        </RegisterBackground >
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
    authInputTitle: {
        fontWeight: 'bold',
        bottom: Normalize(5),
        alignSelf: 'flex-start',
        fontSize: NormalizeFont(14),
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
    authInputText: {
        width: '100%',
        paddingLeft: Normalize(10),
        fontSize: NormalizeFont(16),
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
