import { io } from "socket.io-client";
import React, { useState, useEffect } from 'react';
import { AppStyle } from '../../config/app.config';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import { View, Text, StyleSheet, FlatList, ImageBackground, TextInput } from 'react-native';

export default function ChatMessager() {

    // Function Hooks
    const [chatMessage, setChatMessage] = useState("")

    // sender is 0 -> me
    // sender is 1 -> you
    let dummyChat =
        [
            {
                sender: 0,
                chat_body: "Gua maho lu mau ga jadi mahoan gua"
            },
            {
                sender: 1,
                chat_body: "Ga mau aku masih suka cewe!!"
            },
            {
                sender: 1,
                chat_body: "tai kau"
            },
            {
                sender: 0,
                chat_body: "Gua maho maho maho"
            },
            {
                sender: 0,
                chat_body: "Adit anjing"
            },
            {
                sender: 1,
                chat_body: "Gua maho"
            },
            {
                sender: 1,
                chat_body: "Gua maho"
            },
            {
                sender: 0,
                chat_body: "Gua maho"
            },
        ]

    useEffect(() => {
        effect
        return () => {
            cleanup
        }
    }, [input])

    function _renderChatList() {
        return (
            <View style={styles.chatBubble}>

            </View>
        )
    }

    function submitChatMessage() {

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
                    data={dummyChat}
                    renderItem={_renderChatList}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                    inverted={true}
                    onEndReached={() => {
                        handleScroll();
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
})

