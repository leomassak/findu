import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';

import * as S from './styles';
import DefaultButton from '../../../components/button/DefaultButton';
import Loading from '../../../components/Loading/Loading';

import LocationService from '../../../services/locations';

export default function LoginFlowScreen(props) {
    return (
        <>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                locations={[0.24, 0]}
                colors={["#FFF", "#4F80E1"]}
                style={{ flex: 1, width: "100%" }}
            >
                <S.LoginFlowContainerView>
                    <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
                    <S.LogoView>
                        <S.LogoSvg />
                    </S.LogoView>
                    <S.WelcomeView>
                        <S.WelcomeHeaderTitleText>
                            Seja Bem-Vindo
                        </S.WelcomeHeaderTitleText>
                        <S.WelcomeDescriptionText>
                            Este é seu novo aplicativo de localização pessoal
                        </S.WelcomeDescriptionText>
                        <S.ButtonAreaView>
                            <DefaultButton
                                text="Entrar"
                                onPressListener={() => props.navigation.navigate('Login')}
                                border="#FFF"
                                fontColor="#FFF"
                            />
                            <DefaultButton
                                text="Cadastre-se"
                                onPressListener={() => { }}
                                background="#FFF"
                                fontColor="#4F80E1"
                                onPressListener={() => props.navigation.navigate('Register')}
                            />
                        </S.ButtonAreaView>
                    </S.WelcomeView>
                </S.LoginFlowContainerView>
            </LinearGradient>
        </>
    )
}
