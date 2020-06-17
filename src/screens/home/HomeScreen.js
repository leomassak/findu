import React, { useRef, useEffect, useState, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import Geolocation from '@react-native-community/geolocation';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { Animated, PermissionsAndroid } from 'react-native';

import * as ScaleUtils from '../../utils/scale';
import * as S from './styles';

import * as UserActions from '../../redux/actions/user';
import * as LoadingSelector from '../../redux/reducers/loading';
import * as FriendsActions from '../../redux/actions/friends';
import * as FriendsSelectors from '../../redux/reducers/friends';

import PermissionModal from '../../components/modal/PermissionModal';

export default function HomeScreen(props) {
    const dispatch = useDispatch();
    const friends = useSelector(state => FriendsSelectors.getAllFriends(state))

    const drawerOpened = useIsDrawerOpen();
    const rotationValue = useRef(new Animated.Value(0)).current;
    const spin = rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    })
    const [initialCordinates, setInitialCordinates] = useState({});
    const [region, setRegion] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusBarHeight, setStatusBarHeight] = useState(0);

    const ASPECT_RATIO = ScaleUtils.ScreenWidth / ScaleUtils.ScreenHeight;
    const LATITUDE_DELTA = 0.01;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const MapMemo = useMemo(() => 
    <S.HomeContainer
        style={{ paddingTop: statusBarHeight }}
        >
        <S.PageMapViewContainerView
        height={friends.length === 0}
        >
            {region.longitude && region.latitude && (
                <S.PageMapView
                    showsUserLocation
                    showsCompass={false}
                    followsUserLocation
                    zoomEnabled
                    // initialRegion={{
                    //     latitude: initialCordinates.latitude,
                    //     longitude: initialCordinates.longitude,
                    //     latitudeDelta: LATITUDE_DELTA,
                    //     longitudeDelta: LONGITUDE_DELTA,
                    // }}
                    region={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    {friends.length > 0 && friends.map((item) => (
                        <>
                            {item.location && (
                                <S.PageMarker
                                    coordinate={{
                                    latitude: item.location.lat,
                                    longitude: item.location.lng,
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                    }}
                                >
                                    <S.PageMarkerView>
                                    {item.profilePhoto ? (
                                    <S.PageMarkerImage
                                    source={{ uri: item.profilePhoto.url }}
                                    />
                                    ) : (
                                    <S.PageMarkerDefaultSvg
                                    height={ScaleUtils.ScreenHeight * 0.035}
                                    width={ScaleUtils.ScreenHeight * 0.035}
                                    />
                                    )}
                                    </S.PageMarkerView>
                                </S.PageMarker>
                            )}
                        </>
                    ))}
                </S.PageMapView>
            )}
        </S.PageMapViewContainerView>
        </S.HomeContainer>
      , [region]);

    useEffect(() => {
        askForPermission();
        getAllFriends();
        setTimeout(() => setStatusBarHeight(5), 500);

        const unsubscribe = startFriendsLoopRequest();

        return () => {
            clearInterval(unsubscribe);
        }
    }, [])

    useEffect(() => {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 20,
            distanceFilter: 20,
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
            // setRegion({
            //     latitude: location.latitude,
            //     longitude: location.longitude,
            // })
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

    const startFriendsLoopRequest = () => setInterval(() => {
        getAllFriends();
        // console.log('chamou')
    }, 10000);


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

    const getAllFriends = async () => {
        try {
            await dispatch(FriendsActions.getAllFriends());
        } catch (err) {
            Alert.alert('Erro', err.message);
        }
    }

    const getCurrentPosition = async () => {
        await Geolocation.getCurrentPosition(
            async (position) => {
                setInitialCordinates(position.coords)
                setRegion(position.coords)
                await dispatch(UserActions.updateUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }));
            },
            error => {
                setIsModalOpen(true);
            }
        );
    }

    console.log(friends);

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
            <S.HomeContainer
                style={{ paddingTop: statusBarHeight }}
            >
                { MapMemo }
                <S.PageFriendListScrollView>
                    {friends.length > 0 && friends.map((item) => (
                        <S.PageFriendDetailsTouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setRegion({
                                latitude: item.location.lat,
                                longitude: item.location.lng,
                            })}
                        >
                            <S.PageFriendImageView>
                                {item.profilePhoto ? (
                                    <S.PageFriendImage
                                        source={{ uri: item.profilePhoto.url }}
                                    />
                                ) : (
                                        <S.PageMarkerDefaultSvg
                                            height={ScaleUtils.ScreenHeight * 0.065}
                                            width={ScaleUtils.ScreenHeight * 0.065}
                                        />
                                    )}
                            </S.PageFriendImageView>
                            <S.PageFriendTextView>
                                <S.PageFriendNameText>
                                    {item.name}
                                </S.PageFriendNameText>
                                <S.PageFriendDistanceText>
                                    {item.location
                                        ? `${Math.round(item.location.distance)} km`
                                        : 'Não possui registro de localização'}
                                </S.PageFriendDistanceText>
                            </S.PageFriendTextView>
                        </S.PageFriendDetailsTouchableOpacity>
                    ))}
                </S.PageFriendListScrollView>
                <S.BurguerButton
                    onPress={() => {
                        setRegion(initialCordinates)
                        props.navigation.toggleDrawer();
                    }}
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
