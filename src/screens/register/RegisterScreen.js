import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native'; 
import ImagePicker from 'react-native-image-picker';

import * as S from './styles';
import * as ScaleUtils from '../../utils/scale';
import * as UserAction from '../../redux/actions/user';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import CheckBox from '../../components/CheckBox/Checkbox';
import DefaultButton from '../../components/button/DefaultButton';

import { pickerOptions } from '../../configs/imagePickerOptions';

import Logo from '../../assets/svg/ic_logo.svg';

const RegisterScreen = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => LoadingSelector.getLoading(state));
    const [formData, setFormdata] = useState({
        name:"",
        email:"",
        phone:"",
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

      const onRegister = async () => {
        try { 
          const { name, email, password, phone } = formData;
          const isFormValid = validator.validateLoginForm(email, password, phone);
          if (!isFormValid) {
            Snackbar(isFormValid.errorMessage);
            return;
          };

          const registerData = {
            name,
            email,
            telefone: phone,
            password,
          }
          await dispatch(UserAction.register(registerData));
          Alert.alert(
            "",
            "Cadastro realizado com sucesso",
            [
              {
                text: "OK",
                onPress: () => this.props.navigation.navigate('Login'),
              },
            ],
            { cancelable: false },
          );
        } catch(err) {
          console.log(err);
          Snackbar('Ocorreu um erro, tente novamente!');
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
              <S.MaskedInput
              type="cel-phone"
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '+99 99',
              }}
              placeholder="Telefone"
              placeholderTextColor={Parameters.AppColors.darkGrey}
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={
                (text) => onFormDataChange(text, 'phone')
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
                onPressListener={() => this.onRegister()}
                fontColor="#FFF"
                background="#4F80E1"
                border="#4F80E1"
            />
        </S.PageContainer>
    )
}

export default RegisterScreen;
