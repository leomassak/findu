import React, { useEffect } from 'react';
import * as S from './styles';
import AppStorage from '../../services/storage';
import * as ScaleUtils from '../../utils/scale';

function Splash ({navigation}) {
    useEffect(() => {
        setTimeout(() => initialScreen(), 2000);
    }, []);

    const initialScreen = async () => {
        const isAuthenticated = await AppStorage.isAuthenticated();
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
          <S.LogoSvg
            width={ScaleUtils.ScreenWidth * 0.7}
            height={ScaleUtils.ScreenWidth * 0.7}
          />
      </S.SplashContainer>
  );
}

export default Splash;