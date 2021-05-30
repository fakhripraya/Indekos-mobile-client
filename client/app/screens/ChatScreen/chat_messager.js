import axios from 'axios';
import io from "socket.io-client";
import React, { useState, useEffect, useRef } from 'react';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import { AppStyle, GeneralService, ChatWebsocket } from '../../config/app.config';
import { View, Text, StyleSheet, FlatList, ImageBackground, TextInput } from 'react-native';

// creates the promised base http chat client
const chatAPI = axios.create({
    baseURL: "http://" + GeneralService.host + GeneralService.port + "/"
})

export default function ChatMessager({ route }) {

    // get navigation parameter
    const user = route.params.user;

    // Function Hooks
    const [flag, setFlag] = useState(0);
    const [room, setRoom] = useState('');
    const [chatMessage, setChatMessage] = useState(null)
    const [chatMessages, setChatMessages] = useState([])

    // Function refs
    const socketRef = useRef()

    useEffect(() => {

        // // Socket initialization
        socketRef.current = io(ChatWebsocket.host + ChatWebsocket.port, { forceNode: true });

        socketRef.current.on('connect', function () {
            socketRef.current.emit('join room', user.displayname, ({ error, user }) => {
                if (error) {
                    console.log(error)
                    return;
                }

                console.log(user.room)
                setRoom(user.room);
            });
        });

        return () => {
            socketRef.current.disconnect();
        }

    }, [])

    useEffect(() => {

        socketRef.current.on("set message", (callbackMsg) => {

            const { message, type, senderId } = callbackMsg;

            let tempArray = [...chatMessages]
            var arrayLength = tempArray.length;

            let objectMsg = {
                id: arrayLength + 1,
                senderId: senderId,
                type: type,
                message: message
            }

            const newArr = [...chatMessages, objectMsg];
            setChatMessages(newArr.reverse())

        })
    }, [chatMessages]);

    function _renderChatList({ item }) {
        if (item.senderId === user.id) {
            return (
                <View style={[styles.chatBubble, { alignSelf: 'flex-end', left: -AppStyle.windowSize.width * 0.05 }]}>
                    <View style={styles.upperText}>
                        <Text style={{ fontSize: NormalizeFont(16), color: 'white' }}>{item.message}</Text>
                    </View>
                    <View style={styles.lowerText}>
                        <Text style={{ fontSize: NormalizeFont(12), color: 'white' }}>11:44PM</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={[styles.chatBubble, { alignSelf: 'flex-start', left: AppStyle.windowSize.width * 0.05 }]}>
                    <View style={styles.upperText}>
                        <Text style={{ fontSize: NormalizeFont(16), color: 'white' }}>{item.message}</Text>
                    </View>
                    <View style={styles.lowerText}>
                        <Text style={{ fontSize: NormalizeFont(12), color: 'white' }}>11:44PM</Text>
                    </View>
                </View>
            )
        }

    }

    function submitChatMessage() {
        socketRef.current.emit("send message", { type: "text", senderId: user.id, message: chatMessage, room: room });
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
        borderBottomLeftRadius: Normalize(20),
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

