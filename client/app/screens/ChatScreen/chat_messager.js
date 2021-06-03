import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import { AppStyle, GeneralService } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import { View, Text, StyleSheet, FlatList, ImageBackground, TextInput, LogBox } from 'react-native';
import { ParseTime } from '../../functions/string';

// creates the promised base http chat client
const chatAPI = axios.create({
    baseURL: "http://" + GeneralService.host + GeneralService.port + "/"
})

export default function ChatMessager({ route }) {

    // get navigation parameter
    const user = route.params.user;
    const users = route.params.users;
    const socketRef = route.params.socketRef;
    const selectedRoom = route.params.selectedRoom;

    // Function Hooks
    const [chatRoom, setChatRoom] = useState(null);
    const [chatMembers, setChatMembers] = useState(null);
    const [chatMessage, setChatMessage] = useState(null)
    const [chatMessages, setChatMessages] = useState([])

    useEffect(() => {
        LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
    }, [])

    useEffect(() => {
        if (user !== null) {
            socketRef.current.on("trigger" + user.id, () => {

            })
        }

        return () => { }
    })

    useEffect(() => {

        socketRef.current.emit('join room', selectedRoom, user.displayname, users, ({ error, callbackUsers, callbackRoom, callbackChats }) => {
            if (error) {
                console.log(error)
                return;
            }

            setChatRoom(callbackRoom);
            setChatMembers(callbackUsers);
            setChatMessages(callbackChats.reverse())
        });

    }, [])

    useEffect(() => {

        socketRef.current.on("set message", (callbackMsg) => {

            const { message } = callbackMsg;

            const newArr = [...chatMessages.reverse(), message];
            setChatMessages(newArr.reverse())

        })
    }, [chatMessages]);

    function _renderChatList({ item }) {
        if (item.senderId !== user.id) {
            return (
                <View style={[styles.chatBubble, { borderBottomLeftRadius: Normalize(20), alignSelf: 'flex-end', left: -AppStyle.windowSize.width * 0.05 }]}>
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
                <View style={[styles.chatBubble, { borderBottomRightRadius: Normalize(20), alignSelf: 'flex-start', left: AppStyle.windowSize.width * 0.05 }]}>
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

    function submitChatMessage() {

        let receiver;

        chatMembers.forEach((member) => {
            if (member.id !== user.id) {
                receiver = member;
            }
        })

        socketRef.current.emit("send message", { type: "text", sender: user, receiver: receiver, message: chatMessage, room: chatRoom });
        setChatMessage(null)
    }

    return (
        <View>
            <View style={styles.header}>
                <View style={styles.titlePic}>
                    <View style={styles.titlePicContainer}>
                        <ImageBackground
                            imageStyle={{ borderRadius: Normalize(100) }}
                            style={styles.backgroundImg}
                            source={{ uri: "http://lorempixel.com/640/480/technics" }}
                        />
                    </View>
                </View>
                <View style={styles.titleBody}>
                    <Text style={{ fontSize: NormalizeFont(16), fontWeight: 'bold' }}>Johannes</Text>
                    <Text style={{ fontSize: NormalizeFont(14), color: AppStyle.third_main_color }}>Last online 18:00 PM</Text>
                </View>
                <View style={styles.titleMenu}>
                    <Feather name="menu" size={NormalizeFont(24)} color={AppStyle.main_color} />
                </View>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={chatMessages}
                    renderItem={_renderChatList}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                    inverted={true}
                    onEndReached={() => {
                        // handleScroll();
                    }}
                    onEndReachedThreshold={0.1}
                />
            </View>
            <View style={styles.footer}>
                <Entypo name="attachment" size={NormalizeFont(24)} color={AppStyle.main_color} />
                <Feather name="smile" size={NormalizeFont(24)} color={AppStyle.main_color} />
                <View style={styles.chatInput}>
                    <TextInput
                        style={{ height: '100%', width: '100%' }}
                        autoCorrect={false}
                        value={chatMessage}
                        onSubmitEditing={() => submitChatMessage()}
                        onChangeText={chatMessage => {
                            setChatMessage(chatMessage);
                        }}
                    />
                </View>
                <Ionicons name="send-sharp" size={NormalizeFont(24)} color={AppStyle.main_color} />
            </View>
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
        backgroundColor: '#F4F5F9',
        width: AppStyle.windowSize.width,
        height: AppStyle.windowSize.height - (Normalize(80) + Normalize(70)),
    },
    footer: {
        elevation: 5,
        alignItems: 'center',
        flexDirection: 'row',
        height: Normalize(80),
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
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
        borderColor: 'rgba(0,0,0,0.2)',
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
        backgroundColor: 'rgba(78, 82, 174, 0.9)',
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

