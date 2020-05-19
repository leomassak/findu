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
                </S.LogoView>
                <S.WelcomeView>
                    <S.WelcomeHeaderTitleText>
                        Seja Bem-Vindo
                    </S.WelcomeHeaderTitleText>
                    <S.ButtonAreaView>
                        <DefaultButton
                            text="Entrar"
                            onPressListener={() => this.props.navigation.navigate('Login')}
                        />
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
