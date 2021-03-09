import { AntDesign } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { AppStyle, Normalize } from '../../config/app.config';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function KTPVerification({ navigation }) {

    // Function refs
    const textPlaceholderRef = useRef(null);

    // Function states
    const [activeIndex, setActive] = useState(0)

    function handleNext() {
    }

    function handleCamera() {
        navigation.push('CameraUtility')
    }

    // the fixed data for the carousel view
    let textPlaceholderData = [
        {
            black_text: "Verify",
            colored_text: "Yourself",
            description: "One step closer, we need your selfie while holding your KTP to made us easier to know you authentically",
        },
        {
            black_text: "Find your",
            colored_text: "kos",
            description: "Have an account?",
        },
        {
            black_text: "Find your",
            colored_text: "kos",
            description: "Have an account?",
        },
    ]

    function _renderTextPlaceholder({ item }) {

        return (
            <View style={{ marginTop: AppStyle.windowSize.height * 0.25, padding: Normalize(25) }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: Normalize(10) }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        {item.black_text} {''}
                        <Text style={{ color: AppStyle.main_color }}>
                            {item.colored_text}
                        </Text>
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: Normalize(20) }}>
                    <Text style={{ textAlign: 'center' }}>
                        {item.description}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '15%', alignSelf: 'center', marginBottom: Normalize(25) }}>
                    <View style={activeIndex == 0 ? styles.dotStyleFlag : styles.dotStyle} />
                    <View style={activeIndex == 1 ? styles.dotStyleFlag : styles.dotStyle} />
                    <View style={activeIndex == 2 ? styles.dotStyleFlag : styles.dotStyle} />
                </View>
            </View>
        )

    }

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.pop(1) }} style={styles.headerIcon}>
                    <AntDesign name="left" size={Normalize(24)} color="black" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerText}>Verification</Text>
                </View>
            </View>
            <View>
                <Carousel
                    ref={textPlaceholderRef}
                    layout={"default"}
                    data={textPlaceholderData}
                    sliderWidth={AppStyle.screenSize.width}
                    itemWidth={AppStyle.screenSize.width}
                    renderItem={_renderTextPlaceholder}
                    onSnapToItem={(index) => { setActive(index) }}
                />
            </View>
            <TouchableOpacity style={styles.selfieBtn} onPress={() => { handleCamera() }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: Normalize(14) }}>
                    Take Selfie
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { handleNext() }} style={styles.nextBtn}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: Normalize(14) }}>Next</Text>
            </TouchableOpacity>
        </>
    )

}

const styles = StyleSheet.create({

    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: AppStyle.windowSize.height * 0.15,
    },
    headerText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: Normalize(18),
    },
    headerIcon: {
        position: 'absolute',
        left: AppStyle.screenSize.width * 0.05,
    },
    selfieBtn: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Normalize(10),
        borderRadius: Normalize(10),
        paddingBottom: Normalize(10),
        width: AppStyle.screenSize.width * 0.5,
        backgroundColor: AppStyle.fourt_main_color,
    },
    nextBtn: {
        borderWidth: 1,
        position: 'absolute',
        alignItems: 'center',
        right: Normalize(20),
        alignSelf: 'flex-end',
        justifyContent: 'center',
        paddingTop: Normalize(10),
        borderRadius: Normalize(50),
        paddingBottom: Normalize(10),
        borderColor: 'rgba(0, 0, 0, 0.15)',
        top: AppStyle.windowSize.height * 0.9,
        width: AppStyle.windowSize.width * 0.275,
        backgroundColor: AppStyle.sub_main_color,
    },
    dotStyle: {
        borderRadius: 100,
        width: Normalize(10),
        height: Normalize(10),
        backgroundColor: 'gray',
        marginRight: Normalize(10),
    },
    dotStyleFlag: {
        borderRadius: 100,
        width: Normalize(10),
        height: Normalize(10),
        marginRight: Normalize(10),
        transform: [{ scaleX: 2 }],
        backgroundColor: AppStyle.sub_main_color,
    },

})
