import React, { Component, useState } from 'react';

import * as S from './styles';

import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import PswRecoverModal from '../../components/modal/PswRecoverModal';
import DefaultButton from '../../components/button/DefaultButton';

import Logo from '../../assets/svg/ic_logo.svg';

const PswRecover = (props) => {
    const [emailInput, setEmailInput] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const redefinePassword = () => {
        setIsModalOpen(!isModalOpen);
        props.navigation.navigate('RedefinePsw')
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
                        onPressListener={() => setIsModalOpen(!isModalOpen)}
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
