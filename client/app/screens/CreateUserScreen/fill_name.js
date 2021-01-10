import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import {
    UserDisplayNameChange
} from '../../redux';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppStyle } from '../../config/app.config';
import { UserService } from '../../config/app.config';
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
        dispatch(UserDisplayNameChange({ displayName: inputValue }));
    }

    return (
        <FirstBackground>
            <View style={styles.wrapper}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 / Dimensions.get("screen").fontScale }}>My <Text style={{ color: AppStyle.fourt_main_color }}>name</Text> is</Text>
                <View style={styles.input}>
                    <TextInput
                        textAlign="center"
                        value={inputValue}
                        onChangeText={(newVal) => setInput(newVal)}
                        style={{ flex: 1, paddingLeft: 0, fontSize: 20 / Dimensions.get("screen").fontScale }} />

                </View>
                <TouchableOpacity onPress={() => handleSubmit()}>
                    <View style={[styles.submitButton, { backgroundColor: AppStyle.sub_main_color }]}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale }}>Submit</Text>
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
        borderRadius: 10,
        backgroundColor: 'white',
        width: AppStyle.screenSize.width * 0.80,
        height: AppStyle.screenSize.height * 0.070,
    },
    submitButton: {
        alignItems: 'center',
        borderRadius: 100 / 2,
        backgroundColor: 'grey',
        justifyContent: 'center',
        width: AppStyle.screenSize.width * 0.4,
        height: AppStyle.screenSize.height * 0.075,
    }
})
