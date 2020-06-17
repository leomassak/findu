import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BackIcon from 'react-native-vector-icons/EvilIcons'
import * as S from './styles';

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
                    <BackIcon name="arrow-left" color={ color ? "#FFF" : "#4F80E1"} size={60}/>
                </S.HeaderBackButtonContainer>
                { !!headerText && <S.HeaderText> {headerText} </S.HeaderText> }
                { addButton && (
                    <S.AddButtonContainer onPress={onPressAddButton}>
                        <Icon name="ios-add-circle-outline" color={ color ? "#FFF" : "#4F80E1"} size={45} />
                    </S.AddButtonContainer>
                ) }
            </S.HeaderView>
        </>
    )
}
