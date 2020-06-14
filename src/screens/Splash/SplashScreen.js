import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Animated } from 'react-native';
import * as S from './styles';
import AppStorage from '../../services/storage';
import * as ScaleUtils from '../../utils/scale';
import * as AuthActions from '../../redux/actions/auth';

function Splash ({navigation}) {

    const dispatch = useDispatch();
    const opacityValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            opacityValue,
            {
                toValue:1,
                duration: 500,
                useNativeDriver: true,
            }
        ).start();
        setTimeout(() => initialScreen(), 1000);
    }, []);

    const initialScreen = async () => {
        const isAuthenticated = await dispatch(AuthActions.verifyInitiaFlow());
        if(isAuthenticated) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeNavigator' }]
            });
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Flow' }]
            });
        }
    }

  return (
      <S.SplashContainer>
           <Animated.View 
           style={{
                opacity: opacityValue,
            }}>
                <S.LogoSvg
                    width={ScaleUtils.ScreenWidth * 0.7}
                    height={ScaleUtils.ScreenWidth * 0.7}
                />
            </Animated.View>
      </S.SplashContainer>
  );
}

export default Splash;