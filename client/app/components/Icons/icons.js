import React from 'react';
import { AppStyle, Normalize } from '../../config/app.config';
import { AntDesign, Ionicons, MaterialIcons, FontAwesome, FontAwesome5, SimpleLineIcons, Octicons } from '@expo/vector-icons';

function Icons(props) {

    if (props.IconID == 1)
        return <Ionicons name="ios-basketball-outline" size={Normalize(18)} color={AppStyle.third_main_color} />
    else if (props.IconID == 2)
        return <SimpleLineIcons name="bag" size={Normalize(18)} color={AppStyle.third_main_color} />
    else if (props.IconID == 3)
        return <MaterialIcons name="shopping-basket" size={Normalize(18)} color={AppStyle.third_main_color} />
    else if (props.IconID == 4)
        return <FontAwesome name="truck" size={Normalize(18)} color={AppStyle.third_main_color} />
    else if (props.IconID == 5)
        return <MaterialIcons name="local-dining" size={Normalize(18)} color={AppStyle.third_main_color} />
    else
        return null

}

export default Icons