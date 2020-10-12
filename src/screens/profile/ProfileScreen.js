import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as S from './styles';
import * as ScaleUtils from '../../utils/scale';
import * as LoadingSelector from '../../redux/reducers/loading';
import * as UserSelector from '../../redux/reducers/user';
import * as UserActions from '../../redux/actions/user';
import { FriendsActions } from '../../redux/actions';

import Header from '../../components/Header/Header';
import DefaultButton from '../../components/button/DefaultButton';

export default function ProfileScreen({ navigation, route }) {
    const { isFriend, friendId } = route.params
    const dispatch = useDispatch();
    const isLoading = useSelector(state => LoadingSelector.getLoading(state));
    const friend = useSelector(state => UserSelector.getFriend(state));

    useEffect(() => {
        getFriendById()
    }, []);

    const getFriendById = async () => {
        try {
            await dispatch(UserActions.getUserById(friendId));
        } catch (err) {
            Alert.alert('Erro', err.message);
        }
    }

    const deleteFriendRule = async (ruleId) => {
        try {
            await dispatch(FriendsActions.deleteFriendRule(friend._id, ruleId));
            await getFriendById();
            Alert.alert('Regra deletada com sucesso', '', [
                {
                    text: 'OK',
                    onPress: () => {},
                }
            ])
        } catch (err) {
            Alert.alert('Erro', err.message);
        }
    }

    const handleRemoveFriend = async () => {
        try {
            await dispatch(FriendsActions.removeFriend(friend._id));
            Alert.alert('', `${friend.name} foi removido dos contatos`, [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                }
            ])
        } catch (err) {
            Alert.alert('Erro', err.message);
        }
    }

    const handleUpdateStatus = async () => {
        try {
            await dispatch(FriendsActions.updateFriendStatus(friend._id, { approved: false }));
            Alert.alert('', 'Este contato não verá mais sua localização!', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                }
            ])
        } catch (err) {
            Alert.alert('Erro', err.message);
        }
    }

    return (
        <>
            <S.ProfileContainerScrollView>
                <Header
                    noStatusBar
                    color
                    onPressListener={() => navigation.goBack()}
                />
                {isLoading && <S.PageLoading />}
                {!isLoading && (
                    <>
                        <S.UserProfileView>
                            <S.ProfileImageView>
                                {friend.profilePhoto ? (
                                    <S.ProfileImage
                                        source={{ uri: friend.profilePhoto.url }}
                                        resizeMode="cover"
                                    />
                                ) : (
                                        <S.ProfileSvg
                                            height={ScaleUtils.ScreenHeight * 0.11}
                                            width={ScaleUtils.ScreenHeight * 0.11}
                                        />
                                    )}
                            </S.ProfileImageView>
                            <S.UserName>{friend.name}</S.UserName>
                        </S.UserProfileView>
                        <S.InputContainer>
                            <S.InputLabel>Telefone</S.InputLabel>
                            <S.ProfileInfoText> {friend.phone} </S.ProfileInfoText>
                            {/* <S.InputLabel> Grupos</S.InputLabel>
                            <S.ProfileInfoText> - Amigos </S.ProfileInfoText> */}
                        </S.InputContainer>
                        <S.InputLabel>Regras</S.InputLabel>
                        {friend && friend.rules && friend.rules.map((item, index) => (
                            <S.RulesView>
                                <S.RulesText>
                                    {`${index + 1} - `}{item.action === 1 ? 'Chegar em ' : 'Sair de '}{item.areaName}
                                </S.RulesText>
                                <S.RulesTouchableOpacityIcon
                                    onPress={() => deleteFriendRule(item._id)}
                                >
                                    <S.RulesIcon
                                        name="trash-o"
                                        color="#FFF"
                                        size={18}
                                    />
                                </S.RulesTouchableOpacityIcon>
                            </S.RulesView>
                        ))}
                        <S.ButtonsContainer>
                            {/* <DefaultButton
                                text="Adicionar a um grupo"
                                onPressListener={() => { }}
                                border="#FFF"
                                fontColor="#FFF"
                                background="transparent"
                            /> */}
                            <DefaultButton
                                text={isFriend ? "Remover contato" : "Remover dos Seguidores"}
                                onPressListener={isFriend ? handleRemoveFriend : handleUpdateStatus}
                                border="#FFF"
                                fontColor="#FFF"
                                background="transparent"
                            />
                        </S.ButtonsContainer>
                    </>
                )}
            </S.ProfileContainerScrollView>
        </>
    );
}
