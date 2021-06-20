import axios from 'axios';
import io from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { ParseTimeGolang } from '../../functions/string';
import React, { useState, useEffect, useRef } from 'react';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import ChatBackground from '../../components/Backgrounds/chat_background';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';
import { AppStyle, AuthService, GeneralService, ChatWebsocket } from '../../config/app.config';
import { FlatList, StyleSheet, Text, TouchableNativeFeedback, ActivityIndicator, View, ImageBackground, LogBox } from 'react-native';

// a HOC to throttle button click
const TouchableNativeFeedbackPrevent = withPreventDoubleClick(TouchableNativeFeedback);

// creates the promised base http auth client
const authAPI = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/"
})

export default function Chats({ navigation, route }) {

    // get navigation parameter
    const socketRef = route.params.socketRef;

    // Function Hooks
    const [user, setUser] = useState(null)
    const [refreshPage, setRefreshPage] = useState(false);

    // get all chats info
    let myChatRooms = useSelector(state => state.chatRoomsReducer.chat_rooms);
    let myChatRoomMembers = useSelector(state => state.chatRoomMembersReducer.chat_room_members);
    let myChatRoomChats = useSelector(state => state.chatRoomChatsReducer.chat_room_chats);

    function getOtherMember(members) {

        let receiver;

        members.forEach((member) => {
            if (member.user_id !== user.id) {
                receiver = member;
            }
        })

        return receiver;
    }

    useEffect(() => {
        LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component."]);
    }, []);

    useEffect(() => {
        if (user !== null) {
            socketRef.current.on("trigger" + user.id, () => {
                if (refreshPage === false)
                    setRefreshPage(true);
                else
                    setRefreshPage(false)
            })
        }

        return () => {
            socketRef.current.removeAllListeners("trigger" + user.id)
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

            return (
                <TouchableNativeFeedbackPrevent onPress={() => {
                    navigation.push('ChatStack', {
                        screen: 'ChatMessager',
                        params: {
                            selectedRoom: item.chat_room,
                            user: user,
                            users: item.chat_room_members,
                            socketRef: socketRef
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

        function handleScroll() {
        }

        return (
            <FlatList
                data={myChatRooms}
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

    if (myChatRooms.length === 0 || user === null) {
        // Renders the Loading screen
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    } else if (myChatRooms.length !== 0 && user !== null) {
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
