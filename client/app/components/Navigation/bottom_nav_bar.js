import React from 'react';
import { AppStyle } from '../../config/app.config';
import { Normalize } from '../../functions/normalize';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

function BottomNavBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                function TabIcon({ index }) {

                    if (index === 0) {
                        return (
                            <Feather name="home" size={Normalize(18)} color={isFocused ? 'white' : 'black'} />
                        )
                    } else if (index === 1) {
                        return (
                            <Feather name="search" size={Normalize(18)} color={isFocused ? 'white' : 'black'} />
                        )
                    } else if (index === 2) {
                        return (
                            <MaterialIcons name="storefront" size={Normalize(18)} color={isFocused ? 'white' : 'black'} />
                        )
                    } else if (index === 3) {
                        return (
                            <Feather name="user" size={Normalize(18)} color={isFocused ? 'white' : 'black'} />
                        )
                    }

                }

                if (index === 4) {
                    return (
                        <View key={index} style={styles.middleTab}>
                            <TouchableOpacity
                                onPress={onPress}
                                onLongPress={onLongPress}
                                accessibilityRole="button"
                                testID={options.tabBarTestID}
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                style={[styles.innerMiddleTab, { backgroundColor: isFocused ? AppStyle.fourt_main_color : '#ffffff', }]}
                            >
                                <View style={{ color: isFocused ? '#673ab7' : '#222' }}>
                                    <Ionicons name="chatbubbles-outline" size={Normalize(18)} color={isFocused ? 'white' : 'black'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                } else {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            accessibilityRole="button"
                            testID={options.tabBarTestID}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            accessibilityState={isFocused ? { selected: true } : {}}
                            style={[styles.tab, { backgroundColor: isFocused ? AppStyle.fourt_main_color : '#ffffff', }]}
                        >
                            <View style={{ alignSelf: 'center' }}>
                                <TabIcon index={index} />
                            </View>
                        </TouchableOpacity>
                    );
                }
            })}
        </View>
    );
}

export default BottomNavBar

const styles = StyleSheet.create({

    tab: {
        flex: 1,
        elevation: 10,
        justifyContent: 'center',
        width: AppStyle.windowSize.width * 0.2,
        height: AppStyle.windowSize.width * 0.15,

    },
    middleTab: {
        flex: 1,
        elevation: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: Normalize(100),
        left: AppStyle.windowSize.width * 0.4125,
        width: AppStyle.windowSize.width * 0.175,
        height: AppStyle.windowSize.width * 0.175,
        bottom: AppStyle.windowSize.width * 0.15 / 2,
    },
    innerMiddleTab: {
        width: '75%',
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Normalize(100),
    },

})
