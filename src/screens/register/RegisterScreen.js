import React, { useState } from 'react';

import * as S from './styles';

import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import CheckBox from '../../components/CheckBox/Checkbox';
import DefaultButton from '../../components/button/DefaultButton';

import Logo from '../../assets/svg/ic_logo.svg';

const RegisterScreen = (props) => {
    const [formData, setFormdata] = useState({
        name:"",
        cpf:"",
        phone:"",
        email:"",
        confirmEmail:"",
        password:"",
        confirmPassword:"",
        agree:false,
    });
    const [passwordEyeStatus, setPasswordEyeStatus] = useState(true);
    const [checkBoxStatus, setCheckBoxStatus] = useState(false);

    const onFormDataChange = (value, field) => {
        setFormdata({
          ...formData,
          [field]: value,
        })
      }

    return (
        <S.PageContainer>
            <Header
                onPressListener={() => props.navigation.goBack()}
            />
            <S.PageTitleContainer>
                <Logo />
                <S.PageTitleText>
                    Faça seu cadastro
                </S.PageTitleText>
            </S.PageTitleContainer>

            <S.InputContainer>
                <Input
                    title="Nome"    
                    value={formData.name}
                    keyboardType="default"
                    secureTextEntry={false}
                    onChangeValue={(e) => onFormDataChange(e.target.value, 'name')}
                />
            </S.InputContainer>
            
            <S.InputContainer>
                <Input
                    title="Senha"
                    value={passwordInput}
                    onChangeValue={(text) => setPasswordInput(text)}
                    secureTextEntry={true}
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
                    onPressListener={() => console.log('Redirecionar para esqueci minha senha')}
                />
            </S.UnderlineButtonContainer>

            <DefaultButton
                text="Entrar"
                onPressListener={() => console.log('Redirecionar para Home')}
                fontColor="#FFF"
                background="#4F80E1"
                border="#4F80E1"
            />

        </S.PageContainer>
    )
}

export default RegisterScreen;
