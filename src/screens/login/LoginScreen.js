import React, { Component, useState } from 'react';
import { Alert } from 'react-native';
import * as S from './styles';
import AuthApi from '../../api/auth';
import AppStorage from '../../services/storage';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import CheckBox from '../../components/CheckBox/Checkbox';
import UnderlineButton from '../../components/button/UnderlineTextButton';
import DefaultButton from '../../components/button/DefaultButton';

import Logo from '../../assets/svg/ic_logo.svg';

const LoginScreen = (props) => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordEyeStatus, setPasswordEyeStatus] = useState(true);
    const [checkBoxStatus, setCheckBoxStatus] = useState(false);

    onAuthLogin = async () => {
        const loginData = {
            email: emailInput,
            password: passwordInput,
        }

        try {
            const response = await AuthApi.userLogin(loginData); 
            AppStorage.createUserAuthData(response.token);
            const res = await AppStorage.isAuthenticated();
            console.log('islogged', res);
        } catch(err) {
            console.log(err);
            Alert.alert('Erro', 'Não foi possível realizar o login');
        }
    }

    return (
        <S.PageContainer>
            <Header
                onPressListener={() => props.navigation.goBack()}
            />
            <S.PageTitleContainer>
                <Logo />
                <S.PageTitleText>
                    Faça seu login
                </S.PageTitleText>
            </S.PageTitleContainer>

            <S.InputContainer>
                <Input
                    title="E-mail"
                    value={emailInput}
                    onChangeValue={(text) => setEmailInput(text)}
                    keyboardType="email-address"
                    secureTextEntry={false}
                />
            </S.InputContainer>
            
            <S.InputContainer>
                <Input
                    title="Senha"
                    value={passwordInput}
                    onChangeValue={(text) => setPasswordInput(text)}
                    secureTextEntry={passwordEyeStatus}
                    onEyePress={() => setPasswordEyeStatus(!passwordEyeStatus)}
                    eyeOpen={passwordEyeStatus}
                />
            </S.InputContainer>

            <CheckBox
                title="Lembrar de mim"
                onChangeValue={() => setCheckBoxStatus(!checkBoxStatus)}
                value={checkBoxStatus}
            />
            
            <S.UnderlineButtonContainer>
                <UnderlineButton
                    text="Esqueceu sua senha?"
                    onPressListener={() => props.navigation.navigate('PswRecover')}
                />
            </S.UnderlineButtonContainer>

            <DefaultButton
                text="Entrar"
                onPressListener={onAuthLogin}
                fontColor="#FFF"
                background="#4F80E1"
                border="#4F80E1"
            />

        </S.PageContainer>
    )
}

export default LoginScreen;
