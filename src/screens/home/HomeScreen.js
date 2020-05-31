import React, { useRef, useState, useEffect } from 'react';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { Animated } from 'react-native';
import * as S from './styles';

export default function HomeScreen(props) {
    const [ drawerOpen, setDrawerOpened ] = useState(false);
    const rotationValue = useRef(new Animated.Value(0)).current;
    const spin = rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
      })

      useEffect(() => {
         const unsubscribe = props.navigation.addListener('drawerClose', () => {
             setDrawerOpened(false);
             Animated.timing(
                rotationValue,
              {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }
            ).start()
            });
            return unsubscribe;
      }, []);

      const rotateBurguer = () => {
        Animated.timing(
            rotationValue,
          {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }
        ).start()
      }
    return (
        <S.HomeContainer>
            <S.BurguerButton 
            onPress={() => {props.navigation.toggleDrawer(), rotateBurguer()}}>
                <Animated.View style={{
                    transform: [{ rotate: spin }]
                }}>
                    <S.BurguerIcon /> 
                </Animated.View>
            </S.BurguerButton>
        </S.HomeContainer>
    )
}
