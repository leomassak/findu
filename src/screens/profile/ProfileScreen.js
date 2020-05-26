import React, { Component, useState } from 'react'

import * as S from './styles';
import Header from '../../components/Header/Header';
import DefaultButton from '../../components/button/DefaultButton';
import ProfileImage from '../../assets/images/profile-mock.png';

export default function ProfileScreen({ props }) {
    return (
        <S.ProfileContainerView>
            <S.UserProfileView>
            <S.ProfileImageView>
                <S.ProfileImage source={ProfileImage} />
            </S.ProfileImageView>
            <S.UserName>Leonardo Massak</S.UserName>
            </S.UserProfileView>
            <S.InputContainer>
                <S.InputLabel>Telefone</S.InputLabel>
                <S.ProfileInfoText> (11)94230-4893 </S.ProfileInfoText>
                <S.InputLabel> Grupos</S.InputLabel>
                <S.ProfileInfoText> - Amigos </S.ProfileInfoText>
            </S.InputContainer>
            <S.ButtonsContainer> 
                <DefaultButton 
                text="Adicionar a um grupo"
                onPressListener={() => {}}
                border="#FFF"
                fontColor="#FFF"
                background="transparent"
                />
                <DefaultButton 
                text="Remover contato" 
                onPressListener={() => {}}
                border="#FFF"
                fontColor="#FFF"
                background="transparent"
                />
            </S.ButtonsContainer>
        </S.ProfileContainerView>
    );
}
