import React, { useState } from 'react';
import { Alert } from 'react-native'; 
import ImagePicker from 'react-native-image-picker';

import * as S from './styles';
import * as ScaleUtils from '../../utils/scale';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import CheckBox from '../../components/CheckBox/Checkbox';
import DefaultButton from '../../components/button/DefaultButton';

import { pickerOptions } from '../../configs/imagePickerOptions';

import Logo from '../../assets/svg/ic_logo.svg';

const RegisterScreen = (props) => {
    const [formData, setFormdata] = useState({
        name:"",
        phone:"",
        email:"",
        password:"",
        confirmPassword:"",
        agree:false,
    });
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [termsBoxStatus, setTermsBoxStatus] = useState(false);
    const [locationBoxStatus, setLocationBoxStatus] = useState(false);
    const [photo, setPhoto] = useState(null);

    const onFormDataChange = (value, field) => {
        setFormdata({
          ...formData,
          [field]: value,
        })
      }

    const onSelecrProfileImage = () => {
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
          Alert.alert("Erro", "Não foi possível carregar a foto");
        } else if (response.didCancel) {
          setPhoto(null)
        } else {
            setPhoto({
                uri: response.uri,
                base64: `data:image/jpeg;base64,${response.data}`,
            })
        }
      }

    return (
        <S.PageContainer contentContainerStyle={{ paddingBottom: 35 }}>
            <Header
                onPressListener={() => props.navigation.goBack()}
            />
            <S.PageTitleContainer>
                <Logo />
                <S.PageTitleText>
                    Faça seu cadastro
                </S.PageTitleText>
            </S.PageTitleContainer>
            <S.ProfilePicTouchableOpacity onPress={onSelecrProfileImage}>
            { photo ? (
              <S.ProfilePicImage
                source={{ uri: photo.uri }}
              />
            ) : (
              <S.ProfileSvg
                height={ScaleUtils.ScreenHeight * 0.09}
                width={ScaleUtils.ScreenHeight * 0.09}
              />
            )}
          </S.ProfilePicTouchableOpacity>
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
                <Input
                    title="Telefone"    
                    value={formData.phone}
                    keyboardType="phone-pad"
                    secureTextEntry={false}
                    onChangeValue={(text) => onFormDataChange(text, 'phone')}
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
                onPressListener={() => console.log('Redirecionar para Home')}
                fontColor="#FFF"
                background="#4F80E1"
                border="#4F80E1"
            />
        </S.PageContainer>
    )
}

export default RegisterScreen;
