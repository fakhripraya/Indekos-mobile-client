import React from 'react';
import { Text, View } from 'react-native';
import { AppStyle } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import { AntDesign, MaterialCommunityIcons, MaterialIcons, FontAwesome, Entypo, Ionicons, Feather } from '@expo/vector-icons';

export function MappedFacilities(props) {
    return (
        props.facilities.map((item, index) => {
            return (
                <Facilities key={index} facCategory={props.category} facDesc={item.fac_desc} />
            )
        })
    )
}

export function Facilities(props) {

    if (props.facCategory === 0) {
        if (props.facDesc == "AC")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome name="snowflake-o" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else if (props.facDesc == "Canteen")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialIcons name="storefront" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else if (props.facDesc == "24 Hours Security")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="unlock" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else if (props.facDesc == "Wifi")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="wifi" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else
            return null
    } else if (props.facCategory === 1) {
        if (props.facDesc == "CCTV")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="cctv" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else if (props.facDesc == "Kitchen")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialIcons name="kitchen" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else if (props.facDesc == "Canteen")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialIcons name="storefront" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else if (props.facDesc == "Wifi")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="wifi" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else if (props.facDesc == "24 Hours Security")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="unlock" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else
            return null
    } else if (props.facCategory === 2) {
        if (props.facDesc == "Laundry")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialIcons name="local-laundry-service" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else if (props.facDesc == "Bathroom")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome name="bathtub" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else if (props.facDesc == "Superbed")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="ios-bed-outline" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else if (props.facDesc == "AC")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome name="snowflake-o" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else if (props.facDesc == "Token")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Entypo name="flash" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else if (props.facDesc == "TV")
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Feather name="tv" size={Normalize(14)} color={AppStyle.third_main_color} />
                    <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + props.facDesc}</Text>
                </View>
            )
        else
            return null
    }

}