import io from "socket.io-client";
import React, { useEffect, useRef } from 'react';
import { Normalize } from '../../functions/normalize';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { AppStyle, ChatWebsocket, AuthService } from '../../config/app.config';

// creates the promised base http auth client
const authAPI = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/"
})

function BottomNavBar({ state, descriptors, navigation }) {

    // prevent update on unmounted component
    let unmounted = false;
    // creates the cancel token source
    var cancelSource = axios.CancelToken.source()
    // Hooks
    const dispatch = useDispatch()
    // Function refs
    const socketRef = useRef()
    // Function Hooks
    const [user, setUser] = useState(null)

    // get all chats info
    let myChatRooms = useSelector(state => state.chatRoomsReducer.chat_rooms);
    let myChatRoomMembers = useSelector(state => state.chatRoomMembersReducer.chat_room_members);
    let myChatRoomChats = useSelector(state => state.chatRoomChatsReducer.chat_room_chats);

    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    useEffect(() => {

        // // Socket initialization
        socketRef.current = io(ChatWebsocket.host + ChatWebsocket.port, { forceNode: true });

        socketRef.current.on("connect", () => {
            authAPI.get('/', {
                cancelToken: cancelSource.token,
                timeout: 10000
            })
                .then((result) => {
                    if (!unmounted) {
                        setUser(result.data)
                    }
                })
                .catch((err) => {
                    if (!unmounted) {
                        if (typeof (err.response) !== 'undefined') {
                            if (!axios.isCancel(err)) {
                                dispatch(popUpModalChange({ show: true, title: 'ERROR', message: `Error joining room: ${err.response.data}` }));
                            }
                        }
                    }
                });
        });

        return () => {
            socketRef.current.disconnect();
            unmounted = true;
            cancelSource.cancel();
        }

    }, []);

    useEffect(() => {
        if (user !== null) {
            socketRef.current.on("set message root" + user.id, (callbackMsg) => {

                const { message, senderId, receiverId, roomDesc } = callbackMsg;

                const newChat = {
                    room_id = myChatRooms.length + 1,
                    sender_id = senderId,
                    chat_body: message,
                    attachment: attachment,
                    pic_url: pic_url
                }

                let roomAvailability = myChatRoomMembers.find(x => x.user_id === receiverId)
                if (roomAvailability === null || typeof (roomAvailability) === 'undefined') {
                    // if room not available
                    const newRoom = {
                        room_id = myChatRooms.length + 1,
                        chat_room: {
                            room_desc: roomDesc,
                        },
                        chat_room_last_chat: message,
                        chat_room_members: users,
                        unread_count: 0,
                    }

                    const roomMembers = [{
                        room_id = myChatRooms.length + 1,
                        user_id = senderId
                    },
                    {
                        room_id = myChatRooms.length + 1,
                        user_id = receiverId
                    }]

                    // create room
                    dispatch(chatRoomsChange({
                        chat_rooms: myChatRooms.push(newRoom)
                    }));

                    dispatch(chatRoomMembersChange({
                        chat_room_members: myChatRoomMembers.concat(roomMembers)
                    }));

                    dispatch(chatRoomChatsChange({
                        chat_room_chats: myChatRoomChats.push(newChat)
                    }));
                } else {
                    // if room available
                    dispatch(chatRoomChatsChange({
                        chat_room_chats: myChatRoomChats.push(newChat)
                    }));

                    for (var i in myChatRooms) {
                        if (myChatRooms[i].room_id === roomAvailability.room_id) {
                            myChatRooms[i].chat_room_last_chat = message;
                            break; //Stop this loop, we found it!
                        }
                    }

                    // update room
                    dispatch(chatRoomsChange({
                        chat_rooms: [...myChatRooms]
                    }));
                }

                // trigger rerender
                socketRef.current.emit('trigger rerender self', user)
            })
        }
    }, [user]);

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
                        navigation.navigate(route.name, {
                            params: {
                                socketRef: socketRef,
                            }
                        });
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
