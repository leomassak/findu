import React, { useRef, useEffect } from 'react';
import { Animated, PermissionsAndroid } from 'react-native';

import * as ScaleUtils from '../../utils/scale';
import * as S from './styles';

export default function HomeScreen(props) {
    const drawerOpened = useIsDrawerOpen();
    const rotationValue = useRef(new Animated.Value(0)).current;
    const spin = rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    })

    const ASPECT_RATIO = ScaleUtils.ScreenWidth / ScaleUtils.ScreenHeight;
    const LATITUDE_DELTA = 0.01;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const rotateBurguer = () => {
        Animated.timing(
        rotationValue,
        {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }
        ).start()
    }

    useEffect(() => {
        Animated.timing(
        rotationValue,
        {
        toValue: drawerOpened ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
        }
        ).start();
    }, [drawerOpened]);

    return (
        <S.HomeContainer>
            <S.BurguerButton 
                onPress={() => {props.navigation.toggleDrawer()}}
            >
                <Animated.View style={{
                    transform: [{ rotate: spin }]
                }}>
                    <S.BurguerIcon /> 
                </Animated.View>
            </S.BurguerButton>
            <S.PageMapViewContainerView>
                <S.PageMapView
                    showsUserLocation
                    followsUserLocation
                    zoomEnabled
                    initialRegion={{
                        latitude: -22.887540,
                        longitude: -47.061313,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    onMapReady={() => {
                        PermissionsAndroid.request(
                          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                        )
                    }}
                >
                    {/* {stationLocation && (
                        <S.PageMarker
                            coordinate={{
                                latitude: stationLocation.latitude,
                                longitude: stationLocation.longitude,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            }}
                        >
                            <MarkerLocationIcon />
                        </S.PageMarker>
                    )} */}
                </S.PageMapView>
            </S.PageMapViewContainerView>
        </S.HomeContainer>
    )
}
