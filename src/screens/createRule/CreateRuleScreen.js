import React, { useState } from 'react';
import { Circle } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as LocationRules from '../../enumerators/rules';

import * as ScaleUtils from '../../utils/scale';
import * as S from './styles';

import * as LoadingSelector from '../../redux/reducers/loading';
import * as UserSelector from '../../redux/reducers/user';
import * as FriendsActions from '../../redux/actions/friends';
import * as GroupsActions from '../../redux/actions/groups';

import Loading from '../../components/Loading/Loading';
import DefaultButton from '../../components/button/DefaultButton';



export default function CreateRule({navigation, route}) {
    const {friend, group, initialRegion, action} = route.params;
    const ASPECT_RATIO = ScaleUtils.ScreenWidth / ScaleUtils.ScreenHeight;

    const dispatch = useDispatch();
    const loading = useSelector(state => LoadingSelector.getLoading(state));

    const [region, setRegion] = useState(initialRegion || {});
    const [userArea, setUserArea] = useState(0);
    const [showSelectedMarker, setShowSelectedMarker] = useState(false);
    const [latitudeDelta, setLatitudeDelta] = useState(0.01);
    const [userAreaName, setUserAreaName] = useState('');
    const [longitudeDelta, setLongitudeDelta] = useState(latitudeDelta * ASPECT_RATIO);

    const saveUserArea = async () => {
         try {
            await dispatch(FriendsActions.createFriendRule(
                friend._id, 
                region, 
                userArea,
                userAreaName, 
                LocationRules.RuleLocationType.POINT, 
                action,
                ));
                Alert.alert(
                    'Sucesso',
                    'Alerta criado com sucesso',
                    [
                        {
                            text: 'Ok',
                            onPress: () => onBack(),
                        },
                        
                    ], { cancelable: false }
                )
         } catch(err) {
            Alert.alert('Erro', err.message);
         }
    }

    const saveGroupArea = async () => {
        try {
            await dispatch(GroupsActions.createGroupRule(
                group._id,
                region,
                userArea,
                userAreaName,
                LocationRules.RuleLocationType.POINT,
                action,
            ));
            Alert.alert(
                'Sucesso',
                'Alerta criado com sucesso',
                [
                    {
                        text: 'Ok',
                        onPress: () => onBack(),
                    },

                ], { cancelable: false }
            )
        } catch (err) {
            Alert.alert('Erro', err.message);
        }
    }

    const onBack = () => {
        clearFriendRule();
        navigation.goBack();
    }

    const clearFriendRule = () => {
        setShowSelectedMarker(false);
        setUserArea(0);
        setLatitudeDelta(0.01);
        setUserAreaName('');
    }

    const handleMapPress = (event) => {
            setRegion(event.nativeEvent.coordinate);
            setShowSelectedMarker(true);
    }

    const onChangeArea = (text) => {
        if (text != '') {
            setUserArea(parseFloat(text))
        } else {
            setUserArea(0)
        }
    }

  return (
        <>
            {loading && <Loading />}
            <S.RuleScreenContainer>
                <S.PageMapViewContainerView>
                    <S.PageMapView
                    showsCompass={false}
                    onPress={(e) => handleMapPress(e)}
                    zoomEnabled
                    region={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta,
                    }}
                    >
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
                            {friend ? (
                                <>
                                    {friend.profilePhoto ? (
                                        <S.PageMarkerImage
                                            source={{ uri: friend.profilePhoto.url }}
                                        />
                                    ) : (
                                        <S.PageMarkerDefaultSvg
                                          height={ScaleUtils.ScreenHeight * 0.035}
                                          width={ScaleUtils.ScreenHeight * 0.035}
                                        />
                                    )}
                                </>
                            ): (
                                <S.PageMarkerImage
                                    color={group.color}
                                />
                            )}
                        </S.PageMarkerView>
                        </S.PageMarker>
                </S.PageMapView>
            </S.PageMapViewContainerView>
                            <S.PageFriendDetailsView>
                            <S.PageFriendImageView>
                                {friend ? (
                                    <>
                                        {friend.profilePhoto ? (
                                            <S.PageFriendImage
                                                source={{ uri: friend.profilePhoto.url }}
                                            />
                                        ) : (
                                                <S.PageMarkerDefaultSvg
                                                    height={ScaleUtils.ScreenHeight * 0.035}
                                                    width={ScaleUtils.ScreenHeight * 0.035}
                                                />
                                            )}
                                    </>
                                ) : (
                                    <S.PageFriendImage
                                        color={group.color}
                                    />
                                )}
                            </S.PageFriendImageView>
                            <S.PageFriendTextView>
                                <S.PageFriendNameText>
                                    {friend ? friend.name : group.name}
                                </S.PageFriendNameText>
                                <S.PageFriendDistanceText>
                                    {friend && (
                                        <>
                                            {friend && friend.location.coordinates
                                                ? `${friend.location.distance.toFixed(1)} km`
                                                : 'Não possui registro de localização'}
                                        </>
                                    )}
                                </S.PageFriendDistanceText>
                            </S.PageFriendTextView>
                            <S.BackButton onPress={() => navigation.goBack()}>
                                <S.BackButtonText>
                                  Voltar
                                </S.BackButtonText>
                            </S.BackButton>
                        </S.PageFriendDetailsView>
                    <S.PageFriendListScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <S.PageFriendDetailsButtonView>
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
                                    onPressListener={() => friend ? saveUserArea() : saveGroupArea()}
                                    />
                                </S.DefineUserAreaView>                            
                        </S.PageFriendDetailsButtonView>
                    </S.PageFriendListScrollView>
            </S.RuleScreenContainer>
        </>
        );
    }