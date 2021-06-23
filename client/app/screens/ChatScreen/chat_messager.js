import io from "socket.io-client";
import { useDispatch } from 'react-redux';
import { ParseTime } from '../../functions/string';
import React, { useState, useEffect, useRef } from 'react';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import { AppStyle, ChatWebsocket } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';
import { View, Text, StyleSheet, FlatList, ImageBackground, TextInput, LogBox, Keyboard, Animated, TouchableOpacity } from 'react-native';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);

export default function ChatMessager({ route }) {

    // Hooks
    const dispatch = useDispatch()

    // get navigation parameter
    const user = route.params.user;
    const users = route.params.users;
    const socketRef = route.params.socketRef;
    const selectedRoom = route.params.selectedRoom;
    const socketRefConnection = route.params.socketRefConnection;

    // Function Hooks
    const [chatRoom, setChatRoom] = useState(null);
    const [chatMessage, setChatMessage] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const KeyboardEffect = useRef(new Animated.Value(0)).current;

    function getOtherMember(members) {

        let receiver;

        members.forEach((member) => {
            if (member.user_id !== user.id) {
                receiver = member;
            }
        })

        return receiver;
    }

    function submitChatMessage() {

        let receiver = getOtherMember(users);

        if (chatMessage !== null) {
            socketRef.current.emit("send message", { sender: user, receiver: receiver, message: chatMessage, messages: chatMessages, room: chatRoom }, (error) => {
                if (error) {
                    dispatch(popUpModalChange({ show: true, title: 'ERROR', message: `Error sending message: ${error.message}` }));
                    return;
                }

                setChatMessage(null)
            })
        }
    }

    function KeyboardShow(e) {
        // set the keyboard height
        setKeyboardHeight(e.endCoordinates.height)

        // animate the textinput
        Animated.timing(KeyboardEffect, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false
        }).start();
    }

    function KeyboardHide() {
        // animate the textinput
        Animated.timing(KeyboardEffect, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false
        }).start();
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", KeyboardShow)
        Keyboard.addListener("keyboardDidHide", KeyboardHide)
        return () => {
            Keyboard.removeAllListeners("keyboardDidShow")
            Keyboard.removeAllListeners("keyboardDidHide")
        }
    }, [])

    useEffect(() => {
        LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
    }, []);

    useEffect(() => {

        // Socket initialization
        // if false, connect to the websocket
        if (socketRefConnection === false) {
            socketRef.current = io(ChatWebsocket.host + ChatWebsocket.port, { forceNode: true });
        }

        socketRef.current.emit('join room', selectedRoom, user, users, ({ error, callbackRoom, callbackChats }) => {
            if (error) {
                dispatch(popUpModalChange({ show: true, title: 'ERROR', message: `Error joining room: ${error.message}` }));
                return;
            }

            setChatRoom(callbackRoom);
            if (callbackChats !== null)
                setChatMessages(callbackChats.reverse())
        });

        return () => {

            let receiver = getOtherMember(users);

            if (socketRefConnection === false) {
                socketRef.current.disconnect();
            }

            socketRef.current.removeAllListeners("join room")
            socketRef.current.removeAllListeners("set message" + receiver.user_id)
            socketRef.current.removeAllListeners("send message")
            socketRef.current.removeAllListeners("read messages")
        }
    }, []);

    useEffect(() => {
        let receiver = getOtherMember(users);
        socketRef.current.on("set message" + receiver.user_id, (callbackMsg) => {

            const { message, messages, serverSender, serverReceiver, roomId } = callbackMsg;

            if (("setmessage" + user.id + "-" + receiver.user_id === "setmessage" + serverSender.id + "-" + serverReceiver.user_id) || ("setmessage" + receiver.user_id + "-" + user.id === "setmessage" + serverSender.id + "-" + serverReceiver.user_id)) {
                const newArr = [...messages.reverse(), message];
                setChatMessages(newArr.reverse())
                socketRef.current.emit("read messages", { reader: user, roomId: roomId }, (error) => {
                    if (error) {
                        dispatch(popUpModalChange({ show: true, title: 'ERROR', message: `Error reading message: ${error.message}` }));
                        return;
                    }
                });
            }

        })
    }, []);

    function _renderChatList({ item }) {

        if (item.sender_id === user.id) {
            return (
                <View style={[styles.chatBubble, { backgroundColor: 'rgba(78, 82, 174, 0.9)', borderBottomLeftRadius: Normalize(20), alignSelf: 'flex-end', left: -AppStyle.windowSize.width * 0.05 }]}>
                    <View style={styles.upperText}>
                        <Text style={{ fontSize: NormalizeFont(16), color: 'white' }}>{item.chat_body}</Text>
                    </View>
                    <View style={styles.lowerText}>
                        <Text style={{ fontSize: NormalizeFont(12), color: 'white' }}><ParseTime time={item.created} /></Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={[styles.chatBubble, { backgroundColor: '#463275', borderBottomRightRadius: Normalize(20), alignSelf: 'flex-start', left: AppStyle.windowSize.width * 0.05 }]}>
                    <View style={styles.upperText}>
                        <Text style={{ fontSize: NormalizeFont(16), color: 'white' }}>{item.chat_body}</Text>
                    </View>
                    <View style={styles.lowerText}>
                        <Text style={{ fontSize: NormalizeFont(12), color: 'white' }}><ParseTime time={item.created} /></Text>
                    </View>
                </View>
            )
        }

    }

    let otherMessager = getOtherMember(users);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <View style={styles.titlePic}>
                    <View style={styles.titlePicContainer}>
                        <ImageBackground
                            imageStyle={{ borderRadius: Normalize(100) }}
                            style={styles.backgroundImg}
                            source={{ uri: otherMessager.profile_picture === "" ? "http://lorempixel.com/640/480/technics" : otherMessager.profile_picture }}
                        />
                    </View>
                </View>
                <View style={styles.titleBody}>
                    <Text style={{ fontSize: NormalizeFont(16), fontWeight: 'bold' }}>{otherMessager.displayname}</Text>
                </View>
                <View style={styles.titleMenu}>
                    <Feather name="menu" size={NormalizeFont(24)} color={AppStyle.main_color} />
                </View>
            </View>
            <Animated.View style={[styles.body, {
                bottom: KeyboardEffect.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, keyboardHeight],
                })
            }]}>
                <FlatList
                    data={chatMessages}
                    renderItem={_renderChatList}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                    inverted={true}
                    onEndReached={() => {
                        // handleScroll();
                    }}
                    keyboardDismissMode={'on-drag'}
                    keyboardShouldPersistTaps={'always'}
                    ListHeaderComponentStyle={{ flex: 1, justifyContent: 'flex-start', flexGrow: 1 }}
                    ListHeaderComponent={<View style={styles.footer}>
                        <Entypo name="attachment" size={NormalizeFont(24)} color={AppStyle.main_color} />
                        <Feather name="smile" size={NormalizeFont(24)} color={AppStyle.main_color} />
                        <TextInput
                            textAlign="left"
                            style={{ height: '100%', width: '100%' }}
                            autoCorrect={false}
                            value={chatMessage}
                            style={[styles.chatInput, { paddingLeft: Normalize(10), fontSize: NormalizeFont(14) }]}
                            onSubmitEditing={() => submitChatMessage()}
                            onChangeText={chatMessage => {
                                setChatMessage(chatMessage);
                            }}
                        />
                        <TouchableOpacityPrevent onPress={() => submitChatMessage()}>
                            <Ionicons name="send-sharp" size={NormalizeFont(24)} color={AppStyle.main_color} />
                        </TouchableOpacityPrevent>
                    </View>}
                    ListFooterComponent={<View style={{ marginTop: Normalize(25) }} />}
                    onEndReachedThreshold={1}
                />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: Normalize(70),
        backgroundColor: 'white',
        justifyContent: 'center',
        width: AppStyle.windowSize.width,
    },
    body: {
        backgroundColor: '#ffffff',
        width: AppStyle.windowSize.width,
        height: AppStyle.windowSize.height - Normalize(70),
    },
    footer: {
        elevation: 10,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        height: Normalize(80),
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        borderColor: 'rgba(0,0,0,0.1)',
        width: AppStyle.windowSize.width,
    },
    titlePic: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titlePicContainer: {
        width: Normalize(45),
        height: Normalize(45),
    },
    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    titleBody: {
        flex: 0.65,
    },
    titleMenu: {
        flex: 0.15,
        alignItems: 'flex-end',
        right: AppStyle.windowSize.width * 0.05,
    },
    chatInput: {
        borderWidth: 1,
        height: Normalize(50),
        borderRadius: Normalize(20),
        borderColor: 'rgba(70,50,117,0.15)',
        backgroundColor: 'rgba(70,50,117,0.15)',
        width: AppStyle.windowSize.width * 0.65,
    },
    chatBubble: {
        padding: Normalize(15),
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: Normalize(25),
        borderTopLeftRadius: Normalize(20),
        borderTopRightRadius: Normalize(20),
        maxWidth: AppStyle.windowSize.width * 0.9,
    },
    upperText: {
        maxWidth: AppStyle.windowSize.width * 0.9,
        alignSelf: 'center',
    },
    lowerText: {
        maxWidth: AppStyle.windowSize.width * 0.9,
        alignSelf: 'flex-end',
    },
})

