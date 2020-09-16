import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import md5 from 'md5';
import { useSelector, useDispatch } from 'react-redux';
import * as S from './styles';

import * as LoadingSelector from '../../redux/reducers/loading';
import * as AuthActions from '../../redux/actions/auth';
import * as validator from '../../helpers/form-validator';
import Snackbar from '../../utils/Snackbar';

import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import CheckBox from '../../components/CheckBox/Checkbox';
import UnderlineButton from '../../components/button/UnderlineTextButton';
import DefaultButton from '../../components/button/DefaultButton';
import Loading from '../../components/Loading/Loading';
import LocationImage from '../../assets/images/location.png';
import BackIcon from 'react-native-vector-icons/EvilIcons'

import Logo from '../../assets/svg/ic_logo.svg';

const LoginScreen = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => LoadingSelector.getLoading(state));
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordEyeStatus, setPasswordEyeStatus] = useState(true);
    const [checkBoxStatus, setCheckBoxStatus] = useState(false);

    const onAuthLogin = async () => {
        const isFormValid = validator.validateLoginForm(emailInput, passwordInput);

        if (isFormValid.error) {
            Snackbar(isFormValid.errorMessage);
        }
        else {
            const loginData = {
                email: emailInput,
                password: md5(passwordInput),
            }
            try {
                await dispatch(AuthActions.authenticate(loginData));
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeNavigator' }]
                });
            } catch (err) {
                Snackbar(err.message);
            }
        }

    }

    return (
        <>
            <StatusBar 
               barStyle="light-content"
               backgroundColor="#4F80E1" 
            />
            {isLoading && <Loading />}
            <S.PageContainer>
            <S.MapImageView>
                <S.HeaderBackButtonContainer
                    onPress={() => props.navigation.goBack()}
                >
                    <BackIcon name="arrow-left" color="#FFF" size={60}/>
                </S.HeaderBackButtonContainer> 
                    <S.MapImage source={LocationImage} />
                    <S.HeaderTitleText>
                        FindU
                    </S.HeaderTitleText>
                </S.MapImageView>
                <S.RegisterContentView>
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
                />
                </S.RegisterContentView>
            </S.PageContainer>
        </>
    )
}

export default LoginScreen;
