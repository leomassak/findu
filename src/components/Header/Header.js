import React from 'react';
import { StatusBar } from 'react-native';

import * as S from './styles';
import DefaultBackIcon from '../../assets/svg/ic-back_button.svg';
import WhiteBackIcon from '../../assets/svg/ic-back_button_white.svg';

export default function Header({
    onPressListener,
    backgroundColor,
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
            </S.HeaderView>
        </>
    )
}
