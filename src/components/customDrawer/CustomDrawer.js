import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItem,
  } from '@react-navigation/drawer';

  import ProfileImage from '../../assets/images/profile-mock.png';
  
  import * as S from './styles';
  
  function CustomDrawer(props) {
    return (
      <DrawerContentScrollView {...props}>
        <S.UserProfileView>
            <S.ProfileImageView>
                <S.ProfileImage source={ProfileImage} />
            </S.ProfileImageView>
            <S.UserInfoView>
                <S.UserName>Leonardo Massak</S.UserName>
                <S.UserAge>21 Anos</S.UserAge>
            </S.UserInfoView>
        </S.UserProfileView>
        <DrawerItem 
            label="Editar Perfil"
            labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#000' }}
            onPress={() => props.navigation.navigate('Profile')}
        />
        <DrawerItem 
            label="Meus Contatos"
            labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#000' }}
            onPress={() => props.navigation.navigate('Profile')}
        />
        <DrawerItem 
            label="Compartilhar conta"
            labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#000' }}
            onPress={() => {}}
        />
        <DrawerItem 
            label="Configurações"
            labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#000' }}
            onPress={() => props.navigation.navigate('Profile')}
        />
        <DrawerItem 
            label="Logout"
            labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#000' }}
            onPress={() => {}}
        />
      </DrawerContentScrollView>
    );
  }

  export default CustomDrawer;