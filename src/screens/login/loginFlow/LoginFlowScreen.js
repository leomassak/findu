import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 

import * as S from './styles';
import DefaultButton from '../../../components/button/DefaultButton';

export default class LoginFlowScreen extends Component {
    render() {
        return (
        <LinearGradient 
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 2}} 
        locations={[0.24, 0]}
        colors={["#FFF", "#4F80E1"]} 
        style={{ flex: 1, width: "100%" }}
        >
            <S.LoginFlowContainerView>
                <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
                    <S.LogoView>
                        <S.LogoSvg/>
                    </S.LogoView>
                <S.WelcomeView>
                    <S.WelcomeHeaderTitleText>
                        Seja Bem-Vindo
                    </S.WelcomeHeaderTitleText>
                    <S.WelcomeDescriptionText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac tellus quis vulputate erat. Dolor sagittis faucibus montes.
                    </S.WelcomeDescriptionText>
                <S.ButtonAreaView>
                <DefaultButton
                text="Entrar"
                onPressListener={() => this.props.navigation.navigate('Login')}
                border="#FFF"
                fontColor="#FFF"
                />
                <DefaultButton 
                text="Cadastre-se" 
                onPressListener={() => {}} 
                background="#FFF" 
                border="#FFF" 
                fontColor="#4F80E1" 
                onPressListener={() => this.props.navigation.navigate('Register')}
                />
                </S.ButtonAreaView>
                </S.WelcomeView>
            </S.LoginFlowContainerView>
        </LinearGradient>
        )
    }
}
