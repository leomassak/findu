import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MaskService } from 'react-native-masked-text';
import { Alert } from 'react-native'; 
import ImagePicker from 'react-native-image-picker';

import * as S from './styles';
import * as ScaleUtils from '../../utils/scale';
import * as LoadingSelector from '../../redux/reducers/loading';
import * as UserAction from '../../redux/actions/user';
import * as UserReducer from '../../redux/reducers/user';
import * as validator from '../../helpers/form-validator';

import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import DefaultButton from '../../components/button/DefaultButton';
import Loading from '../../components/Loading/Loading';
import Snackbar from '../../utils/Snackbar';
import SucessModal from '../../components/modal/SucessModal';

import AddIcon from '../../assets/svg/ic_icon-add.svg';
import { pickerOptions } from '../../configs/imagePickerOptions';

export default function EditProfileScreen(props) {
    const dispatch = useDispatch();
    const userData = useSelector(state => UserReducer.getUser(state));
    const isLoading = useSelector(state => LoadingSelector.getLoading(state));
    const [formData, setFormdata] = useState({
        name: userData.name,
        phone: userData.phone,
    });
    const [photo, setPhoto] = useState({
        uri: (userData.profilePhoto ? userData.profilePhoto.url : null),
        base64: null,
    });
    const [isPhotoChange, setIsPhotoChange] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const onFormDataChange = (value, field) => {
        setFormdata({
            ...formData,
            [field]: value,
        })
    }

    const onSelectProfileImage = () => {
        console.log('entrou');
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
        } else if (response.didCancel) {
            setPhoto(null)
        } else {
            setPhoto({
                uri: response.uri,
                base64: response.data,
            })
            setIsPhotoChange(true);
        }
    }

    const onUpdateProfile = async () => {
        try { 
            const { name, phone } = formData;
            const isFormValid = validator.validateUpdateUser(name, phone);
            
            if (isFormValid.error) {
                Snackbar(isFormValid.errorMessage);
            } else {
                const updateData = {
                    name,
                    phone,
                    photo: isPhotoChange ? photo.base64 : undefined,
                }
                await dispatch(UserAction.updateUserData(updateData));
                setIsModalOpen(true);
            }
        } catch(err) {
            Snackbar(err.message);
        }
    }

    const onPressModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            {isLoading && <Loading />}
            <SucessModal
                isVisible={isModalOpen}
                onDismiss={() => onPressModal()}
                onPress={() => onPressModal()}
                text="O perfil foi atualizado com sucesso!"
            />
            <S.ProfileContainerScrollView>
                <Header
                    onPressListener={() => props.navigation.goBack()}
                />
                <S.ProfilePicView>
                    <S.ProfilePicAddTouchableOpacity
                        onPress={() => onSelectProfileImage()}
                    >
                        <AddIcon />
                    </S.ProfilePicAddTouchableOpacity>
                    <S.ProfilePicImageView>
                        {photo.uri ? (
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
                        onChangeValue={(text) => onFormDataChange(text, 'name')}
                        secureTextEntry={false}
                    />
                </S.InputContainer>

                <S.InputContainer>
                    <Input
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
                
                <S.ButtonsContainer> 
                    <DefaultButton 
                    text="Salvar"
                    onPressListener={() => onUpdateProfile()}
                    fontColor="#FFF"
                    background="#4F80E1"
                    />
                </S.ButtonsContainer>
            </S.ProfileContainerScrollView>
        </>
    );
}
