import React, { useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { AppStyle, Normalize } from '../../config/app.config';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import HomeBackground from '../../components/Backgrounds/book_background';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

export default function KostDetail({ navigation }) {

    // Function refs
    const kostPictRef = useRef(null);

    // dummy
    let kostCaraouselData = [
        { uri: "https://reactjs.org/logo-og.png" },
        { uri: "https://reactjs.org/logo-og.png" },
        { uri: "https://reactjs.org/logo-og.png" },
        { uri: "https://reactjs.org/logo-og.png" },
    ];

    function _renderKostPict({ item }) {

        return (

            <ImageBackground
                style={styles.backgroundImg}
                source={{ uri: item.uri }}
            />
        )
    }

    return (
        <HomeBackground >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.replace('AppStack') }} style={styles.headerIcon}>
                    <AntDesign name="left" size={Normalize(24)} color="white" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerText}>Kosan Tarima</Text>
                </View>
            </View>
            <View style={styles.headerLocation}>
                <Text style={{ color: 'white', fontSize: Normalize(12) }} >Jakarta Selatan</Text>
            </View>
            <View style={styles.kostCarouselContainer}>
                <Carousel
                    layout={"default"}
                    ref={kostPictRef}
                    data={kostCaraouselData}
                    itemWidth={AppStyle.screenSize.width}
                    sliderWidth={AppStyle.screenSize.width}
                    renderItem={_renderKostPict}
                />
            </View>
            <View style={styles.topBorder} />
            <View style={styles.topTools}>
                <View style={styles.toolsLeft}>
                    <TouchableOpacity style={styles.toolsButton}>
                        <Text style={styles.toolsButtonText}>Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolsButton}>
                        <Text style={styles.toolsButtonText}>Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolsButton}>
                        <Text style={styles.toolsButtonText}>360</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.toolsRight}>
                    <TouchableOpacity style={styles.toolsIcon}>
                        <Ionicons name="chatbubbles-outline" size={Normalize(18)} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolsIcon}>
                        <MaterialIcons name="favorite-outline" size={Normalize(18)} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.descContainer} >
                <View style={styles.descTitle}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Description</Text>
                </View>
                <View style={styles.descBody}>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi pariatur odio aliquam error accusantium consectetur saepe maxime delectus earum corrupti labore consequatur temporibus deserunt soluta adipisci eligendi blanditiis, ab magnam?</Text>
                </View>
            </View>
            <View style={styles.softLines} />
            <View style={styles.facilitiesContainer} >
                <View style={styles.facilitiesTitle}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Main Facilities</Text>
                </View>
                <View style={styles.facilitiesBody}>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi pariatur odio aliquam error accusantium consectetur saepe maxime delectus earum corrupti labore consequatur temporibus deserunt soluta adipisci eligendi blanditiis, ab magnam?</Text>
                </View>
            </View>
            <View style={styles.softLines} />
            <View style={styles.locationContainer} >
                <View style={styles.locationTitle}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Location</Text>
                </View>
                <View style={styles.locationBody}>

                </View>
            </View>
        </HomeBackground>
    )
}

const styles = StyleSheet.create({

    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: Normalize(125),
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: Normalize(20),
    },
    headerIcon: {
        position: 'absolute',
        left: AppStyle.screenSize.width * 0.05,
    },
    headerLocation: {
        top: -Normalize(45),
        alignItems: 'center',
        justifyContent: 'center',
    },
    kostCarouselContainer: {
        top: -Normalize(35),
        alignSelf: 'center',
        backgroundColor: 'black',
        width: AppStyle.screenSize.width,
        height: AppStyle.screenSize.height * 0.33,
    },
    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    topBorder: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: 'white',
        top: -Normalize(45),
        height: Normalize(15)
    },
    topTools: {
        width: '100%',
        top: -Normalize(50),
        flexDirection: 'row',
        alignItems: 'center',
        height: Normalize(35),
        justifyContent: 'flex-start',
    },
    toolsLeft: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        marginLeft: Normalize(15),
        justifyContent: 'flex-start',
    },
    toolsRight: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: -Normalize(15),
    },
    toolsButton: {
        elevation: 2,
        borderRadius: 10,
        width: Normalize(60),
        alignItems: 'center',
        height: Normalize(30),
        padding: Normalize(5),
        justifyContent: 'center',
        backgroundColor: 'white',
        marginRight: Normalize(10),
    },
    toolsButtonText: {
        fontSize: Normalize(12)
    },
    toolsIcon: {
        elevation: 2,
        borderRadius: 100,
        alignItems: 'center',
        width: Normalize(34),
        height: Normalize(34),
        backgroundColor: 'white',
        justifyContent: 'center',
        marginLeft: Normalize(10),
        borderColor: 'rgba(0,0,0,0.15)',
    },
    descContainer: {
        top: -Normalize(30),
        marginLeft: Normalize(15),
        width: AppStyle.screenSize.width * 0.9,
    },
    descTitle: {
        marginBottom: Normalize(10),
    },
    descBody: {
    },
    facilitiesContainer: {
        top: -Normalize(10),
        marginTop: Normalize(15),
        marginLeft: Normalize(15),
        marginBottom: Normalize(15),
        width: AppStyle.screenSize.width * 0.9,
    },
    facilitiesTitle: {
        marginBottom: Normalize(10),
    },
    facilitiesBody: {
    },
    softLines: {
        top: -Normalize(10),
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: AppStyle.screenSize.width * 0.9,
        left: AppStyle.screenSize.width * 0.05,
    }
})
