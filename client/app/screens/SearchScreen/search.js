import Carousel from 'react-native-snap-carousel';
import React, { useRef, useState, useEffect } from 'react';
import { AppStyle, Normalize } from '../../config/app.config';
import SearchBackground from '../../components/Backgrounds/search_background';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function Search() {

    // Function Refs
    const filterCarouselRef = useRef(null);

    // Function states
    const [filterList, setFilterList] = useState(null)

    // data dummy 
    const filters = [
        [
            {
                id: 0,
                desc: "Most Popular",
                state: false,
            },
            {
                id: 1,
                desc: "Near You",
                state: false,
            },
            {
                id: 2,
                desc: "Cheapest",
                state: false,
            },
            {
                id: 3,
                desc: "Et cetera",
                state: false,
            }
        ],
        [
            {
                id: 4,
                desc: "Et cetera",
                state: false,
            },
            {
                id: 5,
                desc: "Secondly",
                state: false,
            },
            {
                id: 6,
                desc: "Minutely",
                state: false,
            },
            {
                id: 7,
                desc: "Hourly",
                state: false,
            }
        ],
    ]

    function _renderFilters({ item, index }) {
        let parent = index

        return (
            <View style={styles.buttonWrapper}>
                {item.map((item, index) => {

                    const txtColor = item.state ? "white" : 'black'
                    const bgColor = item.state ? AppStyle.fourt_main_color : "white"

                    return (
                        <TouchableOpacity key={index} onPress={() => { updateFilterList(index, parent) }}>
                            <View style={[styles.buttonPeriod, { backgroundColor: bgColor, borderColor: AppStyle.fourt_main_color }]}>
                                <Text style={{ fontWeight: 'bold', color: txtColor, fontSize: Normalize(12) }}>{item.desc}</Text>
                            </View>
                        </TouchableOpacity>
                    )

                })}
            </View>
        )
    }

    // update the state of the period
    const updateFilterList = (index, parent) => {

        const newArr = [...filterList];

        if (filterList[parent][index].state === false)
            newArr[parent][index].state = true;
        else
            newArr[parent][index].state = false;

        setFilterList(newArr);
    }

    // fetch the data from the server
    useEffect(() => {
        if (filterList === null)
            setFilterList(filters)
    }, [])

    if (filterList === null) {
        return null
    } else {
        return (
            <SearchBackground>
                <View style={styles.headerContainer}>
                    <View style={styles.searchBar}>
                        <TextInput />
                    </View>
                    <View style={styles.carouselContainer}>
                        <Carousel
                            layout={"default"}
                            ref={filterCarouselRef}
                            data={filterList}
                            itemWidth={AppStyle.windowSize.width * 0.9}
                            sliderWidth={AppStyle.windowSize.width * 0.9}
                            renderItem={_renderFilters}
                        />
                    </View>
                </View>
                <View style={styles.sortButtonWrapper}>
                    <TouchableOpacity style={[styles.sortButton, { borderRightWidth: 1 }]}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: Normalize(12) }}>Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sortButton}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: Normalize(12) }}>Sort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.sortButton, { borderLeftWidth: 1 }]}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: Normalize(12) }}>Map</Text>
                    </TouchableOpacity>
                </View>
            </SearchBackground>
        )
    }
}

const styles = StyleSheet.create({

    headerContainer: {
        width: AppStyle.screenSize.width,
        height: AppStyle.screenSize.height * 0.275,
    },
    searchBar: {
        position: 'absolute',
        height: Normalize(36),
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: Normalize(10),
        width: AppStyle.windowSize.width * 0.9,
        left: AppStyle.windowSize.width * 0.05,
        top: ((AppStyle.screenSize.height * 0.275) / 2) - (Normalize(36) / 2),
    },
    carouselContainer: {
        position: 'absolute',
        justifyContent: 'center',
        width: AppStyle.windowSize.width * 0.9,
        left: AppStyle.windowSize.width * 0.05,
        top: ((((AppStyle.screenSize.height * 0.275) / 2) + (AppStyle.screenSize.height * 0.275) / 3)) - (Normalize(36) / 2),
    },
    buttonWrapper: {
        width: '100%',
        flexDirection: 'row',
    },
    buttonPeriod: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Normalize(10),
        marginRight: Normalize(10),
        borderRadius: Normalize(10),
        borderColor: 'rgba(0, 0, 0, 0.15)',
    },
    sortButtonWrapper: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        height: Normalize(42),
        justifyContent: 'space-evenly',
    },
    sortButton: {
        alignItems: 'center',
        height: Normalize(30),
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.15)',
        width: AppStyle.windowSize.width * 0.9 / 3,
    }

})
