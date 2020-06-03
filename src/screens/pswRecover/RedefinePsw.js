import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as S from './styles';

import * as LoadingSelector from '../../redux/reducers/loading';
import * as AuthActions from '../../redux/actions/auth';
import * as validator from '../../helpers/form-validator';
import Snackbar from '../../utils/Snackbar';

import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import PswRedefineModal from '../../components/modal/SucessModal';
import DefaultButton from '../../components/button/DefaultButton';
import Loading from '../../components/Loading/Loading';

import Logo from '../../assets/svg/ic_logo.svg';

const PswRecover = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => LoadingSelector.getLoading(state));
    const [tokenInput, setTokenInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('')
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [passwordEyeStatus1, setPasswordEyeStatus1] = useState(true);
    const [passwordEyeStatus2, setPasswordEyeStatus2] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const email = props.route.params.email;

    const onRedefinePassword = async () => {
        const isFormValid = validator.validateRedefinePassword(tokenInput, passwordInput, confirmPasswordInput);

        if (isFormValid.error) {
            Snackbar(isFormValid.errorMessage);
        }
        else {
            try {
                await dispatch(AuthActions.redefinePassword(email, tokenInput, passwordInput));
                setIsModalOpen(true);
            } catch(err) {
                Snackbar(err.message);
            }
        }
    }

    onPressModal = () => {
        setIsModalOpen(true);
        props.navigation.navigate('Login');
    }

    return (
        <>
            {isLoading && <Loading />}
            <PswRedefineModal
                isVisible={isModalOpen}
                onDismiss={() => onPressModal()}
                onPress={() => onPressModal()}
                text="Sua senha foi redefinida com sucesso!"
            />
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
                        value={tokenInput}
                        onChangeValue={(text) => setTokenInput(text)}
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
                        onPressListener={onRedefinePassword}
                        fontColor="#FFF"
                        background="#4F80E1"
                    />
                </S.PageButtonView>
                
            </S.PageContainer>
        </>
    )
}

export default PswRecover;
