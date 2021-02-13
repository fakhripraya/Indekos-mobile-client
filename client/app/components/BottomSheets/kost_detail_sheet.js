import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppStyle, Normalize } from '../../config/app.config';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const SheetBody = () => (
    <View style={{ backgroundColor: 'white', height: AppStyle.windowSize.height * 0.85 }}>
        <View style={styles.header}>
            <Ionicons name="ios-chevron-down-outline" size={Normalize(14)} color="gray" />
            <Text style={{ fontSize: Normalize(12), color: 'gray', marginLeft: Normalize(10) }}>Close</Text>
        </View>
        <View style={styles.scrollContainer}>
            <View style={styles.roomPictCarousel}>

            </View>
            <View styles={styles.roomTitle}>

            </View>
        </View>
    </View>
);

export default SheetBody;

const styles = StyleSheet.create({

    header: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        height: '90%',
    }

})
