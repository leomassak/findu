import React, { useRef, useState, useEffect } from 'react';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { Animated } from 'react-native';
import * as S from './styles';

export default function HomeScreen(props) {
    const drawerOpened = useIsDrawerOpen();
    const rotationValue = useRef(new Animated.Value(0)).current;
    const spin = rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
      })

      useEffect(() => {
        Animated.timing(
        rotationValue,
        {
        toValue: drawerOpened ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
        }
        ).start();
      }, [drawerOpened]);

    return (
        <S.HomeContainer>
            <S.BurguerButton 
            onPress={() => {props.navigation.toggleDrawer()}}>
                <Animated.View style={{
                    transform: [{ rotate: spin }]
                }}>
                    <S.BurguerIcon /> 
                </Animated.View>
            </S.BurguerButton>
        </S.HomeContainer>
    )
}
