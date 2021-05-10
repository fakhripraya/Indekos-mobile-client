import React, { useState } from 'react';
import { AppStyle } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import ChatBackground from '../../components/Backgrounds/chat_background';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';
import { FlatList, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View, ImageBackground } from 'react-native';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);
const TouchableNativeFeedbackPrevent = withPreventDoubleClick(TouchableNativeFeedback);

export default function Chats({ navigation }) {

    // if last chat sender is 1, show 'you' as the body prefix, otherwise show nothing  
    // last chat last sent is 0 -> pending  
    // last chat last sent is 1 -> sent
    // last chat last sent is 2 -> read
    let contact_dummy = [
        {
            profile_picture: "http://lorempixel.com/640/480/technics",
            title: "Johannes Kont..",
            body: "Titit lagi apa lau",
            time: "12:31 PM",
            unread_count: "14",
            last_chat_sent: 0,
            last_chat_sender: 1,
        },
        {
            profile_picture: "http://lorempixel.com/640/480/technics",
            title: "Johannes Meki",
            body: "testis",
            time: "12:38 PM",
            unread_count: "32",
            last_chat_sent: 1,
            last_chat_sender: 0,
        },
        {
            profile_picture: "http://lorempixel.com/640/480/technics",
            title: "Johannes Titit",
            body: "panjang titit gua cuma 2cm",
            time: "12:32 PM",
            unread_count: "1",
            last_chat_sent: 2,
            last_chat_sender: 0,
        },
        {
            profile_picture: "http://lorempixel.com/640/480/technics",
            title: "Palkon palmerah",
            body: "teastausdasdsada",
            time: "15:38 PM",
            unread_count: "2",
            last_chat_sent: 0,
            last_chat_sender: 0,
        },
        {
            profile_picture: "http://lorempixel.com/640/480/technics",
            title: "pentolan bonjer",
            body: "awdajhwkjdhaqkwjhdad",
            time: "12:38 PM",
            unread_count: "1",
            last_chat_sent: 0,
            last_chat_sender: 1,
        },
        {
            profile_picture: "http://lorempixel.com/640/480/technics",
            title: "bebeb",
            body: "Titit lagi apa lau cok",
            time: "13:00 PM",
            unread_count: "5",
            last_chat_sent: 0,
            last_chat_sender: 1,
        },
        {
            profile_picture: "http://lorempixel.com/640/480/technics",
            title: "bebeb",
            body: "Titit lagi apa lau cok",
            time: "12:38 PM",
            unread_count: "1",
            last_chat_sent: 0,
            last_chat_sender: 1,
        },
        {
            profile_picture: "http://lorempixel.com/640/480/technics",
            title: "bebeb",
            body: "Titit lagi apa lau cok",
            time: "12:11 PM",
            unread_count: "22",
            last_chat_sent: 0,
            last_chat_sender: 1,
        },
        {
            profile_picture: "http://lorempixel.com/640/480/technics",
            title: "bebeb",
            body: "Titit lagi apa lau cok",
            time: "12:23 PM",
            unread_count: "2",
            last_chat_sent: 0,
            last_chat_sender: 1,
        },
    ]

    function TabContent() {

        function ChatBodyComponent(childItem) {

            if (childItem.childItem.last_chat_sender === 0) {
                return (
                    <Text style={{ color: 'black', fontSize: NormalizeFont(12) }}>
                        {childItem.childItem.body}
                    </Text>
                )
            } else {
                return (
                    <Text style={{ color: AppStyle.fourt_main_color, fontSize: NormalizeFont(12) }}>
                        You: <Text style={{ color: 'black', fontSize: NormalizeFont(12) }}>{childItem.childItem.body}</Text>
                    </Text>
                )
            }
        }

        function _renderChatList({ item }) {

            return (
                <TouchableNativeFeedbackPrevent onPress={() => {
                    navigation.push('ChatStack', {
                        screen: 'ChatMessager',
                        params: {
                            kost: "placeholder",
                        }
                    })
                }} >
                    <View style={{ height: Normalize(60) + Normalize(12) + Normalize(12), width: AppStyle.windowSize.width, flexDirection: 'row' }}>
                        <View style={styles.chatPicContainer}>
                            <View style={styles.chatPic}>
                                <ImageBackground
                                    imageStyle={{ borderRadius: Normalize(100) }}
                                    style={styles.backgroundImg}
                                    source={{ uri: item.profile_picture }}
                                />
                            </View>
                        </View>
                        <View style={styles.chatContent}>
                            <View style={styles.chatTitle}>
                                <Text style={{ fontSize: NormalizeFont(15), fontWeight: 'bold', color: 'black' }}>
                                    {item.title}
                                </Text>
                            </View>
                            <View style={styles.chatBody}>
                                <ChatBodyComponent childItem={item} />
                            </View>
                        </View>
                        <View style={styles.chatTimestamp}>
                            <View style={styles.chatSuffix}>
                                <View style={{ backgroundColor: AppStyle.third_main_color, height: Normalize(25), width: Normalize(25), borderRadius: Normalize(100), justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: NormalizeFont(14) }}>
                                        {item.unread_count}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.chatTime}>
                                <Text style={{ color: 'black', fontSize: NormalizeFont(12) }}>
                                    {item.time}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedbackPrevent >
            )
        }

        function handleScroll() {
        }

        return (
            <FlatList
                data={contact_dummy}
                renderItem={_renderChatList}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
                // ItemSeparatorComponent={() => {
                //     return (<View style={{ marginTop: Normalize(12), marginBottom: Normalize(12) }} />);
                // }}
                onEndReached={() => {
                    handleScroll();
                }}
                onEndReachedThreshold={0.1}
            />
        )
    }

    return (
        <ChatBackground>
            <View style={{ height: AppStyle.windowSize.height * 0.3, width: AppStyle.windowSize.width }}></View>
            <Text style={styles.title}>Chat's</Text>
            <View style={styles.topBorder} />
            <View style={styles.tabContainer}>
                <TabContent />
            </View>
        </ChatBackground >
    )
}

const styles = StyleSheet.create({

    title: {
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        alignSelf: 'flex-start',
        fontSize: NormalizeFont(32),
        left: AppStyle.windowSize.width * 0.05,
        top: (AppStyle.windowSize.height * 0.3) - Normalize(60),
    },
    topBorder: {
        position: 'absolute',
        height: Normalize(15),
        width: AppStyle.windowSize.width,
        backgroundColor: 'white',
        borderTopLeftRadius: Normalize(25),
        borderTopRightRadius: Normalize(25),
        top: (AppStyle.windowSize.height * 0.3) - Normalize(15),
    },
    tabContainer: {
        alignItems: 'center',
        width: AppStyle.windowSize.width,
        height: (AppStyle.windowSize.height - ((AppStyle.windowSize.height * 0.2) + (Normalize(60) / 2) + (AppStyle.windowSize.width * 0.175) + (AppStyle.windowSize.width * 0.15 / 2))),
    },
    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    chatPicContainer: {
        justifyContent: 'center',
        flex: 0.25,
        width: '100%',
        height: '100%',
    },
    chatPic: {
        left: AppStyle.windowSize.width * 0.05,
        alignSelf: 'flex-start',
        width: Normalize(50),
        height: Normalize(50),
    },
    chatContent: {
        flex: 0.50,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    chatTitle: {
        flex: 0.50,
        justifyContent: 'flex-end',
        alignSelf: 'flex-start',
    },
    chatBody: {
        flex: 0.50,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
    },
    chatSuffix: {
        flex: 0.50,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    chatTime: {
        flex: 0.50,
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
    chatTimestamp: {
        flex: 0.25,
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        right: AppStyle.windowSize.width * 0.05,
    },
})
