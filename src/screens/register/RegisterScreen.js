import React, { useState } from 'react';
import md5 from 'md5';
import { useSelector, useDispatch } from 'react-redux';
import { MaskService } from 'react-native-masked-text';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import * as S from './styles';
import * as ScaleUtils from '../../utils/scale';
import * as LoadingSelector from '../../redux/reducers/loading';
import * as UserAction from '../../redux/actions/user';
import * as validator from '../../helpers/form-validator';

import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import CheckBox from '../../components/CheckBox/Checkbox';
import DefaultButton from '../../components/button/DefaultButton';
import Loading from '../../components/Loading/Loading';
import Snackbar from '../../utils/Snackbar';
import SucessModal from '../../components/modal/SucessModal';

import { pickerOptions } from '../../configs/imagePickerOptions';

import Logo from '../../assets/svg/ic_logo.svg';
import AddIcon from '../../assets/svg/ic_icon-add.svg';

const RegisterScreen = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => LoadingSelector.getLoading(state));
    const [formData, setFormdata] = useState({
        name: "Giovani Pinke",
        birthday: "09021999",
        email: "giovani.pinke@mblabs.com.br",
        phone: "5519993107322",
        password: "123456",
        confirmPassword: "123456",
    });
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [termsBoxStatus, setTermsBoxStatus] = useState(false);
    const [locationBoxStatus, setLocationBoxStatus] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onFormDataChange = (value, field) => {
        setFormdata({
            ...formData,
            [field]: value,
        })
    }

    const onSelectProfileImage = () => {
        Alert.alert(
            "Foto de Perfil",
            "Escolha uma foto para seu perfil",
            [
                {
                    text: "Tirar Foto",
                    onPress: () => {
                        ImagePicker.launchCamera(pickerOptions, (response) => {
                            handlePickerSelect(response);
                        });
                    },
                },
                {
                    text: "Selecionar da Galeria",
                    onPress: () => {
                        ImagePicker.launchImageLibrary(pickerOptions, (response) => {
                            handlePickerSelect(response);
                        });
                    },
                },
            ],
            { cancelable: true },
        );
    }

    const handlePickerSelect = (response) => {
        if (response.error) {
            Snackbar('Não foi possível carregar a foto');
        } else if (!response.didCancel) {
            setPhoto({
                uri: response.uri,
                base64: response.data,
            })
        }
    }

    const onRegister = async () => {
        try {
            const { name, birthday, email, password, confirmPassword, phone } = formData;
            const isFormValid = validator.validateRegisterForm(name, birthday, phone, email, password, confirmPassword, termsBoxStatus, locationBoxStatus);

            if (isFormValid.error) {
                Snackbar(isFormValid.errorMessage);
            } else {
                const registerData = {
                    name,
                    email,
                    birthday,
                    phone,
                    password: md5(password),
                    photo: photo ? photo.base64 : undefined,
                }
                await dispatch(UserAction.register(registerData));
                setIsModalOpen(true);
            }
        } catch (err) {
            console.log(err)
            Snackbar(err.message);
        }
    }

    const onPressModal = () => {
        setIsModalOpen(false);
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'HomeNavigator' }]
        });
    }

    return (
        <>
            {isLoading && <Loading />}
            <SucessModal
                isVisible={isModalOpen}
                onDismiss={() => onPressModal()}
                onPress={() => onPressModal()}
                text="Cadastro realizado com sucesso!"
            />
            <S.PageContainer
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <Header
                    onPressListener={() => props.navigation.goBack()}
                />
                <S.PageTitleContainer>
                    <Logo />
                    <S.PageTitleText>
                        Faça seu cadastro
                    </S.PageTitleText>
                </S.PageTitleContainer>
                <S.ProfilePicView>
                    <S.ProfilePicAddTouchableOpacity
                        onPress={onSelectProfileImage}
                    >
                        <AddIcon />
                    </S.ProfilePicAddTouchableOpacity>
                    <S.ProfilePicImageView>
                        {photo ? (
                            <S.ProfilePicImage
                                source={{ uri: photo.uri }}
                            />
                        ) : (
                                <S.ProfileSvg
                                    height={ScaleUtils.ScreenHeight * 0.09}
                                    width={ScaleUtils.ScreenHeight * 0.09}
                                />
                            )}
                    </S.ProfilePicImageView>
                </S.ProfilePicView>
                <S.InputContainer>
                    <Input
                        title="Nome"
                        value={formData.name}
                        keyboardType="default"
                        secureTextEntry={false}
                        onChangeValue={(text) => onFormDataChange(text, 'name')}
                    />
                </S.InputContainer>

                <S.InputContainer>
                    <S.MaskedInput
                        maskType="datetime"
                        maskOptions={{
                            format: 'DD/MM/YYYY',
                        }}
                        title="Data de Nascimento"
                        value={formData.birthday}
                        keyboardType="phone-pad"
                        secureTextEntry={false}
                        onChangeValue={(text) => onFormDataChange(text, 'birthday')}
                    />
                </S.InputContainer>

                <S.InputContainer>
                    <S.MaskedInput
                        title="Telefone"
                        maskType="cel-phone"
                        maskOptions={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '+99 99',
                        }}
                        keyboardType="phone-pad"
                        value={formData.phone}
                        onChangeValue={
                            (text) => onFormDataChange(MaskService.toRawValue('cel-phone', text), 'phone')
                        }
                    />
                </S.InputContainer>

                <S.InputContainer>
                    <Input
                        title="E-Mail"
                        value={formData.email}
                        keyboardType="email-address"
                        secureTextEntry={false}
                        onChangeValue={(text) => onFormDataChange(text, 'email')}
                    />
                </S.InputContainer>

                <S.InputContainer>
                    <Input
                        title="Senha"
                        value={formData.password}
                        onChangeValue={(text) => onFormDataChange(text, 'password')}
                        secureTextEntry={hidePassword}
                        onEyePress={() => setHidePassword(!hidePassword)}
                        eyeOpen={hidePassword}
                    />
                </S.InputContainer>

                <S.InputContainer>
                    <Input
                        title="Confirmar Senha"
                        value={formData.confirmPassword}
                        onChangeValue={(text) => onFormDataChange(text, 'confirmPassword')}
                        secureTextEntry={hideConfirmPassword}
                        onEyePress={() => setHideConfirmPassword(!hideConfirmPassword)}
                        eyeOpen={hideConfirmPassword}
                    />
                </S.InputContainer>


                <S.CheckBoxContainerView>
                    <CheckBox
                        title="Você declara que leu e concorda com os termos de uso e política de privacidade da plataforma"
                        onChangeValue={() => setTermsBoxStatus(!termsBoxStatus)}
                        value={termsBoxStatus}
                        rounded
                    />

                    <CheckBox
                        title="Aceito compartilhar minha localização em tempo real com a plataforma"
                        onChangeValue={() => setLocationBoxStatus(!locationBoxStatus)}
                        value={locationBoxStatus}
                        rounded
                    />
                </S.CheckBoxContainerView>
                <DefaultButton
                    text="Entrar"
                    onPressListener={() => onRegister()}
                    fontColor="#FFF"
                    background="#4F80E1"
                />
            </S.PageContainer>
        </>
    )
}

export default RegisterScreen;
