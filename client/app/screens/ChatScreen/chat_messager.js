import axios from 'axios';
import io from "socket.io-client";
import React, { useState, useEffect, useRef } from 'react';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import { AppStyle, GeneralService } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import { View, Text, StyleSheet, FlatList, ImageBackground, TextInput } from 'react-native';

// creates the promised base http client
const chatAPI = axios.create({
    baseURL: "http://" + GeneralService.host + GeneralService.port + "/"
})

export default function ChatMessager() {

    // Function Hooks
    const [chatMessage, setChatMessage] = useState(null)
    const [chatMessages, setChatMessages] = useState([])

    // Function refs
    const socketRef = useRef()

    useEffect(() => {

        // creates the cancel token source
        var cancelSource = axios.CancelToken.source()

        // prevent update on unmounted component
        let unmounted = false;

        async function getInitialChatRoom() {

            // triggers the http get request to the / url in General Service to get the expected response 
            chatAPI.get({
                cancelToken: cancelSource.token,
                timeout: 10000
            })
                .then(response => {
                    if (!unmounted) {
                        setData(response.data);
                        setStatus(response.status)
                    }
                })
                .catch(error => {
                    if (!unmounted) {
                        if (typeof (error.response) !== 'undefined') {
                            if (!axios.isCancel(error)) {
                                setError(true);
                                setErrorMessage(error.response.data);
                                setStatus(error.response.status)
                            }
                        }
                    }
                });
        }

        if (chatMessages.length === 0) {

            // check chat room between client
            getInitialChatRoom()
        }

        // // Socket initialization
        socketRef.current = io("ws://192.168.1.106:3001", { forceNode: true });

        socketRef.current.on('connect', function () {
        });

        socketRef.current.on("set message", (callbackMsg) => {

            const { message, type, senderId } = callbackMsg;
            console.log(message)
            let tempArray = [...chatMessages]
            var arrayLength = tempArray.length;

            let objectMsg = {
                id: arrayLength + 1,
                senderId: senderId,
                type: type,
                message: message
            }

            const newArr = [...chatMessages, objectMsg];
            setChatMessages(newArr)

        })

        return () => {
            unmounted = true;
            cancelSource.cancel();
            socketRef.current.disconnect();
        }

    }, [chatMessages])

    function _renderChatList({ item }) {
        return (
            <View style={styles.chatBubble}>
                <Text>{item.message}</Text>
            </View>
        )
    }

    function submitChatMessage() {
        socketRef.current.emit("send message", { type: "text", senderId: 1, message: chatMessage });
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
        width: AppStyle.windowSize.width,
        height: Normalize(70),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    body: {
        backgroundColor: '#F4F5F9',
        width: AppStyle.windowSize.width,
        height: AppStyle.windowSize.height - (Normalize(80) + Normalize(70))
    },
    footer: {
        elevation: 5,
        width: AppStyle.windowSize.width,
        backgroundColor: 'white',
        height: Normalize(80),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    titlePic: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titlePicContainer: {
        height: Normalize(45),
        width: Normalize(45),
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
        right: AppStyle.windowSize.width * 0.05,
        alignItems: 'flex-end',
        flex: 0.15,
    },
    chatInput: {
        width: AppStyle.windowSize.width * 0.65,
        height: Normalize(50),
        borderRadius: Normalize(20),
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    chatBubble: {
        width: AppStyle.windowSize.width,
        height: Normalize(100),
        backgroundColor: 'gray',
        borderColor: 'black',
        borderWidth: 1
    }
})

