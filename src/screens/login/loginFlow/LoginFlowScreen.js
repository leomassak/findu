import React, { Component } from 'react';

import * as S from './styles';
import DefaultButton from '../../../components/button/DefaultButton';

export default class LoginFlowScreen extends Component {
    render() {
        return (
            <S.LoginFlowContainerView>
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
                        Lorem ipsum dolor sit amet, consectetur adipicing elit. Ac tellus quis vulputate erat. Dolor sogittis faucibus montes
                    </S.WelcomeDescriptionText>
                    <S.ButtonAreaView>
                        <DefaultButton text="Entrar" onPressListener={() => {}} />
                        <DefaultButton text="Cadastre-se" onPressListener={() => {}}/>
                    </S.ButtonAreaView>
                </S.WelcomeView>
            </S.LoginFlowContainerView>
        )
    }
}
