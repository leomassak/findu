import React, { useRef, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import Geolocation from '@react-native-community/geolocation';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { Animated, PermissionsAndroid } from 'react-native';

import * as ScaleUtils from '../../utils/scale';
import * as S from './styles';

import * as UserActions from '../../redux/actions/user';

import PermissionModal from '../../components/modal/PermissionModal';

export default function HomeScreen(props) {
    const dispatch = useDispatch();
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

    useEffect(() => {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            notificationTitle: 'FindU',
            notificationText: 'FindU está utilizando sua localizção',
            //debug: true,
            startOnBoot: false,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER, // DISTANCE_FILTER_PROVIDER for
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 10000,
            stopOnStillActivity: false,
        });

        BackgroundGeolocation.on('location', async (location) => {
            await dispatch(UserActions.updateUserLocation({
                lat: location.latitude,
                lng: location.longitude,
            }));
            // handle your locations here
            // to perform long running operation on iOS
            // you need to create background task
            BackgroundGeolocation.startTask((taskKey) => {
                // execute long running task
                // eg. ajax post location
                // IMPORTANT: task has to be ended by endTask
                BackgroundGeolocation.endTask(taskKey);
            });
        });

        BackgroundGeolocation.on('authorization', (status) => {
            console.log(
                '[INFO] BackgroundGeolocation authorization status: ' + status,
            );
            if (status !== BackgroundGeolocation.AUTHORIZED) {
                // we need to set delay or otherwise alert may not be shown
                setTimeout(
                    () =>
                        Alert.alert(
                            'App requires location tracking permission',
                            'Would you like to open app settings?',
                            [
                                {
                                    text: 'No',
                                    onPress: () => console.log('No Pressed'),
                                    style: 'cancel',
                                },
                            ],
                        ),
                    1000,
                );
            }
        });

        BackgroundGeolocation.on('background', () => {
            console.log('[INFO] App is in background');
        });

        BackgroundGeolocation.on('foreground', () => {
            console.log('[INFO] App is in foreground');
        });

        BackgroundGeolocation.checkStatus((status) => {
            console.log(
                '[INFO] BackgroundGeolocation service is running',
                status.isRunning,
            );
            console.log(
                '[INFO] BackgroundGeolocation services enabled',
                status.locationServicesEnabled,
            );
            console.log(
                '[INFO] BackgroundGeolocation auth status: ' + status.authorization,
            );

            // you don't need to check status before start (this is just the example)
            if (!status.isRunning) {
                BackgroundGeolocation.start(); //triggers start on start event
            }
        });

        return () => {
            console.log('Removing all listeners');
            BackgroundGeolocation.removeAllListeners();
        };
    })

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
            <StatusBar 
               barStyle="light-content"
               backgroundColor="#4F80E1" 
            />
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
