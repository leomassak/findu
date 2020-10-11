import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Animated } from 'react-native';
import analytics from '@react-native-firebase/analytics';
// import crashlytics from '@react-native-firebase/crashlytics';

import * as S from './styles';
import { requestFirebaseMessagingPermission } from '../../utils/permissions';

// import AppStorage from '../../services/storage';
import * as ScaleUtils from '../../utils/scale';
import * as AuthActions from '../../redux/actions/auth';
import TopWave1 from '../../assets/images/topWave1.png';
import TopWave2 from '../../assets/images/topWave2.png';
import BottomWave1 from '../../assets/images/bottomWave1.png';
import BottomWave2 from '../../assets/images/bottomWave2.png';

function Splash ({navigation}) {

    const dispatch = useDispatch();
    const opacityValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        loadFirebase();
        Animated.timing(
            opacityValue,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }
        ).start();
        setTimeout(() => initialScreen(), 1000);

    }, []);

    const loadFirebase = async () => {
        await requestFirebaseMessagingPermission();

        await analytics().setAnalyticsCollectionEnabled(true);

        // await crashlytics().setCrashlyticsCollectionEnabled(true);
    }

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
                flex: 1,
            }}>
                <S.TopWaveImage source={TopWave1} />
                <S.TopWaveImage source={TopWave2} />
                <S.LogoSvg
                    width={ScaleUtils.ScreenWidth * 0.7}
                    height={ScaleUtils.ScreenWidth * 0.7}
                />
                <S.BottomWaveImage source={BottomWave1} />
                <S.BottomWaveImage source={BottomWave2} />
            </Animated.View>
      </S.SplashContainer>
  );
}

export default Splash;