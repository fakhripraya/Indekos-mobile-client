import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import { AppStyle, UserService } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import { FirstBackground } from '../../components/Backgrounds/create_user_background'
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + UserService.host + UserService.port + "/"
})

export default function PickRole({ route, navigation }) {

    // Get navigation parameter
    const tempDisplayName = route.params.tempDisplayName

    // Function States
    let [role, setRole] = useState(1)

    // Hooks
    const dispatch = useDispatch()

    function handleChange(val) {

        if (val === 0) {
            setRole(1)
        }
        else {
            setRole(2)
        }
    }

    // triggers the http patch request to /update/signed url to update the created user role
    function handleSubmit(roleId) {

        // roleId = 1 (user)
        // roleId = 2 (owner)

        if (roleId === 1) {
            // if owner, finish the user creation and navigate to home screen
            trackPromise(
                api.patch('/update/signed', {
                    displayname: tempDisplayName,
                    role_id: roleId,
                })
                    .then(response => {
                        if (response.status >= 200 && response.status < 300) {
                            navigation.replace('AppStack');
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
        } else
            // if owner, navigate to owner
            navigation.replace('Agreement', {
                tempDisplayname: tempDisplayName,
                tempUserRoleID: roleId
            });
    }

    return (
        <FirstBackground>
            <View style={styles.wrapper}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: NormalizeFont(18) }}>I want to register in <Text style={{ color: AppStyle.fourt_main_color }}>as</Text></Text>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacityPrevent onPress={() => handleChange(0)}>
                        <View style={[styles.buttonBig, { backgroundColor: role === 1 ? AppStyle.fourt_main_color : 'white' }]}>
                            <Text style={{ color: role === 1 ? 'white' : 'black', fontWeight: 'bold', fontSize: NormalizeFont(14) }}>User</Text>
                        </View>
                    </TouchableOpacityPrevent>
                    <TouchableOpacityPrevent onPress={() => handleChange(1)}>
                        <View style={[styles.buttonBig, { backgroundColor: role === 2 ? AppStyle.fourt_main_color : 'white' }]}>
                            <Text style={{ color: role === 2 ? 'white' : 'black', fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Owner</Text>
                        </View>
                    </TouchableOpacityPrevent>
                </View>
            </View>
            <View style={styles.submitBtn}>
                <TouchableOpacityPrevent style={{ width: Normalize(100) }} onPress={() => handleBack()}>
                    <Text style={[styles.button, { backgroundColor: '#352952', fontSize: NormalizeFont(14), fontWeight: 'bold', }]}>
                        <Text >Back</Text>
                    </Text>
                </TouchableOpacityPrevent>
                <TouchableOpacityPrevent style={{ width: Normalize(100) }} onPress={() => handleSubmit(role)}>
                    <Text style={[styles.button, { backgroundColor: AppStyle.sub_main_color, fontSize: NormalizeFont(14), fontWeight: 'bold', }]}>
                        Next
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
    buttonWrapper: {
        flexDirection: 'row',
        marginTop: Normalize(25),
    },
    buttonBig: {
        alignItems: 'center',
        width: Normalize(118),
        height: Normalize(155),
        justifyContent: 'flex-end',
        borderRadius: Normalize(20),
        paddingBottom: Normalize(20),
        marginLeft: AppStyle.screenSize.width * 0.025,
        marginRight: AppStyle.screenSize.width * 0.025,
    },
    submitBtn: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: Normalize(75),
        justifyContent: 'space-around',
    },
    button: {
        color: 'white',
        textAlign: 'center',
        paddingTop: Normalize(10),
        borderRadius: Normalize(50),
        paddingBottom: Normalize(10),
    },

})
