import React from 'react';
import { AppStyle, Normalize } from '../../config/app.config';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { normalize } from 'react-native-elements';

function StickyBottom() {

    return (
        <View style={styles.stickyContainer}>
            <View style={styles.priceTag}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(16) }}>Rp.3.000.000</Text>
                </View>
                <Text style={{ fontSize: Normalize(14), top: 5, color: 'gray' }}>/ Month</Text>
            </View>
            <TouchableOpacity style={styles.bookButton}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: Normalize(14) }}>Book Now</Text>
            </TouchableOpacity>
        </View>
    );
}

export default StickyBottom

const styles = StyleSheet.create({

    stickyContainer: {
        elevation: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        width: AppStyle.screenSize.width,
        height: AppStyle.screenSize.width * 0.15,
    },
    priceTag: {
        flexDirection: 'row',
        marginLeft: AppStyle.screenSize.width * 0.05,
    },
    bookButton: {
        borderRadius: 20,
        alignItems: 'center',
        height: Normalize(35),
        width: Normalize(108),
        justifyContent: 'center',
        backgroundColor: AppStyle.sub_main_color,
        marginRight: AppStyle.screenSize.width * 0.05,
    },

})
