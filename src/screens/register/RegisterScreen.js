import React, { useRef, useState } from 'react';
import { StatusBar } from 'react-native';
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

import Input from '../../components/Input/Input';
import CheckBox from '../../components/CheckBox/Checkbox';
import DefaultButton from '../../components/button/DefaultButton';
import Loading from '../../components/Loading/Loading';
import Snackbar from '../../utils/Snackbar';
import SucessModal from '../../components/modal/SucessModal';
import TransparentWave from '../../assets/images/transparentWave.png';
import BackIcon from 'react-native-vector-icons/EvilIcons'

import { pickerOptions } from '../../configs/imagePickerOptions';

import AddIcon from '../../assets/svg/ic_icon-add.svg';

const RegisterScreen = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => LoadingSelector.getLoading(state));
    const [formData, setFormdata] = useState({
        name: "",
        birthday: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [termsBoxStatus, setTermsBoxStatus] = useState(false);
    const [locationBoxStatus, setLocationBoxStatus] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const nameRef = useRef();
    const birthdayRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef(); 

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
            <StatusBar 
               barStyle="light-content"
               backgroundColor="#4F80E1" 
            />
            {isLoading && <Loading />}
            <SucessModal
                isVisible={isModalOpen}
                onDismiss={() => onPressModal()}
                onPress={() => onPressModal()}
                text="Cadastro realizado com sucesso!"
            />
            <S.PageContainer>
                <S.MapImageView>
                <S.HeaderBackButtonContainer
                    onPress={() => props.navigation.goBack()}
                >
                    <BackIcon name="arrow-left" color="#000" size={60}/>
                </S.HeaderBackButtonContainer> 
                    <S.MapImage source={TransparentWave} />
                    <S.IconLogo width={105} height={105} />
                </S.MapImageView>
                <S.RegisterContentView>
                <S.HeaderName>Faça seu cadastro</S.HeaderName>
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
                                    height={ScaleUtils.ScreenHeight * 0.05}
                                    width={ScaleUtils.ScreenHeight * 0.05}
                                />
                            )}
                    </S.ProfilePicImageView>
                </S.ProfilePicView>
                <S.InputContainer>
                    <Input
                        setRef={nameRef}
                        title="Nome"
                        value={formData.name}
                        keyboardType="default"
                        secureTextEntry={false}
                        onChangeValue={(text) => onFormDataChange(text, 'name')}
                        onSubmit={() => birthdayRef.current._inputElement.focus()}
                    />
                </S.InputContainer>

                <S.InputContainer>
                    <S.MaskedInput
                        setRef={birthdayRef}
                        maskType="datetime"
                        maskOptions={{
                            format: 'DD/MM/YYYY',
                        }}
                        title="Data de Nascimento"
                        value={formData.birthday}
                        keyboardType="phone-pad"
                        secureTextEntry={false}
                        onChangeValue={(text) => onFormDataChange(text, 'birthday')}
                        onSubmit={() => phoneRef.current._inputElement.focus()}
                    />
                </S.InputContainer>

                <S.InputContainer>
                    <S.MaskedInput
                        setRef={phoneRef}
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
                        onSubmit={() => emailRef.current.focus()}
                    />
                </S.InputContainer>

                <S.InputContainer>
                    <Input
                        setRef={emailRef}
                        title="E-Mail"
                        value={formData.email}
                        keyboardType="email-address"
                        secureTextEntry={false}
                        onChangeValue={(text) => onFormDataChange(text, 'email')}
                        onSubmit={() => passwordRef.current.focus()}
                    />
                </S.InputContainer>

                <S.InputContainer>
                    <Input
                        setRef={passwordRef}
                        title="Senha"
                        value={formData.password}
                        onChangeValue={(text) => onFormDataChange(text, 'password')}
                        secureTextEntry={hidePassword}
                        onEyePress={() => setHidePassword(!hidePassword)}
                        eyeOpen={hidePassword}
                        onSubmit={() => confirmPasswordRef.current.focus()}
                    />
                </S.InputContainer>

                <S.InputContainer>
                    <Input
                        setRef={confirmPasswordRef}
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
                </S.RegisterContentView>
            </S.PageContainer>
        </>
    )
}

export default RegisterScreen;
