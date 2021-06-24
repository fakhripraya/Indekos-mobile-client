import axios from 'axios';
import React, { useEffect } from 'react';
import { GetZero } from '../../functions/string';
import { useAxiosGet } from '../../promise/axios_get';
import { AppStyle, AuthService } from '../../config/app.config';
import { EvilIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import SkeletonLoading from '../../components/Feedback/skeleton_loading';
import UserProfileBackground from '../../components/Backgrounds/user_profile_background';
import { FlatList, LogBox, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// creates the promised base http auth client
const authAPI = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/"
})

export default function UserProfile() {

    let flatListMenu = [
        {
            id: 0,
            desc: 'Contract'
        },
        {
            id: 1,
            desc: 'Complain'
        },
        {
            id: 2,
            desc: 'Bills'
        },
        {
            id: 3,
            desc: 'Favorite'
        },
        {
            id: 4,
            desc: 'History'
        },
        {
            id: 5,
            desc: 'Booking'
        }
    ]

    // get the data via axios get request
    const { data, status } = useAxiosGet(authAPI, '/', 10000);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    })

    function _renderFlatMenu({ item, index }) {
        return (
            <TouchableOpacity style={{ backgroundColor: 'white', margin: Normalize(5), borderRadius: Normalize(20), elevation: 5, height: Normalize(80), width: Normalize(80), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>{item.desc}</Text>
            </TouchableOpacity>
        )
    }

    if (status === null) {
        // loading screen
        return (
            <View style={styles.loadingScreen}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ fontSize: NormalizeFont(12) }}>Loading Kost...</Text>
            </View>
        )
    }
    else if (status !== 200) {
        return (
            <Text>Retry pls</Text>
        )
    }
    else {
        return (
            <UserProfileBackground>
                <View style={{ marginTop: AppStyle.windowSize.height * 0.075, flexDirection: 'row', width: AppStyle.windowSize.width * 0.9, alignSelf: 'center' }}>
                    <View style={{ height: Normalize(85), width: Normalize(85), borderRadius: Normalize(25), borderWidth: Normalize(5) }}>
                        <ImageBackground
                            imageStyle={{ borderRadius: Normalize(20) }}
                            style={styles.backgroundImg}
                            source={{ uri: data.profile_picture === "" ? "http://lorempixel.com/640/480/technics" : data.profile_picture }}
                        />
                        <View style={{ top: (Normalize(85) - (Normalize(30) / 2)), backgroundColor: AppStyle.sub_main_color, position: 'absolute', padding: Normalize(7), width: Normalize(50), height: Normalize(30), borderRadius: Normalize(10), alignSelf: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold', color: 'white' }}>#{GetZero(data.id)}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'space-evenly', marginLeft: AppStyle.windowSize.width * 0.05 }}>
                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold', color: 'white' }}>{data.displayname}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Entypo name="location" size={Normalize(18)} color="white" style={{ marginRight: Normalize(10) }} />
                            <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold', color: 'white' }}>{data.city === null || data.city === "" ? "Not set yet" : data.city}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderRadius: Normalize(12), backgroundColor: AppStyle.male_color, padding: Normalize(5), justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="male" size={Normalize(18)} color="white" />
                            <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold', color: 'white' }}>Male</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', position: 'absolute' }}>
                        <EvilIcons style={{ alignSelf: 'flex-end' }} name="gear" size={Normalize(24)} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ borderRadius: Normalize(20), marginTop: Normalize(30), backgroundColor: '#352952', height: Normalize(125), width: AppStyle.windowSize.width * 0.9, alignSelf: 'center' }}>

                </View>
                <View style={{ marginTop: Normalize(30), alignSelf: 'center' }}>
                    <FlatList
                        data={flatListMenu}
                        renderItem={_renderFlatMenu}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                    />
                </View>
            </UserProfileBackground>
        )
    }
}

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
})
