import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuthApi from '../../api/auth';

import * as S from './styles';
import * as LoadingSelector from '../../redux/reducers/loading';
import * as AuthActions from '../../redux/actions/auth';
import * as validator from '../../helpers/form-validator';
import Snackbar from '../../utils/Snackbar';

import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import PswRecoverModal from '../../components/modal/PswRecoverModal';
import DefaultButton from '../../components/button/DefaultButton';
import Loading from '../../components/Loading/Loading';

import Logo from '../../assets/svg/ic_logo.svg';

const PswRecover = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => LoadingSelector.getLoading(state));
    const [emailInput, setEmailInput] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const redefinePassword = () => {
        setIsModalOpen(!isModalOpen);
        props.navigation.navigate('RedefinePsw', { email: emailInput })
    }

    const onSendMail = async () => {
        const isFormValid = validator.validateRecoverPassword(emailInput);

        if (isFormValid.error) {
            Snackbar(isFormValid.errorMessage);
        }
        else {
            try {
                await dispatch(AuthActions.forgotPassword({ email: emailInput }));
                setIsModalOpen(true);
            } catch(err) {
                Snackbar(err.message);
            }
        }
        
    }


    return (
        <>
            {isLoading && <Loading />}
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
                    />
                </S.PageButtonView>
                

            </S.PageContainer>
        </>
    )
}

export default PswRecover;
