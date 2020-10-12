import React, { useRef, useEffect, useState, useMemo } from 'react';
import { StatusBar, Linking } from 'react-native';
import { Circle, Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import Geolocation from '@react-native-community/geolocation';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { Animated, PermissionsAndroid } from 'react-native';
import * as LocationRules from '../../enumerators/rules';

import * as ScaleUtils from '../../utils/scale';
import * as S from './styles';
import IconCloseModal from '../../assets/svg/ic-close.svg';

import * as UserActions from '../../redux/actions/user';
import * as LoadingSelector from '../../redux/reducers/loading';
import * as FriendsActions from '../../redux/actions/friends';
import * as FriendsSelectors from '../../redux/reducers/friends';

import PermissionModal from '../../components/modal/PermissionModal';
import Loading from '../../components/Loading/Loading';
import DefaultButton from '../../components/button/DefaultButton';


import AppStorage from '../../services/storage';


export default function HomeScreen(props) {
    const ASPECT_RATIO = ScaleUtils.ScreenWidth / ScaleUtils.ScreenHeight;
    const dispatch = useDispatch();
    const loading = useSelector(state => LoadingSelector.getLoading(state))
    const friends = useSelector(state => FriendsSelectors.getAllFriends(state))

    const drawerOpened = useIsDrawerOpen();
    const rotationValue = useRef(new Animated.Value(0)).current;
    const spin = rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    })

    const [initialCordinates, setInitialCordinates] = useState({});
    const [token, setToken] = useState('');
    const [region, setRegion] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusBarHeight, setStatusBarHeight] = useState(0);
    const [userSelected, setUserSelected] = useState({});
    const [userSelectedPage, setUserSelectedPage] = useState(0);
    const [userArea, setUserArea] = useState(0);
    const [userAreaName, setUserAreaName] = useState('');
    const [showUserArea, setShowUserArea] = useState(false);
    const [latitudeDelta, setLatitudeDelta] = useState(0.01);
    const [longitudeDelta, setLongitudeDelta] = useState(latitudeDelta * ASPECT_RATIO);


    const MapMemo = useMemo(() =>
        <S.PageMapViewContainerView
            height={friends.length === 0}
        >
            {region.longitude && region.latitude && (
                <S.PageMapView
                    showsUserLocation
                    showsCompass={false}
                    followsUserLocation
                    onPress={(e) => handleMapPress(e)}
                    zoomEnabled
                    region={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta,
                    }}
                >
                    {friends.length > 0 && friends.map((item) => (
                        <>
                        {showUserArea && (
                            <>
                            <Circle 
                                center={{
                                    latitude: region.latitude,
                                    longitude: region.longitude,
                                }}
                                radius={userArea * 1000}
                                fillColor="#4F80E125"
                                strokeColor="#CECECE"
                            />
                               <S.PageMarker
                                    coordinate={{
                                        latitude: region.latitude,
                                        longitude: region.longitude,
                                        latitudeDelta: latitudeDelta,
                                        longitudeDelta: longitudeDelta,
                                    }}
                                >
                                    <S.PageMarkerView>
                                        <S.PageMarkerDefaultSvg
                                            height={ScaleUtils.ScreenHeight * 0.035}
                                            width={ScaleUtils.ScreenHeight * 0.035}
                                        />
                                    </S.PageMarkerView>
                                </S.PageMarker>
                            </>
                        )}
                            {item.location && item.location.coordinates && (
                                <S.PageMarker
                                    coordinate={{
                                        latitude: item.location.coordinates[1],
                                        longitude: item.location.coordinates[0],
                                        latitudeDelta: latitudeDelta,
                                        longitudeDelta: longitudeDelta,
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
        , [region, userArea, showUserArea]);

    useEffect(() => {
        getToken();
        askForPermission();
        getAllFriends();
        setTimeout(() => setStatusBarHeight(5), 500);

        const unsubscribe = startFriendsLoopRequest();

        return () => {
            clearInterval(unsubscribe);
        }
    }, [])

    const getToken = async () => {
        const userToken = await AppStorage.getToken();
        setToken(userToken);
    }

    useEffect(() => {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            debug: true,
            notificationTitle: 'FindU',
            notificationText: 'FindU está utilizando sua localizção',
            startOnBoot: false,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 10000,
            stopOnStillActivity: false,
            url: 'https://backend-findu.herokuapp.com/api/locations',
            httpHeaders: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            postTemplate: {
                lat: '@latitude',
                lng: '@longitude',
            }
        });

        BackgroundGeolocation.on('location', async (location) => {
            // handle your locations here
            // to perform long running operation on iOS
            // you need to create background task
            BackgroundGeolocation.startTask(async (taskKey) => {
                // execute long running task
                // eg. ajax post location
                // IMPORTANT: task has to be ended by endTask
                BackgroundGeolocation.endTask(taskKey);
            });
        });

        BackgroundGeolocation.on('authorization', (status) => {
            // console.log(
            //     '[INFO] BackgroundGeolocation authorization status: ' + status,
            // );
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

        BackgroundGeolocation.checkStatus((status) => {
            // you don't need to check status before start (this is just the example)
            if (!status.isRunning) {
                BackgroundGeolocation.start(); //triggers start on start event
            }
        });

        return () => {
            // console.log('Removing all listeners');
            BackgroundGeolocation.removeAllListeners();
        };
    })

    const startFriendsLoopRequest = () => setInterval(() => {
        getAllFriends();
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

    const onChangeArea = (text) => {
        if (text != '') {
            setUserArea(parseFloat(text))
        } else {
            setUserArea(0)
        }
    }

    const saveUserArea = async () => {
        const action = userSelectedPage === 2 ? LocationRules.RuleType.LEAVE_AREA : LocationRules.RuleType.ENTER_AREA;
         try {
            await dispatch(FriendsActions.createFriendRule(
                userSelected._id, 
                region, 
                userArea,
                userAreaName, 
                LocationRules.RuleLocationType.POINT, 
                action,
                ));
                Alert.alert('Sucesso', 'Regra criada com sucesso');
                clearFriendRule();
                setRegion({ 
                    latitude: userSelected.location.coordinates[1],
                    longitude: userSelected.location.coordinates[0],
                });
         } catch(err) {
            Alert.alert('Erro', err.message);
         }
    }

    const clearFriendRule = () => {
        setUserSelected({});
        setUserSelectedPage(0);
        setShowUserArea(false);
        setUserArea(0);
        setLatitudeDelta(0.01);
        setUserAreaName('');
    }

    const handleMapPress = (event) => {
        if(showUserArea) {
            console.log('entrei');
            setRegion(event.nativeEvent.coordinate);
        }
    }

    return (
        <>
            {loading && <Loading />}
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
                {Object.keys(friends).length >= 0 && MapMemo}
                {Object.keys(userSelected).length === 0 && Object.keys(friends).length > 0 && (
                    <S.PageFriendListScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {friends.length > 0 && friends.map((item) => (
                            <S.PageFriendDetailsTouchableOpacity
                                activeOpacity={0.7}
                                disabled={!item.location.coordinates}
                                onPress={() => {
                                    setRegion({
                                        latitude: item.location.coordinates[1],
                                        longitude: item.location.coordinates[0],
                                    })
                                    setUserSelected(item);
                                }}
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
                                        {item.location.coordinates
                                            ? `${item.location.distance.toFixed(1)} km`
                                            : 'Não possui registro de localização'}
                                    </S.PageFriendDistanceText>
                                </S.PageFriendTextView>
                            </S.PageFriendDetailsTouchableOpacity>
                        ))}
                    </S.PageFriendListScrollView>
                )}
                {Object.keys(userSelected).length > 0 && (
                    <S.PageFriendListScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <S.CloseTouchableOpacity
                            onPress={() => {
                                if (userSelectedPage === 0) setUserSelected({});
                                else{ 
                                    setUserSelectedPage(0);
                                    clearFriendRule();
                                };
                            }}
                        >
                            <IconCloseModal />
                        </S.CloseTouchableOpacity>
                        <S.PageFriendDetailsView>
                            <S.PageFriendImageView>
                                {userSelected.profilePhoto ? (
                                    <S.PageFriendImage
                                        source={{ uri: userSelected.profilePhoto.url }}
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
                                    {userSelected.name}
                                </S.PageFriendNameText>
                                <S.PageFriendDistanceText>
                                    {userSelected.location.coordinates
                                        ? `${userSelected.location.distance.toFixed(1)} km`
                                        : 'Não possui registro de localização'}
                                </S.PageFriendDistanceText>
                            </S.PageFriendTextView>
                        </S.PageFriendDetailsView>
                        <S.PageFriendDetailsButtonView>
                            { userSelectedPage === 0 || userSelectedPage === 1 ? (
                                <>
                                    <DefaultButton
                                text={userSelectedPage === 0
                                    ? 'Notificar quando...'
                                    : 'Sair da área'}
                                onPressListener={() => {
                                    if (userSelectedPage === 0) {
                                        setUserSelectedPage(1)
                                    } else {
                                        console.log('Sair da área')
                                        setUserSelectedPage(2)
                                        setShowUserArea(true);
                                    }
                                }}
                            />
                            <DefaultButton
                                text={userSelectedPage === 0
                                    ? 'Entrar em contato'
                                    : 'Chegar no local'}
                                onPressListener={() => {
                                    if (userSelectedPage === 0) {
                                        Alert.alert(
                                            'Entrar em contato',
                                            'Deseja ligar para o usuário selecionado?',
                                            [
                                                {
                                                    text: 'Não',
                                                    onPress: () => { },
                                                },
                                                {
                                                    text: 'Sim',
                                                    onPress: () => Linking.openURL(`tel:${userSelected.phone}`),
                                                },
                                            ],
                                        );
                                    } else {
                                        console.log('Chegar no local')
                                        setUserSelectedPage(3)
                                        setShowUserArea(true);
                                    }
                                }}
                            />
                                </>
                            ) : (
                                <S.DefineUserAreaView>
                                     <S.DefineUserAreaText>
                                        Definir nome de área:
                                    </S.DefineUserAreaText>
                                    <S.AreaNameInput onChangeText={(text) => setUserAreaName(text)} placeholder="Nome da área" placeholderTextColor="#CECECE" />
                                    <S.DefineUserAreaText>
                                        Definir raio de área:
                                    </S.DefineUserAreaText>
                                    <S.DefineUserAreaContent>
                                        <S.ButtonAreaView>
                                            <S.DefineAreaButton onPress={() => {setUserArea(userArea + 1); setLatitudeDelta(latitudeDelta + 0.05)}}>
                                                <Icon name="keyboard-arrow-up" color="#000" size={30} />
                                            </S.DefineAreaButton>
                                            <S.DefineAreaButton onPress={userArea > 0 ? () => {setUserArea(userArea - 1);setLatitudeDelta(latitudeDelta - 0.05)} : () => {}}>
                                                <Icon name="keyboard-arrow-down" color="#000" size={30}/>
                                            </S.DefineAreaButton>
                                        </S.ButtonAreaView>
                                        <S.AreaValue onChangeText={(text) => onChangeArea(text)}>{userArea === NaN ? 0 : userArea}</S.AreaValue>
                                        <S.AreaUnity>Km</S.AreaUnity>
                                    </S.DefineUserAreaContent>
                                    <DefaultButton
                                text="Salvar"
                                onPressListener={() => saveUserArea()}
                            />
                                </S.DefineUserAreaView>
                            ) }
                            
                        </S.PageFriendDetailsButtonView>
 
                    </S.PageFriendListScrollView>
                )}
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
