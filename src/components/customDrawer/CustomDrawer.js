import React, { useState } from 'react';
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { useSelector } from 'react-redux';
import moment from 'moment';

import * as UserReducer from '../../redux/reducers/user';

import * as AuthActions from '../../redux/actions/auth';

import ShareCodeModal from '../modal/ShareCodeModal';

import * as S from './styles';
import * as ScaleUtils from '../../utils/scale';

function CustomDrawer(props) {
    const userData = useSelector(state => UserReducer.getUser(state));
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            {isModalOpen && (
                <ShareCodeModal
                    isVisible
                    onDismiss={() => setModalOpen(false)}
                />
            )}

            <DrawerContentScrollView {...props}>
                <S.UserProfileView>
                    <S.ProfileImageView>
                        {userData.profilePhoto ? (
                            <S.ProfileImage
                                source={{ uri: userData.profilePhoto.url }}
                            />
                        ) : (
                                <S.ProfileSvg
                                    height={ScaleUtils.ScreenHeight * 0.05}
                                    width={ScaleUtils.ScreenHeight * 0.05}
                                />
                            )}
                    </S.ProfileImageView>
                    <S.UserInfoView>
                        <S.UserName>
                            {userData.name}
                        </S.UserName>
                        <S.UserAge>
                            {`${moment().diff(moment(userData.birthday, 'DDMMYYYY'), 'years')} anos`}
                        </S.UserAge>
                    </S.UserInfoView>
                </S.UserProfileView>
                <DrawerItem
                    label="Editar Perfil"
                    labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#000' }}
                    onPress={() => props.navigation.navigate('EditProfile')}
                />
                <DrawerItem
                    label="Meus Contatos"
                    labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#000' }}
                    onPress={() => props.navigation.navigate('Contacts')}
                />
                <DrawerItem
                    label="Gerar Código"
                    labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#000' }}
                    onPress={() => setModalOpen(true)}
                />
                <DrawerItem
                    label="Configurações"
                    labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#000' }}
                    onPress={() => { }}
                />
                <DrawerItem
                    label="Logout"
                    labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#000' }}
                    onPress={async () => {
                        await AuthActions.logout();
                        BackgroundGeolocation.stop();
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Flow' }]
                        });
                    }}
                />
            </DrawerContentScrollView>
        </>
    );
}

export default CustomDrawer;