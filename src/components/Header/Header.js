import React from 'react';
import { StatusBar } from 'react-native';

import * as S from './styles';
import BackIcon from '../../assets/svg/ic-back_button.svg';

export default function Header({
    onPressListener,
    backgroundColor,
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
                    <BackIcon />
                </S.HeaderBackButtonContainer>
            </S.HeaderView>
        </>
    )
}
