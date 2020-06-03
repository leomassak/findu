import React, { useRef, useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { Animated, PermissionsAndroid } from 'react-native';

import * as ScaleUtils from '../../utils/scale';
import * as S from './styles';

import PermissionModal from '../../components/modal/PermissionModal';

export default function HomeScreen(props) {
    const drawerOpened = useIsDrawerOpen();
    const rotationValue = useRef(new Animated.Value(0)).current;
    const spin = rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    })
    const [initialCordinates, setInitialCordinates] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const ASPECT_RATIO = ScaleUtils.ScreenWidth / ScaleUtils.ScreenHeight;
    const LATITUDE_DELTA = 0.01;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    useEffect(() => {
        askForPermission();
    }, [])

    const askForPermission = async () => {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            .then(async (response) => {
                if (!response) {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                        .then(async () => {
                            await getCurrentPosition();
                        })
                } else {
                    await getCurrentPosition();
                }
            });
    }

    const getCurrentPosition = async () => {
        await Geolocation.getCurrentPosition(
            async (position) => {
                setInitialCordinates(position.coords)
            },
            error => {
                setIsModalOpen(true);
            }
        );
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

    const onPressModal = () => {
        setIsModalOpen(false);
        askForPermission();
    }


    return (
        <>
            <PermissionModal
                isVisible={isModalOpen}
                onDismiss={() => onPressModal()}
                onPress={() => onPressModal()}
            />
            <S.HomeContainer>
                <S.PageMapViewContainerView>
                    {initialCordinates.longitude && initialCordinates.latitude && (
                        <S.PageMapView
                            showsUserLocation
                            followsUserLocation
                            zoomEnabled
                            initialRegion={{
                                latitude: initialCordinates.latitude,
                                longitude: initialCordinates.longitude,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
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
                    )}
                </S.PageMapViewContainerView>
                <S.BurguerButton 
                    onPress={() => props.navigation.toggleDrawer()}
                    activeOpacity={0.7}
                >
                    <Animated.View style={{
                        transform: [{ rotate: spin }]
                    }}>
                        <S.BurguerIcon /> 
                    </Animated.View>
                </S.BurguerButton>
            </S.HomeContainer>
        </>
    )
}
