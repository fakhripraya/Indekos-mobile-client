import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';

export default function MapShow(props) {

    const { width, height } = Dimensions.get('window');

    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    if (props.latitude === "" || props.longitude === "") {
        return null
    } else {
        return (
            <MapView
                style={styles.mapContainer}
                loadingEnabled={true}
                region={{
                    latitude: parseFloat(props.latitude),
                    longitude: parseFloat(props.longitude),
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }}>
                <Marker
                    coordinate={{
                        latitude: parseFloat(props.latitude),
                        longitude: parseFloat(props.longitude),
                    }}
                />
            </MapView>
        )
    }

}

const styles = StyleSheet.create({

    mapContainer: {
        width: '100%',
        height: '100%',
    }

})


