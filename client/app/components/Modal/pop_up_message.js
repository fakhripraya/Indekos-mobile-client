import {
    View,
    Text,
    Modal,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import React from 'react';
import { popUpModalChange } from '../../redux';
import { AppStyle } from '../../config/app.config';
import { useSelector, useDispatch } from 'react-redux';
import { animated, useTransition } from 'react-spring';
import { NormalizeFont } from '../../functions/normalize';

// spring animated view element
const AnimatedView = animated(View)

// PopUpMessage is a pop up that shows the generic message to be understandable by the user
export function PopUpMessage() {

    // Function Hooks
    const dispatch = useDispatch();
    const show = useSelector(state => state.popUpModalReducer.show);
    const title = useSelector(state => state.popUpModalReducer.title);
    const message = useSelector(state => state.popUpModalReducer.message);
    const transitions = useTransition(null, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 3000 }
    })

    // Functions
    function handleMessage() {
        dispatch(popUpModalChange({ show: false, title: '', message: '' }))
    }

    // Renders the pop up message component
    return transitions.map(({ key, props }) =>
        <AnimatedView key={key} style={[props, styles.container]}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={show}
                style={styles.modal}
            >
                <View style={styles.spinner}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    <View style={styles.messageWrapper}>
                        <ScrollView style={styles.messageScroll}>
                            <Text style={styles.messageText} >
                                {message}
                            </Text>
                        </ScrollView>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.buttonFrame} onPress={() => { handleMessage() }}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </AnimatedView>
    )
}

// the render elements style
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    modal: {
        flex: 1,
    },
    spinner: {
        flex: 1,
        elevation: 5,
        alignItems: 'center',
        borderRadius: 50 / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        left: (AppStyle.screenSize.width * 0.25),
        maxWidth: (AppStyle.screenSize.width * 0.5),
        maxHeight: (AppStyle.screenSize.height * 0.3),
        top: (AppStyle.screenSize.height - (AppStyle.screenSize.height / 2)) - (AppStyle.screenSize.height * 0.15),
    },
    titleWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: NormalizeFont(22),
        color: AppStyle.sub_main_color,
    },
    messageWrapper: {
        flex: 1,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageScroll: {
        alignSelf: 'center'
    },
    messageText: {
        textAlign: 'center',
        fontSize: NormalizeFont(14),
    },
    buttonWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: (AppStyle.screenSize.height * 0.3) / 20,
    },
    buttonFrame: {
        width: '60%',
        height: '75%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppStyle.sub_main_color,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: NormalizeFont(14),
    }
});
