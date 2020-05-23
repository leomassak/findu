import React, { Component, useState } from 'react';
import AuthApi from '../../api/auth';

import * as S from './styles';

import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import PswRecoverModal from '../../components/modal/PswRecoverModal';
import DefaultButton from '../../components/button/DefaultButton';

import Logo from '../../assets/svg/ic_logo.svg';
import { Alert } from 'react-native';

const PswRecover = (props) => {
    const [emailInput, setEmailInput] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const redefinePassword = () => {
        setIsModalOpen(!isModalOpen);
        props.navigation.navigate('RedefinePsw')
    }

    const onSendMail = async () => {
        try {
            await AuthApi.forgotPassword(emailInput);
            setIsModalOpen(true);
        } catch(err) {
            console.log(err.response);
            Alert.alert('Erro', 'Não foi possível enviar o código de recuperação');
        }
    }


    return (
        <>
            <PswRecoverModal
                isVisible={isModalOpen}
                onDismiss={redefinePassword}
                onPress={redefinePassword}
            />
            <S.PageContainer>
                <Header
                    onPressListener={() => props.navigation.goBack()}
                />
                <S.PageTitleContainer>
                    <Logo />
                    <S.PageTitleText>
                        Recuperação de senha
                    </S.PageTitleText>
                </S.PageTitleContainer>

                <S.PageTitleDescription>
                    Escreva um e-mail para receber o código de recuperação da senha.
                </S.PageTitleDescription>

                <S.InputContainer>
                    <Input
                        title="E-mail"
                        value={emailInput}
                        onChangeValue={(text) => setEmailInput(text)}
                        keyboardType="email-address"
                        secureTextEntry={false}
                    />
                </S.InputContainer>
                
                <S.PageButtonView>
                    <DefaultButton
                        text="Enviar e-mail"
                        onPressListener={onSendMail}
                        fontColor="#FFF"
                        background="#4F80E1"
                        border="#4F80E1"
                    />
                </S.PageButtonView>
                

            </S.PageContainer>
        </>
    )
}

export default PswRecover;
