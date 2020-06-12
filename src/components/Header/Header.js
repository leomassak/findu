import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as S from './styles';
import DefaultBackIcon from '../../assets/svg/ic-back_button.svg';
import WhiteBackIcon from '../../assets/svg/ic-back_button_white.svg';

export default function Header({
    onPressListener,
    backgroundColor,
    addButton,
    onPressAddButton,
    color,
})
    {
    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={`${backgroundColor ? backgroundColor : '#FFF'}`}
            />
            <S.HeaderView>  
                <S.HeaderBackButtonContainer
                    onPress={onPressListener}
                >
                    {color ? (
                        <WhiteBackIcon />
                    ) : (
                        <DefaultBackIcon />
                    )}
                </S.HeaderBackButtonContainer>
                { addButton && (
                    <S.AddButtonContainer onPress={onPressAddButton}>
                        <Icon name="ios-add-circle-outline" color="#4442C0" size={45} />
                    </S.AddButtonContainer>
                ) }
            </S.HeaderView>
        </>
    )
}
