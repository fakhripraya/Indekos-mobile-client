import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import React, { useState, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { AppStyle, Normalize } from '../../config/app.config';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);

// Welcome is the root of Welcome stack
export default function Welcome({ navigation }) {

    // Function refs
    const carouselRef = useRef(null);
    // Function states
    const [activeIndex, setActive] = useState(0)

    // the fixed data for the carousel view
    let caraouselData = [
        {
            title: "Find your",
            sub_title: "kos",
            text: "Have an account?",
        },
        {
            title: "Choose",
            sub_title: "it",
            text: "Have an account?",
        },
        {
            title: "Manage",
            sub_title: "all",
            second_title: "time",
            second_sub_title: "in one",
            text: "Have an account?",
        },
    ]

    // Renders the elements of the carousel view
    function _renderItem({ item }) {
        return (
            <View style={styles.textWrapper}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '15%' }}>
                    <View style={activeIndex == 0 ? styles.dotStyleFlag : styles.dotStyle} />
                    <View style={activeIndex == 1 ? styles.dotStyleFlag : styles.dotStyle} />
                    <View style={activeIndex == 2 ? styles.dotStyleFlag : styles.dotStyle} />
                </View>
                <View>
                    <Text style={{ fontSize: Normalize(30), color: 'white' }}>{item.title}
                        <Text style={{ color: AppStyle.third_main_color }}> {item.sub_title}</Text>
                    </Text>
                    <Text style={[
                        { fontSize: Normalize(30), color: AppStyle.third_main_color },
                        activeIndex == 2 ? { display: 'flex' } : { display: 'none' }
                    ]}>{item.second_sub_title}
                        <Text style={{ color: 'white' }}> {item.second_title}</Text>
                    </Text>
                </View>
                <Text style={{ color: 'white', fontSize: Normalize(12) }}>{item.text}</Text>
            </View >
        )
    }

    // Renders the elements of the Welcome screen
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Carousel
                    ref={carouselRef}
                    layout={"default"}
                    data={caraouselData}
                    sliderWidth={AppStyle.screenSize.width}
                    itemWidth={AppStyle.screenSize.width}
                    renderItem={_renderItem}
                    onSnapToItem={(index) => { setActive(index) }}
                />
                <View style={styles.buttonWrapper}>
                    <TouchableOpacityPrevent
                        onPress={() => { carouselRef.current.snapToPrev(); }}
                        style={[
                            { width: AppStyle.screenSize.width / 3 },
                            activeIndex == 0 ? { display: 'none' } : { display: 'flex' }]
                        }>
                        <Text style={[styles.button, { backgroundColor: AppStyle.fifth_main_color, fontSize: Normalize(12) }]}>Prev</Text>
                    </TouchableOpacityPrevent>
                    <TouchableOpacityPrevent
                        onPress={() => {
                            if (activeIndex == 2)
                                navigation.replace('RegistrationStack');
                            else
                                carouselRef.current.snapToNext();
                        }}
                        style={{ width: AppStyle.screenSize.width / 3 }}>
                        <Text style={[styles.button, { backgroundColor: AppStyle.sub_main_color, fontSize: Normalize(12) }]}>{activeIndex == 0 ? "Start" : "Next"}</Text>
                    </TouchableOpacityPrevent>
                </View>
            </View>
        </View>
    )
}

// the render elements style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: AppStyle.main_color,
    },
    wrapper: {
        flex: 0.6,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWrapper: {
        flex: 1,
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonWrapper: {
        flex: 1,
        top: '5%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    dotStyle: {
        borderRadius: 100,
        width: Normalize(10),
        height: Normalize(10),
        backgroundColor: 'white',
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
    button: {
        color: 'white',
        borderRadius: 50,
        textAlign: 'center',
        borderColor: 'white',
        paddingTop: Normalize(10),
        paddingBottom: Normalize(10),
    }
});
