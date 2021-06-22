import axios from 'axios';
import io from "socket.io-client";
import { ParseTimeGolang } from '../../functions/string';
import React, { useState, useEffect, useRef } from 'react';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import ChatBackground from '../../components/Backgrounds/chat_background';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';
import { AppStyle, AuthService, GeneralService, ChatWebsocket } from '../../config/app.config';
import { FlatList, StyleSheet, Text, TouchableNativeFeedback, ActivityIndicator, View, ImageBackground, LogBox } from 'react-native';

// a HOC to throttle button click
const TouchableNativeFeedbackPrevent = withPreventDoubleClick(TouchableNativeFeedback);

// creates the promised base http auth API
const authAPI = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/"
})

// creates the promised base http general API
const GenAPI = axios.create({
    baseURL: "http://" + GeneralService.host + GeneralService.port + "/"
})

export default function Chats({ navigation }) {

    // prevent update on unmounted component
    let unmounted = false;
    // creates the cancel token source
    var cancelSource = axios.CancelToken.source()

    // Function Hooks
    const [user, setUser] = useState(null)
    const [rooms, setRooms] = useState(null)

    // Function refs
    const socketRef = useRef()

    function getOtherMember(members) {

        let receiver;

        members.forEach((member) => {
            if (member.user_id !== user.id) {
                receiver = member;
            }
        })

        return receiver;
    }

    const promiseProperty = {
        cancelToken: cancelSource.token,
        timeout: 10000
    }

    const catchError = (err) => {
        if (!unmounted) {
            if (typeof (err.response) !== 'undefined') {
                if (!axios.isCancel(err)) {
                    console.log(err.response.data)
                }
            }
        }
    }

    useEffect(() => {
        LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component."]);
    }, []);

    useEffect(() => {

        // // Socket initialization
        socketRef.current = io(ChatWebsocket.host + ChatWebsocket.port, { forceNode: true });

        socketRef.current.on("connect", () => {

            authAPI.get('/', promiseProperty)
                .then((parent) => {
                    if (!unmounted) {
                        GenAPI.get('/' + parent.data.id + '/all', promiseProperty)
                            .then((result) => {
                                if (!unmounted) {
                                    setUser(parent.data)
                                    setRooms(result.data)
                                }
                            })
                            .catch((err) => catchError(err));
                    }
                })
                .catch((err2) => catchError(err2));

            socketRef.current.on("trigger rerender", () => {

                authAPI.get('/', promiseProperty)
                    .then(() => {
                        if (!unmounted) {
                            GenAPI.get('/' + parent.data.id + '/all', promiseProperty)
                                .then((result) => {
                                    if (!unmounted) {
                                        setRooms(result.data)
                                    }
                                })
                                .catch((err) => catchError(err));
                        }
                    })
                    .catch((err2) => catchError(err2));
            })
        });

        return () => {
            socketRef.current.disconnect();
            unmounted = true;
            cancelSource.cancel();
        }

    }, []);

    useEffect(() => {
        if (user !== null) {

            socketRef.current.on("trigger" + user.id, () => {

                authAPI.get('/', promiseProperty)
                    .then((parent) => {
                        if (!unmounted) {
                            GenAPI.get('/' + parent.data.id + '/all', promiseProperty)
                                .then((result) => {
                                    if (!unmounted) {
                                        setRooms(result.data)
                                    }
                                })
                                .catch((err) => catchError(err));
                        }
                    })
                    .catch((err2) => catchError(err2));
            })
        }
    }, [user]);

    function TabContent() {

        function ChatBodyComponent(childItem) {

            if (childItem.childItem.sender_id !== user.id) {
                return (
                    <Text style={{ color: 'black', fontSize: NormalizeFont(12) }}>
                        {childItem.childItem.chat_body}
                    </Text>
                )
            } else {
                return (
                    <Text style={{ color: AppStyle.fourt_main_color, fontSize: NormalizeFont(12) }}>
                        You: <Text style={{ color: 'black', fontSize: NormalizeFont(12) }}>{childItem.childItem.chat_body}</Text>
                    </Text>
                )
            }
        }

        function ChatThumbnail({ members }) {

            let selected = getOtherMember(members);

            return (
                <ImageBackground
                    imageStyle={{ borderRadius: Normalize(100) }}
                    style={styles.backgroundImg}
                    source={{ uri: selected.profile_picture }}
                />
            )
        }

        function ChatTitle({ members }) {

            let selected = getOtherMember(members);

            return (
                <Text style={{ fontSize: NormalizeFont(15), fontWeight: 'bold', color: 'black' }}>
                    {selected.displayname}
                </Text>
            )
        }

        function ChatUnread({ unread }) {
            if (unread !== null && unread !== 0) {
                return (
                    <View style={{ backgroundColor: AppStyle.third_main_color, height: Normalize(25), width: Normalize(25), borderRadius: Normalize(100), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: NormalizeFont(14) }}>
                            {unread}
                        </Text>
                    </View>
                )
            } else {
                return (
                    <View style={{ backgroundColor: 'white', height: Normalize(25), width: Normalize(25), borderRadius: Normalize(100), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: NormalizeFont(14) }}>
                            {unread}
                        </Text>
                    </View>
                )
            }
        }

        function _renderChatList({ item }) {

            if (item.chat_room_last_chat.chat_body !== "") {
                return (
                    <TouchableNativeFeedbackPrevent onPress={() => {
                        navigation.push('ChatStack', {
                            screen: 'ChatMessager',
                            params: {
                                selectedRoom: item.chat_room,
                                user: user,
                                users: item.chat_room_members,
                                socketRef: socketRef,
                                socketRefConnection: true
                            }
                        })
                    }} >
                        <View style={{ height: Normalize(60) + Normalize(12) + Normalize(12), width: AppStyle.windowSize.width, flexDirection: 'row' }}>
                            <View style={styles.chatPicContainer}>
                                <View style={styles.chatPic}>
                                    <ChatThumbnail members={item.chat_room_members} />
                                </View>
                            </View>
                            <View style={styles.chatContent}>
                                <View style={styles.chatTitle}>
                                    <ChatTitle members={item.chat_room_members} />
                                </View>
                                <View style={styles.chatBody}>
                                    <ChatBodyComponent childItem={item.chat_room_last_chat} />
                                </View>
                            </View>
                            <View style={styles.chatTimestamp}>
                                <View style={styles.chatSuffix}>
                                    <ChatUnread unread={item.unread_count} />
                                </View>
                                <View style={styles.chatTime}>
                                    <Text style={{ color: 'black', fontSize: NormalizeFont(12) }}>
                                        <ParseTimeGolang time={item.chat_room_last_chat.created} />
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedbackPrevent >
                )
            }
        }

        function handleScroll() {
        }

        return (
            <FlatList
                data={rooms}
                renderItem={_renderChatList}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
                onEndReached={() => {
                    handleScroll();
                }}
                onEndReachedThreshold={0.1}
            />
        )
    }

    if (user === null) {
        // Renders the Loading screen
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    } else if (user !== null) {
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

}

const styles = StyleSheet.create({

    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
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
