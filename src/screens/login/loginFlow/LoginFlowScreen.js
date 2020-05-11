import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import * as S from './styles';
import DefaultButton from '../../../components/button/DefaultButton';

export default class LoginFlowScreen extends Component {
    render() {
        return (
            <S.LoginFlowContainerView>
                <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
                <S.LogoView>
                <S.LogoSvg/>
                <S.AppNameText>
                    Find<S.CustomLetterText>U</S.CustomLetterText>
                </S.AppNameText>
                </S.LogoView>
                <S.WelcomeView>
                    <S.WelcomeHeaderTitleText>
                        Seja Bem-Vindo
                    </S.WelcomeHeaderTitleText>
                    <S.WelcomeDescriptionText>
                        Lorem ipsum dolor sit amet, consectetur adipicing elit. Ac tellus quis vulputate erat. Dolor sogittis faucibus montes dfihsi9dof siodfj osdfjiojio odiasjiodaios do aios djoasd jasiod ioasdoasda siodj aosdoasiodoasdaosdjioas d aiosj doaisjd o
                    </S.WelcomeDescriptionText>
                    <S.ButtonAreaView>
                        <DefaultButton text="Entrar" onPressListener={() => {}} />
                        <DefaultButton 
                        text="Cadastre-se" 
                        onPressListener={() => {}} 
                        background="transparent" 
                        border="#4F80E1" 
                        fontColor="#4F80E1" 
                        />
                    </S.ButtonAreaView>
                </S.WelcomeView>
            </S.LoginFlowContainerView>
        )
    }
}
