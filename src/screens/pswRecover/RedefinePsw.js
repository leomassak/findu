import React, { Component, useState } from 'react';

import * as S from './styles';

import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import DefaultButton from '../../components/button/DefaultButton';

import Logo from '../../assets/svg/ic_logo.svg';

const PswRecover = (props) => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('')
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [passwordEyeStatus1, setPasswordEyeStatus1] = useState(true);
    const [passwordEyeStatus2, setPasswordEyeStatus2] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <S.PageContainer>
            <Header
                onPressListener={() => props.navigation.goBack()}
            />
            <S.PageTitleContainer>
                <Logo />
                <S.PageTitleText>
                    Definir nova senha
                </S.PageTitleText>
            </S.PageTitleContainer>

            <S.InputContainer>
                <Input
                    title="Código de segurança"
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
                    secureTextEntry={passwordEyeStatus1}
                    onEyePress={() => setPasswordEyeStatus1(!passwordEyeStatus1)}
                    eyeOpen={passwordEyeStatus1}
                />
            </S.InputContainer>

            <S.InputContainer>
                <Input
                    title="Confirmar senha"
                    value={confirmPasswordInput}
                    onChangeValue={(text) => setConfirmPasswordInput(text)}
                    secureTextEntry={passwordEyeStatus2}
                    onEyePress={() => setPasswordEyeStatus2(!passwordEyeStatus2)}
                    eyeOpen={passwordEyeStatus2}
                />
            </S.InputContainer>
            
            <S.PageButtonView>
                <DefaultButton
                    text="Redefinir senha"
                    onPressListener={() => setIsModalOpen(!isModalOpen)}
                    fontColor="#FFF"
                    background="#4F80E1"
                    border="#4F80E1"
                />
            </S.PageButtonView>
            

        </S.PageContainer>
    )
}

export default PswRecover;
