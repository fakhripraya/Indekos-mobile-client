import axios from 'axios';
import Icons from '../../components/Icons/icons';
import Carousel from 'react-native-snap-carousel';
import BottomSheet from 'reanimated-bottom-sheet';
import MapShow from '../../components/Maps/map_show';
import { ScrollView } from 'react-native-gesture-handler';
import Facilities from '../../components/Icons/facilities';
import React, { useRef, useState, useEffect } from 'react';
import HomeBackground from '../../components/Backgrounds/book_background';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { AppStyle, Normalize, KostService, CurrencyPrefix } from '../../config/app.config';
import { AntDesign, Ionicons, MaterialIcons, FontAwesome, FontAwesome5, Octicons } from '@expo/vector-icons';

// creates the promised base http client
const kostAPI = axios.create({
    baseURL: "http://" + KostService.host + KostService.port + "/"
})

// axios cancel source
var cancelSource

export default function KostDetail({ route, navigation }) {

    // get navigation parameter
    const kostID = route.params.kostID;
    const kostName = route.params.kostName;
    const kostCity = route.params.city;

    // Function refs
    const kostPictRef = useRef(null);
    const roomPictRef = useRef(null);
    const bottomSheetRef = useRef(null);
    const sheetCarouselRef = useRef(null);

    // Global variable
    let selectedKostRoom = null

    function KostPictList() {

        // Function state
        var [kostPictList, setKostPictList] = useState([])

        // trigger after the first render / component update / component unmount
        useEffect(() => {

            // creates the cancel token source
            cancelSource = axios.CancelToken.source()

            // triggers the http get request to /picts url in the kost service to fetch the selected kost picts
            kostAPI.get('/' + kostID + '/picts', {
                cancelToken: cancelSource.token
            })
                .then(response => {
                    setKostPictList(response.data)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.message);
                    } else {
                        console.log(error.response.data)
                    }
                });
            return () => {
                cancelSource.cancel();
            }
        }, []);

        function _renderKostPict({ item }) {

            return (
                <ImageBackground
                    style={styles.backgroundImg}
                    source={{ uri: item.url }}
                />
            )
        }

        return (
            <View style={styles.kostCarouselContainer}>
                <Carousel
                    layout={"default"}
                    ref={kostPictRef}
                    data={kostPictList}
                    itemWidth={AppStyle.windowSize.width}
                    sliderWidth={AppStyle.windowSize.width}
                    renderItem={_renderKostPict}
                />
            </View>
        )
    }

    function KostDescription() {

        // Function state
        var [kostDesc, setKostDesc] = useState('')

        // trigger after the first render / component update / component unmount
        useEffect(() => {

            // creates the cancel token source
            cancelSource = axios.CancelToken.source()

            // triggers the http get request to /{kostID} url in the kost service to fetch the kost description
            kostAPI.get('/' + kostID, {
                cancelToken: cancelSource.token
            })
                .then(response => {
                    setKostDesc(response.data.kost_desc)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.message);
                    } else {
                        console.log(error.response.data)
                    }
                });
            return () => {
                cancelSource.cancel();
            }
        }, []);

        return (
            <View style={styles.descContainer} >
                <View style={styles.descTitle}>
                    <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Description</Text>
                </View>
                <View style={styles.descBody}>
                    <Text style={{ fontSize: Normalize(14) }}>
                        {kostDesc}
                    </Text>
                </View>
            </View>
        )

    }

    function KostFacilities() {

        // Function state
        var [kostFacilities, setKostFacilities] = useState([])

        // trigger after the first render / component update / component unmount
        useEffect(() => {

            // creates the cancel token source
            cancelSource = axios.CancelToken.source()

            // triggers the http get request to /{kostID}/facilities url in the kost service to fetch the list of kost facilities
            kostAPI.get('/' + kostID + '/facilities', {
                cancelToken: cancelSource.token
            })
                .then(response => {
                    setKostFacilities(response.data)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.message);
                    } else {
                        console.log(error.response.data)
                    }
                });
            return () => {
                cancelSource.cancel();
            }
        }, []);

        function MappedFacilities(props) {

            if (kostFacilities === null) {
                return null
            } else {
                return (
                    kostFacilities.map((item, index) => {

                        return (
                            <Facilities key={index} facCategory={props.category} facDesc={item.fac_desc} />
                        )
                    })
                )
            }

        }

        return (
            <View style={styles.facilitiesContainer} >
                <View style={styles.facilitiesTitle}>
                    <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Main Facilities</Text>
                </View>
                <View style={styles.facilitiesBody}>
                    <MappedFacilities category={0} />
                </View>
            </View>
        )
    }

    function KostLocation() {

        // Function state 
        var [latitude, setLatitude] = useState('')
        var [longitude, setLongitude] = useState('')

        // trigger after the first render / component update / component unmount
        useEffect(() => {

            // creates the cancel token source
            cancelSource = axios.CancelToken.source()

            // triggers the http get request to /{kostID} url in the kost service to fetch the kost location
            kostAPI.get('/' + kostID, {
                cancelToken: cancelSource.token
            })
                .then(response => {
                    setLatitude(response.data.latitude)
                    setLongitude(response.data.longitude)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.message);
                    } else {
                        console.log(error.response.data)
                    }
                });
            return () => {
                cancelSource.cancel();
            }
        }, []);

        return (
            <View style={styles.locationContainer} >
                <View style={styles.locationTitle}>
                    <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Location</Text>
                </View>
                <View style={styles.locationBody}>
                    <MapShow latitude={latitude} longitude={longitude} />
                </View>
            </View>
        )
    }

    function KostBenchmark() {

        // Function state
        var [kostBenchmark, setKostBenchmark] = useState([])

        // trigger after the first render / component update / component unmount
        useEffect(() => {

            // creates the cancel token source
            cancelSource = axios.CancelToken.source()

            // triggers the http get request to /{kostID}/benchmark url in the kost service to fetch the list of kost nearby benchmark
            kostAPI.get('/' + kostID + '/benchmark', {
                cancelToken: cancelSource.token
            })
                .then(response => {
                    setKostBenchmark(response.data)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.message);
                    } else {
                        console.log(error.response.data)
                    }
                });
            return () => {
                cancelSource.cancel();
            }
        }, []);

        return (
            <View style={styles.benchmarkContainer}>
                <View style={styles.benchmarkTitle}>
                    <AntDesign name="flag" size={Normalize(24)} color="gray" style={{ marginRight: Normalize(10) }} />
                    <Text style={{ color: 'gray', fontSize: Normalize(18) }}>Benchmark</Text>
                </View >
                <View style={{ flexDirection: 'column' }}>
                    {
                        kostBenchmark.map((item, index) => {

                            return (
                                <Text key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                    <Octicons name="primitive-dot" size={Normalize(12)} color="black" />
                                    {'   '}
                                    <Text style={{ textAlign: 'center', fontSize: Normalize(12) }}>{item.benchmark_desc}</Text>
                                </Text>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
    function KostAccessibility() {

        // Function state
        var [kostAccessibility, setKostAccessibility] = useState([])

        // trigger after the first render / component update / component unmount
        useEffect(() => {

            // creates the cancel token source
            cancelSource = axios.CancelToken.source()

            // triggers the http get request to /{kostID}/access url in the kost service to fetch the list of kost nearby accessibility
            kostAPI.get('/' + kostID + '/access', {
                cancelToken: cancelSource.token
            })
                .then(response => {
                    setKostAccessibility(response.data)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.message);
                    } else {
                        console.log(error.response.data)
                    }
                });
            return () => {
                cancelSource.cancel();
            }
        }, []);

        return (
            <View style={styles.accessibilityContainer}>
                <View style={styles.accessibilityTitle}>
                    <Ionicons name="ios-paper-plane-outline" size={Normalize(24)} color="gray" style={{ marginRight: Normalize(10) }} />
                    <Text style={{ color: 'gray', fontSize: Normalize(18) }}>Accessibility</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    {
                        kostAccessibility.map((item, index) => {

                            return (
                                <Text key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                    <Octicons name="primitive-dot" size={Normalize(12)} color="black" />
                                    {'   '}
                                    <Text style={{ textAlign: 'center', fontSize: Normalize(12) }}>{item.accessibility_desc}</Text>
                                </Text>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
    function KostAround() {

        // Function state
        var [kostAround, setKostAround] = useState([])

        // trigger after the first render / component update / component unmount
        useEffect(() => {

            // creates the cancel token source
            cancelSource = axios.CancelToken.source()

            // triggers the http get request to /{kostID}/around url in the kost service to fetch the list of kost nearby landmark
            kostAPI.get('/' + kostID + '/around', {
                cancelToken: cancelSource.token
            })
                .then(response => {
                    setKostAround(response.data)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.message);
                    } else {
                        console.log(error.response.data)
                    }
                });
            return () => {
                cancelSource.cancel();
            }
        }, []);

        function MappedAroundKost() {

            return (
                kostAround.map((item, index) => {

                    return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icons IconID={item.icon_id} />
                            <Text style={{ fontSize: Normalize(12), marginRight: Normalize(10) }}>{' ' + item.around_desc}</Text>
                        </View>
                    )
                })
            )
        }

        return (
            <View style={styles.aroundKostContainer}>
                <View style={styles.aroundKostTitle}>
                    <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Around Kost</Text>
                </View>
                <View style={styles.aroundKostBody}>
                    <MappedAroundKost />
                </View>
            </View>
        )
    }

    function KostRating() {

        // Function state
        var [kostReview, setKostReview] = useState([])

        // trigger after the first render / component update / component unmount
        useEffect(() => {

            // creates the cancel token source
            cancelSource = axios.CancelToken.source()

            // triggers the http get request to /{kostID}/review url in the kost service to fetch the list of other user review about the kost
            kostAPI.get('/' + kostID + '/review', {
                cancelToken: cancelSource.token
            })
                .then(response => {
                    setKostReview(response.data)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.response.data);
                    } else {
                        console.log(error.response.data)
                    }
                });
            return () => {
                cancelSource.cancel();
            }
        }, []);

        var cleanliness = 0
        var convenience = 0
        var security = 0
        var facilities = 0

        if (kostReview === null)
            return null

        if (kostReview.length === 0) {
            return null
        } else {

            kostReview.forEach(element => {
                cleanliness += element.cleanliness
                convenience += element.convenience
                security += element.security
                facilities += element.facilities
            });

            var avgTotal = ((cleanliness / kostReview.length) + (convenience / kostReview.length) + (security / kostReview.length) + (facilities / kostReview.length)) / 4

            return (
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingTitle}>
                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Rating</Text>
                    </View>
                    <View style={styles.ratingBody}>
                        <View style={styles.ratingBodyLeft}>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="star" size={Normalize(24)} color="#FFB800" />
                                <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(20) }}>{avgTotal.toString().substring(0, 3)}</Text>
                            </View>
                            <Text style={{ fontSize: Normalize(16), top: 5, color: 'gray' }}>/5.0</Text>
                        </View>
                        <View style={styles.ratingBodyRight}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginRight: Normalize(10) }}>
                                    <AntDesign name="star" size={Normalize(14)} color="#FFB800" />
                                    <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(14) }}>{(cleanliness / kostReview.length).toString().substring(0, 3)}</Text>
                                </View>
                                <Text style={{ fontSize: Normalize(14) }}>Cleanliness</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginRight: Normalize(10) }}>
                                    <AntDesign name="star" size={Normalize(14)} color="#FFB800" />
                                    <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(14) }}>{(convenience / kostReview.length).toString().substring(0, 3)}</Text>
                                </View>
                                <Text style={{ fontSize: Normalize(14) }}>Convenience</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginRight: Normalize(10) }}>
                                    <AntDesign name="star" size={Normalize(14)} color="#FFB800" />
                                    <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(14) }}>{(security / kostReview.length).toString().substring(0, 3)}</Text>
                                </View>
                                <Text style={{ fontSize: Normalize(14) }}>Security</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginRight: Normalize(10) }}>
                                    <AntDesign name="star" size={Normalize(14)} color="#FFB800" />
                                    <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(14) }}>{(facilities / kostReview.length).toString().substring(0, 3)}</Text>
                                </View>
                                <Text style={{ fontSize: Normalize(14) }}>Facilities</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }

    function KostReview() {

        // Function state
        var [kostReview, setKostReview] = useState([])

        // trigger after the first render / component update / component unmount
        useEffect(() => {

            // creates the cancel token source
            cancelSource = axios.CancelToken.source()

            // triggers the http get request to /{kostID}/review url in the kost service to fetch the list of other user review about the kost
            kostAPI.get('/' + kostID + '/review', {
                cancelToken: cancelSource.token
            })
                .then(response => {
                    setKostReview(response.data)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.response.data);
                    } else {
                        console.log(error.response.data)
                    }
                });
            return () => {
                // cancel the request (the message parameter is optional)
                cancelSource.cancel();
            }
        }, []);

        if (kostReview === null)
            return null

        if (kostReview.length === 0) {
            return null
        } else {
            return (
                <View style={styles.reviewContainer}>
                    <View style={styles.reviewTitle}>
                        <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: Normalize(14), color: 'black', fontWeight: 'bold' }}>Review</Text>
                        </View>
                        <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: Normalize(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        kostReview.map((item, index) => {

                            var avgTotal = (item.cleanliness + item.convenience + item.security + item.facilities) / 4

                            if (index > 1)
                                return null

                            return (
                                <View key={index} style={styles.reviewBody}>
                                    <View style={styles.reviewBodyContainer}>
                                        <View style={styles.reviewUserPict}>
                                            <ImageBackground
                                                imageStyle={{ borderRadius: Normalize(10.12) }}
                                                style={styles.backgroundImg}
                                                source={{ uri: item.profile_picture }}
                                            />
                                        </View>
                                        <View style={styles.reviewUserHeader}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <AntDesign name="star" size={Normalize(14)} color="#FFB800" style={{ marginRight: Normalize(5) }} />
                                                <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>{avgTotal.toString().substring(0, 3)}</Text>
                                            </View>
                                            <Text style={{ textAlign: 'center', color: 'gray', fontSize: Normalize(12) }}>{item.display_name}</Text>
                                        </View>
                                        <View style={styles.reviewUserBody}>
                                            <Text style={{ textAlign: 'left', fontSize: Normalize(12), fontWeight: 'bold' }}>
                                                {item.comments}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }

                </View>
            )
        }
    }

    function KostRooms() {

        // Function state
        var [kostRooms, setKostRooms] = useState([])

        // trigger after the first render / component update / component unmount
        useEffect(() => {

            // creates the cancel token source
            cancelSource = axios.CancelToken.source()

            // triggers the http get request to /{kostID}/rooms url in the kost service to fetch the list of kost rooms
            kostAPI.get('/' + kostID + '/rooms', {
                cancelToken: cancelSource.token
            })
                .then(response => {
                    setKostRooms(response.data)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.message);
                    } else {
                        console.log(error.response.data)
                    }
                });
            return () => {
                cancelSource.cancel();
            }
        }, []);

        function KostRoomList(props) {

            // Function state
            var [kostRoomDetails, setKostRoomDetails] = useState(null)

            // trigger after the first render / component update / component unmount
            useEffect(() => {

                // creates the cancel token source
                cancelSource = axios.CancelToken.source()

                // triggers the http get request to /{kostID}/rooms/{roomID}/details url in the kost service to fetch the list of the room detail information 
                kostAPI.get('/' + kostID + '/rooms/' + props.kostRoom.id + '/details', {
                    cancelToken: cancelSource.token
                })
                    .then(response => {
                        setKostRoomDetails(response.data)
                    })
                    .catch(error => {
                        if (axios.isCancel(error)) {
                            // TODO: development only
                            console.log('Request canceled', error.message);
                        } else {
                            console.log(error.response.data)
                        }
                    });
                return () => {
                    cancelSource.cancel();
                }
            }, []);

            function RoomPicts(props) {

                function _renderRoomPict({ item }) {

                    return (
                        <ImageBackground
                            imageStyle={{ borderRadius: Normalize(10) }}
                            style={[styles.backgroundImg, { height: AppStyle.windowSize.height * 0.2 }]}
                            source={{ uri: item.url }}
                        />
                    )
                }

                return (
                    <Carousel
                        ref={roomPictRef}
                        layout={"default"}
                        data={props.RoomPicts}
                        renderItem={_renderRoomPict}
                        itemWidth={AppStyle.windowSize.width * 0.9}
                        sliderWidth={AppStyle.windowSize.width * 0.9}
                    />
                )
            }

            if (kostRoomDetails === null) {
                return null
            } else {

                var roomBookedCount = 0
                if (kostRoomDetails.room_booked !== null) {
                    roomBookedCount = kostRoomDetails.room_booked.length
                }

                var roomAvailability = kostRoomDetails.room_details.length - roomBookedCount

                return (
                    <View style={styles.roomBody}>
                        <RoomPicts RoomPicts={kostRoomDetails.room_picts} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Normalize(40), marginTop: Normalize(20), marginBottom: Normalize(10) }}>
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesome5 name="ruler" size={Normalize(20)} color="black" style={{ marginRight: Normalize(5) }} />
                                <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>{props.kostRoom.room_length + props.kostRoom.room_area_uom_desc.substring(0, 1) + ' x ' + props.kostRoom.room_width + props.kostRoom.room_area_uom_desc.substring(0, 1)}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: Normalize(14), fontWeight: 'bold', color: AppStyle.main_color }}>{roomAvailability > 0 ? "Available" : "unavailable"}</Text>
                                <Text style={{ fontSize: Normalize(14), fontWeight: 'bold', color: roomAvailability > 2 ? AppStyle.success : AppStyle.error }}>{roomAvailability > 2 ? roomAvailability + " rooms" : roomAvailability < 2 ? roomAvailability + " room left" : roomAvailability + " rooms left"}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Normalize(20) }}>
                            <TouchableOpacity onPress={() => {
                                selectedKostRoom = props.kostRoom
                                bottomSheetRef.current.snapTo(0)
                            }}>
                                <Text style={{ fontSize: Normalize(12), color: AppStyle.fourt_main_color }}>See Details</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Normalize(20), marginBottom: Normalize(20) }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(16) }}>{CurrencyPrefix(props.kostRoom.room_price_uom_desc) + props.kostRoom.room_price}</Text>
                                </View>
                                <Text style={{ fontSize: Normalize(14), top: 5, color: 'gray' }}>/Month</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => {
                                    navigation.push('RoomSelection', {
                                        room: selectedKostRoom,
                                        roomDetails: kostRoomDetails,
                                    });
                                }} style={{ flexDirection: 'row', height: Normalize(25), width: Normalize(90), justifyContent: 'center', alignItems: 'center', borderRadius: Normalize(10), backgroundColor: AppStyle.sub_main_color }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: Normalize(14) }}>Choose</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }

        }

        if (kostRooms === null)
            return null

        if (kostRooms.length === 0) {
            return null
        } else {
            return (
                <>
                    <View style={styles.roomTitle}>
                        <Text style={{ fontSize: Normalize(14), color: 'black', fontWeight: 'bold' }}>Room</Text>
                    </View>
                    {
                        kostRooms.map((item, index) => {
                            return (
                                <KostRoomList key={index} kostRoom={item} />
                            )
                        })
                    }
                </>
            )
        }
    }

    function KostOwner() {

        // Function state
        var [kostOwner, setKostOwner] = useState(null)

        // trigger after the first render / component update / component unmount
        useEffect(() => {

            // creates the cancel token source
            cancelSource = axios.CancelToken.source()

            // triggers the http get request to /{kostID}/owner url in the kost service to fetch the kost owner information 
            kostAPI.get('/' + kostID + '/owner', {
                cancelToken: cancelSource.token
            })
                .then(response => {
                    setKostOwner(response.data)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.message);
                    } else {
                        console.log(error.response.data)
                    }
                });
            return () => {
                cancelSource.cancel();
            }
        }, []);

        if (kostOwner === null) {
            return null
        } else {
            return (
                <View style={styles.ownerContainer}>
                    <View style={styles.ownerTitle}>
                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Owner</Text>
                    </View>
                    <View style={styles.ownerBody}>
                        <View style={styles.ownerBodyContainer}>
                            <View style={styles.ownerUserPict}>
                                <ImageBackground
                                    imageStyle={{ borderRadius: Normalize(10.12) }}
                                    style={styles.backgroundImg}
                                    source={{ uri: kostOwner.profile_picture }}
                                />
                            </View>
                            <View style={styles.ownerUserHeader}>
                                <Text style={{ textAlign: 'center', fontSize: Normalize(14), fontWeight: 'bold' }}>{kostOwner.display_name}</Text>
                                <Text style={{ textAlign: 'center', color: 'gray', fontSize: Normalize(12) }}>{kostOwner.city}</Text>
                            </View>
                            <View style={styles.ownerUserBody}>
                                <TouchableOpacity style={{ flexDirection: 'row', height: Normalize(40), width: Normalize(120), alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', borderRadius: Normalize(10), backgroundColor: AppStyle.third_main_color }}>
                                    <MaterialIcons name="storefront" size={Normalize(24)} color="white" style={{ marginRight: Normalize(7.5) }} />
                                    <Text style={{ textAlign: 'center', fontSize: Normalize(12), fontWeight: 'bold', color: 'white' }}>{kostOwner.kost_list.length} Kosan Owned</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }

    function KostBottomSheet() {

        // Function state
        var [kostRoomDetails, setKostRoomDetails] = useState(null)
        var [kostFacilities, setKostFacilities] = useState([])

        // triggers when the bottom sheet starts opening
        function _getRoomData() {

            if (selectedKostRoom !== null) {

                axios.all([
                    kostAPI.get('/' + kostID + '/rooms/' + selectedKostRoom.id + '/details', {
                        cancelToken: cancelSource.token
                    }).catch(error => {
                        if (axios.isCancel(error)) {
                            // TODO: development only
                            console.log('Request canceled', error.message);
                        } else {
                            console.log(error.response.data)
                        }
                    }),
                    kostAPI.get('/' + kostID + '/facilities/room/' + selectedKostRoom.id, {
                        cancelToken: cancelSource.token
                    }).catch(error => {
                        if (axios.isCancel(error)) {
                            // TODO: development only
                            console.log('Request canceled', error.message);
                        } else {
                            console.log(error.response.data)
                        }
                    })
                ])
                    .then(responseArr => {
                        setKostRoomDetails(responseArr[0].data)
                        setKostFacilities(responseArr[1].data)
                    })
                    .catch((err) => {
                        console.log(err)
                    });

            }

        }

        function KostSheetPicts() {

            function _renderSheetRoomPicts({ item }) {

                return (
                    <ImageBackground
                        imageStyle={{ borderRadius: Normalize(10) }}
                        style={[styles.backgroundImg]}
                        source={{ uri: item.url }}
                    />
                )
            }

            if (kostRoomDetails === null) {
                return null
            } else {
                return (
                    <View style={styles.sheetCarouselContainer}>
                        <Carousel
                            layout={"default"}
                            ref={sheetCarouselRef}
                            data={kostRoomDetails.room_picts}
                            itemWidth={AppStyle.windowSize.width * 0.9}
                            sliderWidth={AppStyle.windowSize.width * 0.9}
                            renderItem={_renderSheetRoomPicts}
                        />
                    </View>
                )
            }

        }

        function MappedFacilities(props) {

            if (kostFacilities === null)
                return null

            if (kostFacilities.length === 0) {
                return null
            } else {
                return (
                    kostFacilities.map((item, index) => {

                        return (
                            <Facilities key={index} facCategory={props.category} facDesc={item.fac_desc} />
                        )
                    })
                )
            }

        }

        var roomBookedCount = 0
        var roomAvailability = 0
        if (selectedKostRoom !== null) {
            if (kostRoomDetails !== null) {
                if (kostRoomDetails.room_booked !== null) {
                    roomBookedCount = kostRoomDetails.room_booked.length
                }
                roomAvailability = kostRoomDetails.room_details.length - roomBookedCount
            }
        }

        function GenderFilter() {

            if (selectedKostRoom === null || kostRoomDetails === null) {
                return null
            } else {

                if (selectedKostRoom.allowed_gender === "Male") {
                    return (
                        <View style={{ flexDirection: 'row', height: Normalize(35), padding: Normalize(10), justifyContent: 'center', alignItems: 'center', backgroundColor: AppStyle.male_color, borderRadius: Normalize(10) }}>
                            <Ionicons name="male" size={Normalize(24)} color="white" />
                            <Text style={{ color: 'white', fontSize: Normalize(14) }}>Male</Text>
                        </View>
                    )
                }
                else if (selectedKostRoom.allowed_gender === "Female") {
                    return (
                        <View style={{ flexDirection: 'row', height: Normalize(35), padding: Normalize(10), justifyContent: 'center', alignItems: 'center', backgroundColor: AppStyle.female_color, borderRadius: Normalize(10) }}>
                            <Ionicons name="female" size={Normalize(24)} color="white" />
                            <Text style={{ color: 'white', fontSize: Normalize(14) }}>Female</Text>
                        </View>
                    )
                } else {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', height: Normalize(35), padding: Normalize(10), justifyContent: 'center', alignItems: 'center', backgroundColor: AppStyle.male_color, borderRadius: Normalize(10), marginRight: Normalize(5) }}>
                                <Ionicons name="female" size={Normalize(18)} color="white" />
                                <Text style={{ color: 'white', fontSize: Normalize(12) }}>Male</Text>
                            </View>
                            <View style={{ flexDirection: 'row', height: Normalize(35), padding: Normalize(10), justifyContent: 'center', alignItems: 'center', backgroundColor: AppStyle.female_color, borderRadius: Normalize(10) }}>
                                <Ionicons name="female" size={Normalize(18)} color="white" />
                                <Text style={{ color: 'white', fontSize: Normalize(12) }}>Female</Text>
                            </View>
                        </View>
                    )
                }

            }
        }

        const SheetHeader = () => (
            <View style={styles.sheetHeader}>
                <Ionicons name="ios-chevron-down-outline" size={Normalize(14)} color="gray" />
                <Text style={{ fontSize: Normalize(12), color: 'gray', marginLeft: Normalize(10) }}>Close</Text>
            </View>
        );

        const SheetBody = () => (
            <View style={{ backgroundColor: 'white', height: AppStyle.windowSize.height * 0.8, alignItems: 'center' }}>
                <ScrollView>
                    <KostSheetPicts />
                    <View style={styles.sheetRoomTitle}>
                        <Text style={{ fontSize: Normalize(18), fontWeight: 'bold' }}>{selectedKostRoom === null || kostRoomDetails === null ? "" : selectedKostRoom.room_desc}</Text>
                    </View>
                    <View style={styles.sheetTopInfo}>
                        <View style={styles.sheetTopInfoLeft}>
                            <View style={styles.sheetTopInfoLeftItem}>
                                <View style={{ flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesome5 name="ruler" size={Normalize(24)} color="black" />
                                    </View>
                                    <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: Normalize(14) }}>Size</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: Normalize(12) }}>{selectedKostRoom === null || kostRoomDetails === null ? "" : selectedKostRoom.room_length + selectedKostRoom.room_area_uom_desc.substring(0, 1) + ' x ' + selectedKostRoom.room_width + selectedKostRoom.room_area_uom_desc.substring(0, 1)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.sheetTopInfoLeftItem}>
                                <View style={{ flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                        <MaterialIcons name="people-outline" size={Normalize(24)} color="black" />
                                    </View>
                                    <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: Normalize(14) }}>Guest</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: Normalize(12) }}>{selectedKostRoom === null || kostRoomDetails === null ? "" : (selectedKostRoom.max_person > 1 ? selectedKostRoom.max_person + " Person" : selectedKostRoom.max_person + " Persons")}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.sheetTopInfoRight}>
                            <View style={styles.sheetTopInfoRightItem}>
                                <GenderFilter />
                            </View>
                            <View style={styles.sheetTopInfoRightItem}>
                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: AppStyle.main_color, fontSize: Normalize(14) }}>{selectedKostRoom === null || kostRoomDetails === null ? "" : (roomAvailability > 0 ? "Available" : "Unavailable")}</Text>
                                    <Text style={{ color: roomAvailability > 2 ? AppStyle.success : AppStyle.error, fontSize: Normalize(12) }}> {selectedKostRoom === null || kostRoomDetails === null ? "" : (roomAvailability > 2 ? roomAvailability + " rooms" : (roomAvailability < 2 ? roomAvailability + " room left" : roomAvailability + " rooms left"))}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.sheetSharingFac}>
                        <View style={styles.sheetSharingFacTitle}>
                            <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Sharing Facilities</Text>
                        </View>
                        <View style={styles.sheetSharingFacBody}>
                            <MappedFacilities category={1} />
                        </View>
                    </View>
                    <View style={styles.sheetRoomFac}>
                        <View style={styles.sheetRoomFacTitle}>
                            <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Room Facilities</Text>
                        </View>
                        <View style={styles.sheetRoomFacBody}>
                            <MappedFacilities category={2} />
                        </View>
                    </View>
                    <View style={styles.sheetNotes}>
                        <View style={styles.sheetNotesTitle}>
                            <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Notes</Text>
                        </View>
                        <View style={styles.sheetNotesBody}>
                            <Text style={{ fontSize: Normalize(14) }}>
                                {selectedKostRoom === null || kostRoomDetails === null ? "" : selectedKostRoom.comments}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.stickyContainer}>
                    <View style={styles.priceTag}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(16) }}>{selectedKostRoom === null || kostRoomDetails === null ? "" : CurrencyPrefix(selectedKostRoom.room_price_uom_desc) + selectedKostRoom.room_price}</Text>
                        </View>
                        <Text style={{ fontSize: Normalize(14), top: 5, color: 'gray' }}>/ Month</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        navigation.push('RoomSelection', {
                            room: selectedKostRoom,
                            roomDetails: kostRoomDetails,
                        });
                    }} style={styles.bookButton}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: Normalize(14) }}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

        return (
            <BottomSheet
                initialSnap={1}
                ref={bottomSheetRef}
                renderHeader={SheetHeader}
                renderContent={SheetBody}
                onOpenStart={() => { _getRoomData() }}
                enabledContentGestureInteraction={false}
                onCloseEnd={() => {
                    setKostRoomDetails(null)
                    setKostFacilities([])
                    selectedKostRoom = null
                }}
                snapPoints={[AppStyle.windowSize.height * 0.85, 0]}
            />
        )
    }

    return (
        //TODO: create function to Prevent double click on navigation, test the leaking memory problem with double click
        <>
            <HomeBackground >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        navigation.pop(1)
                    }} style={styles.headerIcon}>
                        <AntDesign name="left" size={Normalize(24)} color="white" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerText}>{kostName}</Text>
                    </View>
                </View>
                <View style={styles.headerLocation}>
                    <Text style={{ color: 'white', fontSize: Normalize(12) }} >{kostCity}</Text>
                </View>
                <KostPictList />
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
                <KostDescription />
                <View style={styles.softLines} />
                <KostFacilities />
                <View style={styles.softLines} />
                <KostLocation />
                <View style={styles.landmarkWrapper}>
                    <KostBenchmark />
                    <View style={styles.verticalLine} />
                    <KostAccessibility />
                </View>
                <KostAround />
                <View style={styles.softLines} />
                <KostRating />
                <KostReview />
                <View style={[styles.softLines, { top: Normalize(-40) }]} />
                <KostRooms />
                <View style={styles.softLines} />
                <KostOwner />
            </HomeBackground>
            <KostBottomSheet />
        </>
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
        left: AppStyle.windowSize.width * 0.05,
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
        width: AppStyle.windowSize.width,
        height: AppStyle.windowSize.height * 0.33,
    },
    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    topBorder: {
        top: -Normalize(45),
        height: Normalize(15),
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: 'white',
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
        width: Normalize(60),
        alignItems: 'center',
        height: Normalize(30),
        padding: Normalize(5),
        justifyContent: 'center',
        backgroundColor: 'white',
        marginRight: Normalize(10),
        borderRadius: Normalize(10),
    },
    toolsButtonText: {
        fontSize: Normalize(12),
    },
    toolsIcon: {
        elevation: 2,
        alignItems: 'center',
        width: Normalize(34),
        height: Normalize(34),
        backgroundColor: 'white',
        justifyContent: 'center',
        marginLeft: Normalize(10),
        borderRadius: Normalize(100),
        borderColor: 'rgba(0,0,0,0.15)',
    },
    descContainer: {
        top: -Normalize(30),
        marginLeft: Normalize(15),
        width: AppStyle.windowSize.width * 0.9,
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
        width: AppStyle.windowSize.width * 0.9,
    },
    facilitiesTitle: {
        marginBottom: Normalize(10),
    },
    facilitiesBody: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    softLines: {
        height: 1,
        top: -Normalize(10),
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: AppStyle.windowSize.width * 0.9,
        left: AppStyle.windowSize.width * 0.05,
    },
    locationContainer: {
        top: -Normalize(10),
        marginTop: Normalize(15),
        marginLeft: Normalize(15),
        marginBottom: Normalize(15),
        width: AppStyle.windowSize.width * 0.9,
    },
    locationTitle: {
        marginBottom: Normalize(10),
    },
    locationBody: {
        flexDirection: 'row',
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.2,
    },
    landmarkWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: AppStyle.windowSize.width,
    },
    benchmarkContainer: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        left: AppStyle.windowSize.width * 0.05,
    },
    benchmarkTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Normalize(10),
    },
    verticalLine: {
        width: 1,
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    accessibilityContainer: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        left: AppStyle.windowSize.width * 0.05,
    },
    accessibilityTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Normalize(10),
    },
    aroundKostContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: Normalize(15),
        marginLeft: Normalize(15),
        marginBottom: Normalize(25),
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.1,
    },
    aroundKostTitle: {
        marginBottom: Normalize(10),
    },
    aroundKostBody: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    ratingContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: Normalize(10),
        marginLeft: Normalize(15),
        marginBottom: Normalize(25),
        width: AppStyle.windowSize.width * 0.9,
    },
    ratingTitle: {
        marginBottom: Normalize(10),
    },
    ratingBody: {
        width: '100%',
        flexDirection: 'row',
        height: AppStyle.windowSize.height * 0.15,
    },
    ratingBodyLeft: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ratingBodyRight: {
        width: '50%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    reviewContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: Normalize(15),
        marginBottom: Normalize(40),
        width: AppStyle.windowSize.width * 0.9,
    },
    reviewTitle: {
        marginBottom: Normalize(30),
    },
    reviewBody: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: Normalize(20),
        height: AppStyle.windowSize.height * 0.1,
    },
    reviewBodyContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    reviewUserPict: {
        width: (AppStyle.windowSize.width * 0.9) * 0.2,
        height: (AppStyle.windowSize.width * 0.9) * 0.2,
    },
    reviewUserHeader: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: (AppStyle.windowSize.width * 0.9) * 0.2,
        height: (AppStyle.windowSize.width * 0.9) * 0.2,
    },
    reviewUserBody: {
        alignItems: 'center',
        justifyContent: 'center',
        width: (AppStyle.windowSize.width * 0.9) * 0.5,
        height: (AppStyle.windowSize.width * 0.9) * 0.2,
    },
    roomTitle: {
        top: -Normalize(30),
        left: AppStyle.windowSize.width * 0.05,
        width: AppStyle.windowSize.width * 0.9,
    },
    roomBody: {
        top: -Normalize(15),
        left: AppStyle.windowSize.width * 0.05,
        width: AppStyle.windowSize.width * 0.9,
    },
    ownerContainer: {
        marginTop: Normalize(5),
        marginLeft: Normalize(15),
        marginBottom: Normalize(50),
        width: AppStyle.windowSize.width * 0.9,
    },
    ownerTitle: {
        marginBottom: Normalize(10),
    },
    ownerBody: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: AppStyle.windowSize.height * 0.1,
    },
    ownerBodyContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    ownerUserPict: {
        width: (AppStyle.windowSize.width * 0.9) * 0.2,
        height: (AppStyle.windowSize.width * 0.9) * 0.2,
    },
    ownerUserHeader: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: (AppStyle.windowSize.width * 0.9) * 0.2,
        height: (AppStyle.windowSize.width * 0.9) * 0.2,
    },
    ownerUserBody: {
        alignItems: 'center',
        justifyContent: 'center',
        width: (AppStyle.windowSize.width * 0.9) * 0.5,
        height: (AppStyle.windowSize.width * 0.9) * 0.2,
    },
    sheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        borderTopLeftRadius: Normalize(10),
        borderTopRightRadius: Normalize(10),
        height: AppStyle.windowSize.height * 0.05,
    },
    sheetCarouselContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.2,
    },
    sheetRoomTitle: {
        width: '100%',
        alignItems: 'center',
        marginTop: Normalize(15),
        justifyContent: 'center',
    },
    sheetTopInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Normalize(20),
        justifyContent: 'space-between',
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.15,
    },
    sheetTopInfoLeft: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    sheetTopInfoLeftItem: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        borderRightWidth: 0.5,
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: 'rgba(0,0,0,0.25)'
    },
    sheetTopInfoRight: {
        width: '50%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    sheetTopInfoRightItem: {
        width: '100%',
        height: '50%',
        borderLeftWidth: 0.5,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: 'rgba(0,0,0,0.25)'
    },
    sheetSharingFac: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: Normalize(15),
        marginBottom: Normalize(15),
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.1,
    },
    sheetSharingFacTitle: {
        marginBottom: Normalize(10),
    },
    sheetSharingFacBody: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    sheetRoomFac: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: Normalize(15),
        marginBottom: Normalize(15),
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.1,
    },
    sheetRoomFacTitle: {
        marginBottom: Normalize(10),
    },
    sheetRoomFacBody: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    sheetNotes: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: Normalize(15),
        width: AppStyle.windowSize.width * 0.9,
        marginBottom: Normalize(15) + AppStyle.screenSize.width * 0.15,
    },
    sheetNotesTitle: {
        marginBottom: Normalize(10),
    },
    sheetNotesBody: {
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stickyContainer: {
        elevation: 10,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        width: AppStyle.screenSize.width,
        height: AppStyle.screenSize.width * 0.15,
        top: AppStyle.windowSize.height * 0.8 - AppStyle.screenSize.width * 0.15
    },
    priceTag: {
        flexDirection: 'row',
        marginLeft: AppStyle.screenSize.width * 0.05,
    },
    bookButton: {
        alignItems: 'center',
        height: Normalize(35),
        width: Normalize(108),
        justifyContent: 'center',
        borderRadius: Normalize(20),
        backgroundColor: AppStyle.sub_main_color,
        marginRight: AppStyle.screenSize.width * 0.05,
    },

})
