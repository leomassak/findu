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
    noStatusBar,
    headerText,
})
    {
    return (
        <>
            {!noStatusBar && 
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={`${backgroundColor ? backgroundColor : '#FFF'}`}
                />
            }
            <S.HeaderView background={color ? '#4F80E1' : '#FFF'} headerText={headerText}>  
                <S.HeaderBackButtonContainer
                    onPress={onPressListener}
                >
                        <S.RoundContainer color={ color ? "#FFF" : "#4F80E1"}>
                            <Icon name="md-arrow-back" color={ color ? "#FFF" : "#4F80E1"} size={35}/>
                        </S.RoundContainer>
                </S.HeaderBackButtonContainer>
                { !!headerText && <S.HeaderText> {headerText} </S.HeaderText> }
                { addButton && (
                    <S.AddButtonContainer onPress={onPressAddButton}>
                        <Icon name="ios-add-circle-outline" color={ color ? "#FFF" : "#4F80E1"} size={50} />
                    </S.AddButtonContainer>
                ) }
            </S.HeaderView>
        </>
    )
}
